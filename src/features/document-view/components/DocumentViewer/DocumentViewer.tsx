import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs/Tabs';
import { SummaryView } from '../SummaryView/SummaryView';
import { PreviewView } from '../PreviewView/PreviewView';
import { FileDetailsView } from '../FileDetailsView/FileDetailsView';

interface DocumentViewerProps {
  documentId: string;
  storagePath?: string;
  fileName?: string;
  fileType?: string;
  createdAt?: string;
  fileUrl?: string;
}

export function DocumentViewer({
  documentId,
  storagePath,
  fileName,
  fileType,
  createdAt,
  fileUrl,
}: DocumentViewerProps) {
  const [tab, setTab] = React.useState<'summary' | 'preview' | 'details'>('preview');

  return (
    <div className='flex flex-col border border-gray-200 rounded-lg bg-white shadow-sm h-full'>
      <header className='px-5 py-3 border-b border-gray-200 flex items-center justify-between'>
        <h2 className='text-sm font-semibold tracking-wide text-gray-700'>Document Viewer</h2>
      </header>
      <Tabs
        value={tab}
        onValueChange={(v: string) => setTab(v as 'summary' | 'preview' | 'details')}
        className='flex flex-col flex-1'
      >
        <TabsList className='mt-2'>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='summary'>Summary</TabsTrigger>
          <TabsTrigger value='details'>Details</TabsTrigger>
        </TabsList>
        <div className='p-5 flex-1 min-h-0'>
          <TabsContent value='preview' className='h-full'>
            <PreviewView storagePath={storagePath} fileName={fileName} fileType={fileType} />
          </TabsContent>
          <TabsContent value='summary' className='h-full'>
            <SummaryView documentId={documentId} />
          </TabsContent>
          <TabsContent value='details' className='h-full'>
            <FileDetailsView
              fileName={fileName}
              fileType={fileType}
              createdAt={createdAt}
              storagePath={storagePath}
              fileUrl={fileUrl}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default DocumentViewer;
