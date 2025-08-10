// Define discriminated union so fileType only applies to files and children only to folders
export interface FileType {
  pdf: 'pdf';
  docx: 'docx';
  xlsx: 'xlsx';
  pptx: 'pptx';
}
export interface BaseNode {
  id: string;
  name: string;
  createdAt?: string; // ISO date
}

export interface FileNode extends BaseNode {
  type: 'file';
  file_type: 'pdf' | 'docx' | 'pptx' | 'xlsx' | 'txt' | 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp';
  url?: string; // Firebase Storage URL
  children?: never;
  storage_path?: string; // Firebase Storage path
}

export interface FolderNode extends BaseNode {
  type: 'folder';
  children?: DocumentNode[]; // recursive
  file_type?: never;
}

export type DocumentNode = FileNode | FolderNode;
