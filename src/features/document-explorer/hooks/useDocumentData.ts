import { useEffect, useState } from 'react';
import { DocumentNode } from '../interfaces/common';

// Mock hierarchical documents data
const mockDocuments: DocumentNode[] = [
  {
    id: 'root-folder-1',
    name: 'Projects',
    createdAt: '2025-08-01T10:00:00Z',
    type: 'folder',
    children: [
      {
        id: 'proj-1',
        name: 'Requirements.pdf',
        createdAt: '2025-08-02T09:15:00Z',
        type: 'file',
        fileType: 'pdf',
      },
      {
        id: 'proj-2-folder',
        name: 'Designs',
        createdAt: '2025-08-03T12:30:00Z',
        type: 'folder',
        children: [
          {
            id: 'design-1',
            name: 'Wireframe-v1.pptx',
            createdAt: '2025-08-03T13:00:00Z',
            type: 'file',
            fileType: 'pptx',
          },
          {
            id: 'design-2',
            name: 'Wireframe-v2.pptx',
            createdAt: '2025-08-04T08:45:00Z',
            type: 'file',
            fileType: 'pptx',
          },
        ],
      },
    ],
  },
  {
    id: 'root-folder-2',
    name: 'Finance',
    createdAt: '2025-08-05T11:20:00Z',
    type: 'folder',
    children: [
      {
        id: 'fin-1',
        name: 'Q3-Budget.xlsx',
        createdAt: '2025-08-05T11:25:00Z',
        type: 'file',
        fileType: 'xlsx',
      },
      {
        id: 'fin-2',
        name: 'Q3-Projections.xlsx',
        createdAt: '2025-08-05T11:40:00Z',
        type: 'file',
        fileType: 'xlsx',
      },
    ],
  },
  {
    id: 'policy-file',
    name: 'Security-Policy.pdf',
    createdAt: '2025-08-06T07:10:00Z',
    type: 'file',
    fileType: 'pdf',
  },
  {
    id: 'readme-file',
    name: 'README.txt',
    createdAt: '2025-08-07T09:00:00Z',
    type: 'file',
    fileType: 'pdf',
  },
];

export function useDocumentData() {
  const [documents, setDocuments] = useState<DocumentNode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate async fetch
    const timer = setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  return { documents, loading };
}
