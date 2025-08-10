import { Document } from '@/lib/types';
import { axiosClient } from '@/lib/axiosClient';

// Document API interfaces
export interface UploadMetadata {
  current_folder_id?: string | null;
  newFolderName?: string;
}

export interface UploadProgressCallback {
  (progressEvent: { loaded: number; total?: number }): void;
}

export interface UploadOptions {
  signal?: AbortSignal;
  onUploadProgress?: UploadProgressCallback;
}

export interface UploadResponse {
  id: string;
  message?: string;
  document?: Document;
}

// Upload document function
export async function uploadDocument(
  file: File,
  metadata: UploadMetadata,
  options?: UploadOptions,
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const formMetaData = {
    current_folder_id: metadata.current_folder_id || null,
    ...(metadata.newFolderName && { newFolderName: metadata.newFolderName }),
  };

  formData.append('meta_data', JSON.stringify(formMetaData));

  const response = await axiosClient.post('/api/v1/documents/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    signal: options?.signal,
    onUploadProgress: options?.onUploadProgress,
  });

  return response.data;
}

// Get document summary function
export async function getDocumentSummary(id: string): Promise<{ summary: string }> {
  const response = await axiosClient.get<{ summary: string }>(`/api/v1/documents/${id}/summary`);
  return response.data;
}

// Get document Insights function
export async function getDocumentInsights(id: string): Promise<{ insights: string }> {
  const response = await axiosClient.get<{ insights: string }>(`/api/v1/documents/${id}/insights`);
  return response.data;
}
