import { DocumentNode, FileNode } from '../interfaces/common';

export function flatten(nodes: DocumentNode[]): DocumentNode[] {
  return nodes.map((n) => ({ ...n }));
}

export function mapExtensionToType(name: string): FileNode['fileType'] {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
    case 'docx':
      return ext;
    default:
      return 'pdf';
  }
}
