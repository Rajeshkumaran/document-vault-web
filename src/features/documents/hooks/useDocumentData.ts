import { useEffect, useState } from 'react';
import { DocumentNode } from '../interfaces/common';

const documentsFromApi: DocumentNode[] = [
  {
    id: '1',
    name: 'Document 1',
    createdAt: '2025-08-08',
    type: 'folder',
    children: [
      { id: '1-1', name: 'Subdocument 1', createdAt: '2025-08-08', type: 'file', fileType: 'pdf' },
      {
        id: '1-1-folder',
        name: 'SubFolder 1',
        createdAt: '2025-08-08',
        type: 'folder',
        children: [
          {
            id: '1-1-1',
            name: 'SubSubdocument 1',
            createdAt: '2025-08-08',
            type: 'file',
            fileType: 'pdf',
          },
        ],
      },
    ],
  },
  { id: '2', name: 'Document 2', createdAt: '2025-08-09', type: 'file', fileType: 'pdf' },
  { id: '3', name: 'Document 3', createdAt: '2025-08-09', type: 'file', fileType: 'pdf' },
  { id: '4', name: 'Document 4', createdAt: '2025-08-09', type: 'file', fileType: 'docx' },
  { id: '5', name: 'Document 5', createdAt: '2025-08-09', type: 'file', fileType: 'pptx' },
  { id: '6', name: 'Document 6', createdAt: '2025-08-09', type: 'file', fileType: 'xlsx' },
];

export function useDocumentData() {
  const [documents, setDocuments] = useState<DocumentNode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setDocuments(documentsFromApi);
    setLoading(false);
  }, []);

  return { documents, loading };
}
