import * as React from 'react';
import type { DocumentMeta } from '../DocumentViewer/types';
import { formatSize } from '../DocumentViewer/format';

export function SummaryView({ doc }: { doc: DocumentMeta }) {
  return (
    <div className='space-y-6'>
      <section>
        <h3 className='text-sm font-semibold text-gray-700 mb-2'>Metadata</h3>
        <dl className='grid grid-cols-2 gap-x-6 gap-y-2 text-sm'>
          <Meta term='Name' value={doc.name} />
          <Meta term='Type' value={doc.fileType?.toUpperCase() || '—'} />
          <Meta term='Created' value={new Date(doc.createdAt).toLocaleString()} />
          <Meta term='Pages' value={doc.pages?.toString() ?? '—'} />
          <Meta term='Size' value={formatSize(doc.size)} />
          <Meta term='ID' value={doc.id} />
        </dl>
      </section>
      <section>
        <h3 className='text-sm font-semibold text-gray-700 mb-2'>Description</h3>
        <p className='text-sm leading-relaxed text-gray-600'>{doc.description}</p>
      </section>
    </div>
  );
}

function Meta({ term, value }: { term: string; value: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
      <dt className='text-xs uppercase tracking-wide text-gray-400'>{term}</dt>
      <dd className='text-gray-700'>{value}</dd>
    </div>
  );
}
