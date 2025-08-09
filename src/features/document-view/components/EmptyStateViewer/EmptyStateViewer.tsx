import * as React from 'react';

interface EmptyStateViewerProps {
  message?: string;
}

export function EmptyStateViewer({ message = 'No file URL provided' }: EmptyStateViewerProps) {
  return (
    <div className='flex items-center justify-center h-64 text-gray-500'>
      <div className='text-center'>
        <div className='mb-4'>
          <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto'>
            <svg
              className='w-8 h-8 text-gray-400'
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
        </div>
        <p className='text-gray-600'>{message}</p>
        <p className='text-sm text-gray-400 mt-2'>Select a file to preview</p>
      </div>
    </div>
  );
}
