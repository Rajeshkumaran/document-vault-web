export interface DocumentMeta {
  id: string;
  name: string;
  createdAt: string;
  size?: number; // bytes
  fileType?: string;
  pages?: number;
  description?: string;
}
