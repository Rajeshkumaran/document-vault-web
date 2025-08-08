import { axiosClient } from '@/lib/axiosClient';

export interface UploadProgress {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number; // 0-100
  error?: string;
  result?: unknown;
}

export interface UploadQueueItem {
  id: string;
  file: File;
  folderName?: string;
  folderId?: string;
}

export class UploadQueue {
  private queue: UploadQueueItem[] = [];
  private activeUploads: Map<string, AbortController> = new Map();
  private maxConcurrentUploads = 3;
  private onProgressUpdate?: (progress: UploadProgress[]) => void;
  private progressMap: Map<string, UploadProgress> = new Map();

  constructor(maxConcurrentUploads = 3, onProgressUpdate?: (progress: UploadProgress[]) => void) {
    this.maxConcurrentUploads = maxConcurrentUploads;
    this.onProgressUpdate = onProgressUpdate;
  }

  addFiles(files: File[], folderName?: string, folderId?: string): string[] {
    const ids: string[] = [];

    files.forEach((file) => {
      const id = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const queueItem: UploadQueueItem = { id, file, folderName, folderId };

      this.queue.push(queueItem);
      this.progressMap.set(id, {
        id,
        file,
        status: 'pending',
        progress: 0,
      });

      ids.push(id);
    });

    this.notifyProgressUpdate();
    this.processQueue();

    return ids;
  }

  private async processQueue(): Promise<void> {
    while (this.queue.length > 0 && this.activeUploads.size < this.maxConcurrentUploads) {
      const item = this.queue.shift();
      if (item) {
        this.uploadFile(item);
      }
    }
  }

  private async uploadFile(item: UploadQueueItem): Promise<void> {
    const { id, file, folderName, folderId } = item;
    const abortController = new AbortController();
    this.activeUploads.set(id, abortController);

    try {
      // Update status to uploading
      this.updateProgress(id, { status: 'uploading', progress: 0 });

      const formData = new FormData();
      formData.append('file', file);

      if (folderName) {
        formData.append('folderName', folderName);
      }
      if (folderId) {
        formData.append('folderId', folderId);
      }

      const response = await axiosClient.post('/api/v1/documents/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: abortController.signal,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            this.updateProgress(id, {
              status: 'uploading',
              progress: percentCompleted,
            });
          }
        },
      });

      // Upload completed successfully
      this.updateProgress(id, {
        status: 'completed',
        progress: 100,
        result: response.data,
      });
    } catch (error) {
      // Handle upload error
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      this.updateProgress(id, {
        status: 'error',
        progress: 0,
        error: errorMessage,
      });
    } finally {
      // Clean up
      this.activeUploads.delete(id);

      // Continue processing queue
      this.processQueue();
    }
  }

  private updateProgress(id: string, updates: Partial<UploadProgress>): void {
    const current = this.progressMap.get(id);
    if (current) {
      this.progressMap.set(id, { ...current, ...updates });
      this.notifyProgressUpdate();
    }
  }

  private notifyProgressUpdate(): void {
    if (this.onProgressUpdate) {
      this.onProgressUpdate(Array.from(this.progressMap.values()));
    }
  }

  getProgress(): UploadProgress[] {
    return Array.from(this.progressMap.values());
  }

  cancelUpload(id: string): void {
    const abortController = this.activeUploads.get(id);
    if (abortController) {
      abortController.abort();
      this.activeUploads.delete(id);
    }

    // Remove from queue if still pending
    const queueIndex = this.queue.findIndex((item) => item.id === id);
    if (queueIndex !== -1) {
      this.queue.splice(queueIndex, 1);
    }

    // Update status
    this.updateProgress(id, {
      status: 'error',
      error: 'Upload cancelled',
    });
  }

  cancelAllUploads(): void {
    // Cancel all active uploads
    this.activeUploads.forEach((controller) => controller.abort());
    this.activeUploads.clear();

    // Clear queue
    this.queue = [];

    // Update all pending/uploading items to cancelled
    this.progressMap.forEach((progress, id) => {
      if (progress.status === 'pending' || progress.status === 'uploading') {
        this.updateProgress(id, {
          status: 'error',
          error: 'Upload cancelled',
        });
      }
    });
  }

  clearCompleted(): void {
    // Remove completed and error items from progress map
    const toRemove: string[] = [];
    this.progressMap.forEach((progress, id) => {
      if (progress.status === 'completed' || progress.status === 'error') {
        toRemove.push(id);
      }
    });

    toRemove.forEach((id) => this.progressMap.delete(id));
    this.notifyProgressUpdate();
  }

  isActive(): boolean {
    return this.queue.length > 0 || this.activeUploads.size > 0;
  }

  getStats(): {
    pending: number;
    uploading: number;
    completed: number;
    error: number;
    total: number;
  } {
    let pending = 0;
    let uploading = 0;
    let completed = 0;
    let error = 0;

    this.progressMap.forEach((progress) => {
      switch (progress.status) {
        case 'pending':
          pending++;
          break;
        case 'uploading':
          uploading++;
          break;
        case 'completed':
          completed++;
          break;
        case 'error':
          error++;
          break;
      }
    });

    return {
      pending,
      uploading,
      completed,
      error,
      total: this.progressMap.size,
    };
  }
}
