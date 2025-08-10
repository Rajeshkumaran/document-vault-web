import * as React from 'react';
import { DocumentNode, FileNode, FolderNode } from '../../interfaces/common';
import { Folder, Loader2 } from 'lucide-react';
import { TreeNode } from '../TreeNode';

export function DocumentsExplorer({
  documents,
  areDocumentsLoading,
  onFileClick,
  onFolderClick,
}: {
  documents: DocumentNode[];
  areDocumentsLoading: boolean;
  onFileClick?: (file: FileNode) => void;
  onFolderClick?: (folder: FolderNode) => void;
}) {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set(['all-files-root']));
  const [selectedFile, setSelectedFile] = React.useState<FileNode | null>(null);
  const [currentFolder, setCurrentFolder] = React.useState<FolderNode | null>(null);

  // Ensure root folder is always expanded when documents load
  React.useEffect(() => {
    if (documents.length > 0) {
      setExpanded((prev) => new Set([...prev, 'all-files-root']));
    }
  }, [documents]);

  const handleToggle = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
    onFileClick?.(file);
  };

  const handleFolderClick = (folder: FolderNode) => {
    setCurrentFolder(folder);
    onFolderClick?.(folder);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFolderViewFolderClick = (folderId: string, _folderName: string) => {
    // Find the folder in current folder's children
    const targetFolder = currentFolder?.children?.find(
      (child) => child.id === folderId && child.type === 'folder',
    ) as FolderNode;

    if (targetFolder) {
      setCurrentFolder(targetFolder);
    }
  };

  return (
    <section className='h-full flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm'>
      {/* Header */}
      <header className='flex-shrink-0 px-4 py-3 bg-gray-100 border-b border-gray-200 rounded-t-lg'>
        <h1 className='text-xl font-semibold text-gray-900'>Document Vault</h1>
      </header>

      {/* Main Content Area */}
      <div className='flex-1 flex min-h-0'>
        {/* Left Navigation Panel */}
        <div className='w-full flex flex-col border-r border-gray-200 bg-gray-50'>
          <>
            {/* Navigation Tree */}
            <div className='flex-1 overflow-y-auto p-3'>
              {areDocumentsLoading ? (
                <div className='flex items-center justify-center py-8'>
                  <div className='flex items-center gap-2 text-gray-500'>
                    <Loader2 className='h-5 w-5 animate-spin' />
                    <span className='text-sm'>Loading documents...</span>
                  </div>
                </div>
              ) : documents.length === 0 ? (
                <div className='flex items-center justify-center py-8'>
                  <div className='text-center text-gray-500'>
                    <Folder className='h-8 w-8 mx-auto mb-2 text-gray-300' />
                    <p className='text-sm font-medium'>No documents found</p>
                    <p className='text-xs'>Upload some documents to get started</p>
                  </div>
                </div>
              ) : (
                <div className='space-y-1'>
                  {documents.map((node) => (
                    <TreeNode
                      key={node.id}
                      node={node}
                      level={0}
                      expanded={expanded}
                      onToggle={handleToggle}
                      onFileClick={handleFileSelect}
                      onFolderClick={handleFolderClick}
                      selectedFile={selectedFile}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </section>
  );
}
