import * as React from 'react';
import { fetchDocument } from './api';
import type { DocumentMeta } from './types';
import { TabButton } from './TabButton';
import { SummaryView } from '../SummaryView/SummaryView';
import { PreviewView } from '../PreviewView/PreviewView';

interface DocumentViewerProps {
  documentId: string;
}

export function DocumentViewer({ documentId }: DocumentViewerProps) {
  const [doc, setDoc] = React.useState<DocumentMeta | null>(null);
  const [activeTab, setActiveTab] = React.useState<'summary' | 'preview'>('summary');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchDocument(documentId)
      .then((d) => {
        if (!cancelled) setDoc(d);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load document');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [documentId]);

  return (
    <div className='flex flex-col border border-gray-200 rounded-lg bg-white shadow-sm h-full'>
      <header className='px-5 py-3 border-b border-gray-200 flex items-center justify-between'>
        <h2 className='text-sm font-semibold tracking-wide text-gray-700'>Document Viewer</h2>
        <div className='text-xs text-gray-400'>ID: {documentId}</div>
      </header>
      <nav className='flex gap-1 px-2 pt-2 border-b border-gray-100'>
        <TabButton active={activeTab === 'summary'} onClick={() => setActiveTab('summary')}>
          Summary
        </TabButton>
        <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>
          Preview
        </TabButton>
      </nav>
      <div className='p-5 flex-1 overflow-auto'>
        {loading && <p className='text-sm text-gray-500'>Loading document…</p>}
        {error && <p className='text-sm text-red-600'>Error: {error}</p>}
        {!loading && !error && !doc && <p className='text-sm text-gray-500'>Document not found.</p>}
        {!loading && !error && doc && activeTab === 'summary' && <SummaryView doc={doc} />}
        {!loading && !error && doc && activeTab === 'preview' && <PreviewView doc={doc} />}
      </div>
    </div>
  );
}

export default DocumentViewer;
