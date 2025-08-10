import * as React from 'react';
import { FileText } from 'lucide-react';
import { parseISOWithMicros } from '@/features/document-explorer/utils/helpers';

interface FileDetailsViewProps {
  fileName?: string;
  fileType?: string;
  createdAt?: string;
  storagePath?: string;
  fileUrl?: string;
}

export function FileDetailsView({
  fileName,
  fileType,
  createdAt,
  storagePath,
  fileUrl,
}: FileDetailsViewProps) {
  if (!fileName) {
    return (
      <div className='flex items-center justify-center h-full text-gray-500'>
        <div className='text-center'>
          <FileText className='h-12 w-12 mx-auto mb-3 text-gray-300' />
          <p className='text-lg font-medium'>No file details available</p>
          <p className='text-sm'>File information not loaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full overflow-y-auto'>
      <div className='max-w-2xl'>
        <div className='flex items-start gap-3 mb-6'>
          <FileText className='h-8 w-8 text-gray-400 mt-1' />
          <div className='flex-1'>
            <h2 className='text-xl font-semibold text-gray-900 mb-1'>{fileName}</h2>
            {fileType && createdAt && (
              <p className='text-sm text-gray-500'>
                {fileType.toUpperCase()} • Created {parseISOWithMicros(createdAt)}
              </p>
            )}
          </div>
        </div>

        <div className='space-y-4'>
          <div className='bg-gray-50 rounded-lg p-4'>
            <h3 className='text-sm font-medium text-gray-700 mb-3'>File Details</h3>
            <dl className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {fileType && (
                <div>
                  <dt className='text-xs font-medium text-gray-500 uppercase tracking-wide'>
                    File Type
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 capitalize'>{fileType}</dd>
                </div>
              )}
              {createdAt && (
                <div>
                  <dt className='text-xs font-medium text-gray-500 uppercase tracking-wide'>
                    Created
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900'>{parseISOWithMicros(createdAt)}</dd>
                </div>
              )}
              {storagePath && (
                <div className='sm:col-span-2'>
                  <dt className='text-xs font-medium text-gray-500 uppercase tracking-wide'>
                    Storage Path
                  </dt>
                  <dd className='mt-1 text-sm text-gray-900 font-mono truncate'>{storagePath}</dd>
                </div>
              )}
            </dl>
          </div>

          {fileUrl && (
            <div className='bg-gray-50 rounded-lg p-4'>
              <h3 className='text-sm font-medium text-gray-700 mb-3'>Actions</h3>
              <div className='flex gap-2'>
                <a
                  href={fileUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
                >
                  Open File
                </a>
                <a
                  href={fileUrl}
                  download={fileName}
                  className='inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
                >
                  Download
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
