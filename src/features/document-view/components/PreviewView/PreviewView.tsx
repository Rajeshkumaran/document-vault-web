import * as React from 'react';
import type { DocumentMeta } from '../DocumentViewer/types';

export function PreviewView({ doc }: { doc: DocumentMeta }) {
  return (
    <div className='h-full flex flex-col'>
      <div className='mb-4'>
        <h3 className='text-sm font-semibold text-gray-700'>Preview</h3>
        <p className='text-xs text-gray-500'>
          Inline preview placeholder for {doc.fileType?.toUpperCase()}.
        </p>
      </div>
      <div className='flex-1 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 text-sm'>
        No renderer implemented yet.
      </div>
    </div>
  );
}
