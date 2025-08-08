import * as React from 'react';
import type { DocumentMeta } from '../../interfaces/common';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs/Tabs';
import { SummaryView } from '../SummaryView/SummaryView';
import { PreviewView } from '../PreviewView/PreviewView';

interface DocumentViewerProps {
  documentId: string;
}

export function DocumentViewer({ documentId, onFileClick }: DocumentViewerProps) {
  const [doc, setDoc] = React.useState<DocumentMeta | null>(null);
  const [tab, setTab] = React.useState<'summary' | 'preview'>('summary');

  return (
    <div className='flex flex-col border border-gray-200 rounded-lg bg-white shadow-sm h-full'>
      <header className='px-5 py-3 border-b border-gray-200 flex items-center justify-between'>
        <h2 className='text-sm font-semibold tracking-wide text-gray-700'>Document Viewer</h2>
        <div className='text-xs text-gray-400'>ID: {documentId}</div>
      </header>
      <Tabs
        value={tab}
        onValueChange={(v: string) => setTab(v as 'summary' | 'preview')}
        className='flex flex-col'
      >
        <TabsList className='mt-2'>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='summary'>Summary</TabsTrigger>
        </TabsList>
        <div className='p-5 flex-1 overflow-auto'>
          <TabsContent value='preview'>{tab === 'preview' && <PreviewView />}</TabsContent>
          <TabsContent value='summary'>{tab === 'summary' && <SummaryView />}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default DocumentViewer;
