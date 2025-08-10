import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/Tabs/Tabs';
import { SummaryView } from '../SummaryView/SummaryView';
import { PreviewView } from '../PreviewView/PreviewView';
import { FileDetailsView } from '../FileDetailsView/FileDetailsView';
import { MarkdownRawText } from '../MarkdownRawText/MarkdownRawText';
import { useGetDocumentSummary } from '../../hooks';
import { useGetDocumentInsights } from '../../hooks/useGetDocumentInsights';
import Insights from '../Insights/Insights';

interface DocumentViewerProps {
  documentId: string;
  storagePath?: string;
  fileName?: string;
  fileType?: string;
  createdAt?: string;
  fileUrl?: string;
  onClose: () => void;
}

export function DocumentViewer({
  documentId,
  storagePath,
  fileName,
  fileType,
  createdAt,
  fileUrl,
  onClose,
}: DocumentViewerProps) {
  const [tab, setTab] = React.useState<'summary' | 'preview' | 'details'>('preview');
  const { summary, loading: isSummaryDataLoading, error } = useGetDocumentSummary({ documentId });
  const { insights, fetchInsights } = useGetDocumentInsights({ documentId });

  React.useEffect(() => {
    if (summary) {
      // Show loading state
      fetchInsights();
    }
  }, [summary, fetchInsights]);

  return (
    <div className='flex flex-col border border-gray-200 rounded-lg bg-white shadow-sm h-full'>
      <header className='px-5 py-3 border-b border-gray-200 flex items-center justify-between'>
        <h2 className='text-sm font-semibold tracking-wide text-gray-700'>Document Viewer</h2>
        <button
          onClick={onClose}
          className='p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors'
          aria-label='Close document viewer'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </header>
      <Tabs
        value={tab}
        onValueChange={(v: string) => setTab(v as 'summary' | 'preview' | 'details')}
        className='flex flex-col flex-1'
      >
        <TabsList className='mt-2'>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
          <TabsTrigger value='summary'>Summary</TabsTrigger>
          <TabsTrigger value='markdown'>Markdown</TabsTrigger>
          {insights && (
            <TabsTrigger value='insights'>
              <div className='flex'>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
                Insights
              </div>
            </TabsTrigger>
          )}
          <TabsTrigger value='details'>Details</TabsTrigger>
        </TabsList>
        <div className='p-5 flex-1 min-h-0'>
          <TabsContent value='preview' className='h-full'>
            <PreviewView storagePath={storagePath} fileName={fileName} fileType={fileType} />
          </TabsContent>
          <TabsContent value='summary' className='h-full'>
            <SummaryView summary={summary} loading={isSummaryDataLoading} error={error} />
          </TabsContent>
          <TabsContent value='markdown' className='h-full'>
            <MarkdownRawText markdown={summary} />
          </TabsContent>
          {insights && (
            <TabsContent value='insights' className='h-full'>
              <Insights insights={insights} />
            </TabsContent>
          )}
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
