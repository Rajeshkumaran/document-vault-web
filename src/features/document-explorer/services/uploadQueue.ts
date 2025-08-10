import { uploadDocument, UploadMetadata } from '@/data/api';

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
  metaData: UploadMetadata;
}

export class UploadQueue {
  private queue: UploadQueueItem[] = [];
  private activeUploads: Map<string, AbortController> = new Map();
  private maxConcurrentUploads = 3;
  private onProgressUpdate?: (progress: UploadProgress[]) => void;
  private onAllUploadsComplete?: () => void;
  private progressMap: Map<string, UploadProgress> = new Map();
  private batchTracker: Set<string> = new Set(); // Track current batch uploads

  constructor(
    maxConcurrentUploads = 3,
    onProgressUpdate?: (progress: UploadProgress[]) => void,
    onAllUploadsComplete?: () => void,
  ) {
    this.maxConcurrentUploads = maxConcurrentUploads;
    this.onProgressUpdate = onProgressUpdate;
    this.onAllUploadsComplete = onAllUploadsComplete;
  }

  addFiles(
    files: File[],
    metaData: {
      currentFolderId?: string;
    },
  ): string[] {
    const ids: string[] = [];

    files.forEach((file) => {
      const id = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const uploadMetaData: UploadMetadata = {
        current_folder_id: metaData.currentFolderId,
      };
      const queueItem: UploadQueueItem = { id, file, metaData: uploadMetaData };

      this.queue.push(queueItem);
      this.progressMap.set(id, {
        id,
        file,
        status: 'pending',
        progress: 0,
      });

      // Add to current batch tracker
      this.batchTracker.add(id);

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
    const { id, file, metaData } = item;
    const abortController = new AbortController();
    this.activeUploads.set(id, abortController);

    try {
      // Update status to uploading
      this.updateProgress(id, { status: 'uploading', progress: 0 });

      const response = await uploadDocument(file, metaData, {
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
        result: response,
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

      // Check if all uploads are complete
      this.checkAllUploadsComplete();
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

  private checkAllUploadsComplete(): void {
    // Check if there are items in the batch tracker that are still pending/uploading
    let allBatchItemsComplete = true;
    let hasCompletedItems = false;

    for (const id of this.batchTracker) {
      const progress = this.progressMap.get(id);
      if (progress) {
        if (progress.status === 'pending' || progress.status === 'uploading') {
          allBatchItemsComplete = false;
          break;
        }
        if (progress.status === 'completed') {
          hasCompletedItems = true;
        }
      }
    }

    // If all batch items are complete and we have completed items, trigger callback
    if (allBatchItemsComplete && hasCompletedItems && this.batchTracker.size > 0) {
      if (this.onAllUploadsComplete) {
        this.onAllUploadsComplete();
      }
      // Clear the batch tracker for next batch
      this.batchTracker.clear();
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

    toRemove.forEach((id) => {
      this.progressMap.delete(id);
      this.batchTracker.delete(id); // Also remove from batch tracker
    });
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
