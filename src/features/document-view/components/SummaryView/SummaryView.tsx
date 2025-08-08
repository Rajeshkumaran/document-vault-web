import * as React from 'react';

export function SummaryView() {
  return (
    <div className='space-y-6'>
      <section>
        <h3 className='text-sm font-semibold text-gray-700 mb-2'>Metadata</h3>
        <dl className='grid grid-cols-2 gap-x-6 gap-y-2 text-sm'></dl>
      </section>
      <section>
        <h3 className='text-sm font-semibold text-gray-700 mb-2'>Description</h3>
      </section>
    </div>
  );
}
