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
  createdAt: string; // ISO date
}

export interface FileNode extends BaseNode {
  type: 'file';
  fileType: 'pdf' | 'docx';
  children?: never;
}

export interface FolderNode extends BaseNode {
  type: 'folder';
  children?: DocumentNode[]; // recursive
  fileType?: never;
}

export type DocumentNode = FileNode | FolderNode;
