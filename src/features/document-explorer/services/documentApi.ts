import { Document } from '@/lib/types';

// Placeholder async functions simulating API calls
export async function getDocuments(): Promise<Document[]> {
  return Promise.resolve([
    {
      id: '1',
      name: 'Project Plan.pdf',
      mimeType: 'application/pdf',
      size: 153600,
      updatedAt: new Date().toISOString(),
    },
  ]);
}

export async function getDocument(id: string): Promise<Document | null> {
  const docs = await getDocuments();
  return docs.find((d) => d.id === id) || null;
}
