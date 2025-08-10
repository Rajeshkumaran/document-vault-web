import { UploadProgress } from '@/features/document-explorer/services/uploadQueue';

export interface DocumentMeta {
  id: string;
  name: string;
  createdAt: string;
  size?: number; // bytes
  fileType?: string;
  pages?: number;
  description?: string;
}

export interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  count?: number; // For folders, count of items inside
  fileType?: string;
  createdAt?: string;
  isLocked?: boolean;
}

export interface FolderViewProps {
  folderName?: string;
  items: FolderItem[];
  onFolderClick?: (folderId: string, folderName: string) => void;
  onFileClick?: (fileId: string, fileName: string) => void;
  onBackClick?: () => void;
  showBackButton?: boolean;
  loading?: boolean;
  // Upload functionality
  allowFileTypes?: string[];
  onUploadFiles?: (files: File[], folderName?: string) => void;
  // Upload progress
  uploads?: UploadProgress[];
  onClearCompleted?: () => void;
}
