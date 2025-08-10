import { DocumentNode, FileNode, FolderNode } from '../interfaces/common';
import { FolderItem } from '@/features/document-view/interfaces/common';

/**
 * Converts a DocumentNode (from document-explorer) to FolderItem (for FolderView)
 */
export const convertDocumentNodeToFolderItem = (node: DocumentNode): FolderItem => {
  if (node.type === 'folder') {
    const folderNode = node as FolderNode;
    return {
      id: node.id,
      name: node.name,
      type: 'folder',
      count: folderNode.children?.length || 0,
      createdAt: node.createdAt,
    };
  } else {
    const fileNode = node as FileNode;
    return {
      id: node.id,
      name: node.name,
      type: 'file',
      fileType: fileNode.file_type,
      createdAt: node.createdAt,
      // You might want to add size calculation here if available
    };
  }
};

/**
 * Converts an array of DocumentNodes to FolderItems
 */
export const convertDocumentNodesToFolderItems = (nodes: DocumentNode[]): FolderItem[] => {
  return nodes.map(convertDocumentNodeToFolderItem);
};

/**
 * Gets the children of a folder node as FolderItems
 */
export const getFolderChildren = (folderNode: FolderNode): FolderItem[] => {
  if (!folderNode.children || folderNode.children.length === 0) {
    return [];
  }
  return convertDocumentNodesToFolderItems(folderNode.children);
};
