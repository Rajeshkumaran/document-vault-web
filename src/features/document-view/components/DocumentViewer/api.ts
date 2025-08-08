import { DocumentMeta } from './types';

// Placeholder async fetcher (replace with real API call)
export async function fetchDocument(id: string): Promise<DocumentMeta | null> {
  await new Promise((r) => setTimeout(r, 150)); // simulate latency
  return {
    id,
    name: `Sample Document ${id}`,
    createdAt: new Date().toISOString(),
    size: 153600,
    fileType: 'pdf',
    pages: 12,
    description:
      'This is a placeholder description for the selected document. Replace with real metadata returned from your backend service.',
  };
}
