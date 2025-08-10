import { useState, useEffect, useCallback } from 'react';
import { DocumentNode, FileNode, FolderNode } from '@/features/document-explorer/interfaces';
import { FolderItem } from '@/features/document-view/interfaces/common';
import { getFolderChildren } from '@/features/document-explorer/utils/documentConverter';

export interface UseFolderNavigationReturn {
  // State
  currentFolder: FolderNode | null;
  folderName: string;
  folderItems: FolderItem[];
  folderHistory: FolderNode[];

  // Actions
  navigateToFolder: (folder: FolderNode) => void;
  navigateToFolderById: (folderId: string) => void;
  navigateBack: () => void;
  handleFolderFileClick: (fileId: string) => FileNode | null;
}

export const useFolderNavigation = ({
  documents,
  areDocumentsLoaded,
}: {
  documents: DocumentNode[];
  areDocumentsLoaded: boolean;
}) => {
  const [loading, setLoading] = useState(true);
  const [currentFolder, setCurrentFolder] = useState<FolderNode | null>(null);
  const [folderName, setFolderName] = useState<string>('Root');
  const [folderItems, setFolderItems] = useState<FolderItem[]>([]);
  const [folderHistory, setFolderHistory] = useState<FolderNode[]>([]);

  // Get documents data to access the "All files" root folder
  // Initialize with the "All files" root folder as the default view
  useEffect(() => {
    if (documents.length > 0 && areDocumentsLoaded && !currentFolder) {
      const allFilesRootFolder = documents.find((doc) => doc.id === 'all-files-root') as FolderNode;
      if (allFilesRootFolder) {
        setCurrentFolder(allFilesRootFolder);
        setFolderName(allFilesRootFolder.name);
        setLoading(false);
        const items = getFolderChildren(allFilesRootFolder);
        if (items.length > 0) {
          setFolderItems(items);
        }
      }
    }
  }, [documents, areDocumentsLoaded, currentFolder]);

  // Get documents data to access the "All files" root folder
  // Initialize with the "All files" root folder as the default view
  useEffect(() => {
    if (documents.length > 0 && areDocumentsLoaded) {
      const allFilesRootFolder = documents.find((doc) => doc.id === 'all-files-root') as FolderNode;
      if (allFilesRootFolder) {
        setCurrentFolder(allFilesRootFolder);
        setFolderName(allFilesRootFolder.name);
        setLoading(false);
        const items = getFolderChildren(allFilesRootFolder);
        if (items.length > 0) {
          setFolderItems(items);
        }
      }
    }
  }, [documents, areDocumentsLoaded]);

  const navigateToFolder = useCallback(
    (folder: FolderNode) => {
      // Find the "All files" root folder to add to history if needed
      const allFilesRootFolder = documents.find((doc) => doc.id === 'all-files-root') as FolderNode;

      // Add the "All files" folder to history so user can navigate back to it
      if (allFilesRootFolder && folderHistory.length === 0) {
        setFolderHistory([allFilesRootFolder]);
      }

      setCurrentFolder(folder);
      setFolderName(folder.name);
      // Convert folder children to FolderItems
      const items = getFolderChildren(folder);
      setFolderItems(items);
    },
    [documents, folderHistory.length],
  );

  const navigateToFolderById = useCallback(
    (folderId: string) => {
      // Find the folder in current folder's children
      const targetFolder = currentFolder?.children?.find(
        (child) => child.id === folderId && child.type === 'folder',
      ) as FolderNode;

      if (targetFolder) {
        // Add current folder to history
        if (currentFolder) {
          setFolderHistory((prev) => [...prev, currentFolder]);
        }
        setCurrentFolder(targetFolder);
        setFolderName(targetFolder.name);
        const items = getFolderChildren(targetFolder);
        setFolderItems(items);
      }
    },
    [currentFolder],
  );

  const navigateBack = useCallback(() => {
    if (folderHistory.length > 0) {
      // Go back to previous folder
      const previousFolder = folderHistory[folderHistory.length - 1];
      setCurrentFolder(previousFolder);
      setFolderName(previousFolder.name);
      setFolderHistory((prev) => prev.slice(0, -1));
      const items = getFolderChildren(previousFolder);
      setFolderItems(items);
    } else {
      // Go back to "All files" root folder
      const allFilesRootFolder = documents.find((doc) => doc.id === 'all-files-root') as FolderNode;
      if (allFilesRootFolder) {
        setCurrentFolder(allFilesRootFolder);
        setFolderName(allFilesRootFolder.name);
        const items = getFolderChildren(allFilesRootFolder);
        setFolderItems(items);
      }
      setFolderHistory([]);
    }
  }, [documents, folderHistory]);

  const handleFolderFileClick = useCallback(
    (fileId: string): FileNode | null => {
      // Find the file in current folder's children
      const targetFile = currentFolder?.children?.find(
        (child) => child.id === fileId && child.type === 'file',
      ) as FileNode;

      return targetFile || null;
    },
    [currentFolder],
  );

  return {
    // State
    currentFolder,
    folderName,
    folderItems,
    folderHistory,

    // Actions
    navigateToFolder,
    navigateToFolderById,
    navigateBack,
    handleFolderFileClick,

    loadingFolderView: loading,
  };
};
