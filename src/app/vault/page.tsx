'use client';
import { useState } from 'react';
import { DocumentsExplorer } from '@features/document-explorer/components';
import { DocumentViewer } from '@features/document-view/components/';
import { FileNode } from '@/features/document-explorer/interfaces';

export default function VaultPage() {
  const [showDocumentViewer, toggleDocumentViewer] = useState(false);
  const handleFileClick = (file: FileNode) => {
    toggleDocumentViewer(true);
  };

  return (
    <div className='h-full flex flex-col gap-4 p-6'>
      <div className='flex-1 min-h-0 flex gap-6 overflow-hidden'>
        <div className='flex-1 min-h-0 overflow-auto'>
          <DocumentsExplorer onFileClick={handleFileClick} />
        </div>
        {showDocumentViewer && (
          <div className='flex-1 min-h-0 overflow-auto'>
            <DocumentViewer documentId='1' />
          </div>
        )}
      </div>
    </div>
  );
}
