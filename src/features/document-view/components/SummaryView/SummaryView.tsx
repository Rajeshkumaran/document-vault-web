import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { useGetDocumentSummary } from '../../hooks/useGetDocumentSummary';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';

export function SummaryView({ documentId }: { documentId: string }) {
  const { summary, loading, error } = useGetDocumentSummary({ documentId });

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='flex flex-col items-center space-y-3'>
          <Loader2 className='h-8 w-8 animate-spin text-orange-500' />
          <p className='text-sm text-gray-500'>Generating document summary...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='flex flex-col items-center space-y-3 text-center'>
          <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
            <svg
              className='w-6 h-6 text-red-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <p className='text-sm text-red-600'>{error}</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='flex flex-col items-center space-y-3 text-center'>
          <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
            <svg
              className='w-6 h-6 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
          </div>
          <p className='text-sm text-gray-500'>No summary available for this document</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <section className='prose prose-sm max-w-none max-h-[550px] overflow-y-auto'>
        <div className='whitespace-pre-wrap text-gray-700 leading-relaxed'>
          <MarkdownRenderer markdown={summary} />
        </div>
      </section>
    </div>
  );
}
