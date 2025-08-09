import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs/Tabs';
import { SummaryView } from '../SummaryView/SummaryView';
import { PreviewView } from '../PreviewView/PreviewView';

interface DocumentViewerProps {
  documentId: string;
  storagePath?: string;
  fileName?: string;
  fileType?: string;
}

export function DocumentViewer({
  documentId,
  storagePath,
  fileName,
  fileType,
}: DocumentViewerProps) {
  const [tab, setTab] = React.useState<'summary' | 'preview'>('preview');

  return (
    <div className='flex flex-col border border-gray-200 rounded-lg bg-white shadow-sm h-full'>
      <header className='px-5 py-3 border-b border-gray-200 flex items-center justify-between'>
        <h2 className='text-sm font-semibold tracking-wide text-gray-700'>Document Viewer</h2>
        <div className='text-xs text-gray-400'>ID: {documentId}</div>
      </header>
      <Tabs
        value={tab}
        onValueChange={(v: string) => setTab(v as 'summary' | 'preview')}
        className='flex flex-col flex-1'
      >
        <TabsList className='mt-2'>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='summary'>Summary</TabsTrigger>
        </TabsList>
        <div className='p-5 flex-1 min-h-0'>
          <TabsContent value='preview' className='h-full'>
            <PreviewView storagePath={storagePath} fileName={fileName} fileType={fileType} />
          </TabsContent>
          <TabsContent value='summary' className='h-full'>
            <SummaryView documentId={documentId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default DocumentViewer;
