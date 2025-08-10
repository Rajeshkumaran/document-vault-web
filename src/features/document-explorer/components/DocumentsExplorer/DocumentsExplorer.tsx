import * as React from 'react';
import { DocumentNode, FileNode, FolderNode } from '../../interfaces/common';
import { Folder, Loader2, FolderOpen, Search } from 'lucide-react';
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
  const [_currentFolder, setCurrentFolder] = React.useState<FolderNode | null>(null);

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

  return (
    <section className='h-full flex flex-col bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] border border-gray-200/50 overflow-hidden'>
      {/* Header with gradient background */}
      <header className='flex-shrink-0 px-6 py-4 bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-200/30'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-orange-500 rounded-lg shadow-sm'>
              <FolderOpen className='h-5 w-5 text-white' />
            </div>
            <div>
              <h1 className='text-xl font-semibold text-gray-900'>Document Explorer</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className='flex-1 flex min-h-0'>
        {/* Navigation Panel */}
        <div className='w-full flex flex-col bg-gradient-to-b from-gray-50/50 to-white'>
          <div className='flex-1 overflow-y-auto'>
            {areDocumentsLoading ? (
              <div className='flex flex-col items-center justify-center py-16 px-6'>
                <div className='bg-orange-50 p-4 rounded-full mb-4'>
                  <Loader2 className='h-8 w-8 text-orange-500 animate-spin' />
                </div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>Loading your documents</h3>
                <p className='text-sm text-gray-600 text-center'>
                  Please wait while we fetch your files...
                </p>
              </div>
            ) : (
              <div className='p-4'>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
