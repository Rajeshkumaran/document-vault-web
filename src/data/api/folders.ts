import { axiosClient } from '@/lib/axiosClient';

// Folder API interfaces
export interface Folder {
  id: string;
  name: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFolderRequest {
  folder_name: string;
  parent_folder_id?: string | null;
}

export async function createFolder(folderData: CreateFolderRequest): Promise<Folder> {
  const response = await axiosClient.post<Folder>('/api/v1/folders/create', folderData);
  return response.data;
}
