'use client';
import { useState } from 'react';
import { createFolder } from '@/data/api';
import { ALLOWED_FILE_TYPES } from '@/lib/constants';
import { DocumentsExplorer } from '@features/document-explorer/components';
import { DocumentViewer, FolderView } from '@features/document-view/components/';
import { FileNode, FolderNode } from '@/features/document-explorer/interfaces';
import { useFolderNavigation } from '@/features/document-view/hooks';
import { useUploadQueue } from '@/features/document-explorer/hooks/useUploadQueue';
import { useDocumentData } from '@/features/document-explorer/hooks/useDocumentData';
import { useToastHelpers } from '@/components/atoms/Toast';

export default function VaultPage() {
  const { showSuccess } = useToastHelpers();

  const [showDocumentViewer, toggleDocumentViewer] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const { documents, loaded: areDocumentsLoaded, refetch: refetchDocuments } = useDocumentData();
  console.log('Debugger ----', {
    selectedFile,
    showDocumentViewer,
  });
  // Use the folder navigation hook
  const {
    loadingFolderView,
    currentFolder,
    folderName,
    folderItems,
    navigateToFolder,
    navigateToFolderById,
    navigateBack,
    handleFolderFileClick: getFolderFile,
  } = useFolderNavigation({
    documents,
    areDocumentsLoaded,
  });

  // Upload queue for handling file uploads
  const { uploads, addFiles, clearCompleted } = useUploadQueue(5, refetchDocuments);

  const handleUploadFiles = async (files: File[], newFolderName?: string) => {
    // Add files to the upload queue for parallel processing
    let folderResponse = null;
    if (newFolderName) {
      folderResponse = await createFolder({
        folder_name: newFolderName,
        parent_folder_id: currentFolder?.id !== 'all-files-root' ? currentFolder?.id : undefined,
      });
      showSuccess('Folder created', 'Your new folder has been created successfully.');
    }
    addFiles(files, {
      currentFolderId: folderResponse?.id || currentFolder?.id,
    });
  };

  const handleFileClick = (file: FileNode) => {
    setSelectedFile(file);
    toggleDocumentViewer(true);
  };

  const handleExplorerFolderClick = (folder: FileNode | FolderNode) => {
    if (folder.type === 'folder') {
      navigateToFolder(folder);
    }
  };

  const handleFolderClick = (folderId: string) => {
    navigateToFolderById(folderId);
  };

  const handleFolderFileClick = (fileId: string) => {
    const targetFile = getFolderFile(fileId);
    if (targetFile) {
      setSelectedFile(targetFile);
      toggleDocumentViewer(true);
    }
  };

  return (
    <div className='h-full flex flex-col gap-4 p-6'>
      <div className='flex-1 min-h-0 flex gap-6 overflow-hidden'>
        <div className='flex-1 min-h-0 overflow-auto'>
          <DocumentsExplorer
            documents={documents}
            onFileClick={handleFileClick}
            onFolderClick={handleExplorerFolderClick}
          />
        </div>
        <div className='flex-3 min-h-0 overflow-auto'>
          <FolderView
            folderName={folderName}
            items={folderItems}
            onFolderClick={(folderId) => handleFolderClick(folderId)}
            onFileClick={(fileId) => handleFolderFileClick(fileId)}
            onBackClick={navigateBack}
            showBackButton={currentFolder?.id !== 'all-files-root'}
            loading={loadingFolderView}
            allowFileTypes={ALLOWED_FILE_TYPES}
            onUploadFiles={handleUploadFiles}
            uploads={uploads}
            onClearCompleted={clearCompleted}
          />
        </div>
        {showDocumentViewer && selectedFile && (
          <div className='flex-3 min-h-0 overflow-auto'>
            <DocumentViewer
              documentId={selectedFile.id}
              storagePath={selectedFile.storage_path}
              fileName={selectedFile.name}
              fileType={selectedFile.file_type}
              createdAt={selectedFile.createdAt}
              fileUrl={selectedFile.url}
              onClose={() => {
                setSelectedFile(null);
                toggleDocumentViewer(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
