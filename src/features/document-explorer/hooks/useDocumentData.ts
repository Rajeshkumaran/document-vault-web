import { useEffect, useState } from 'react';
import { DocumentNode } from '../interfaces/common';
import { axiosClient } from '@/lib/axiosClient';

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
        url: 'https://storage.googleapis.com/document-vault-d9b8b.firebasestorage.app/Resume%20Gokul%20Prasanth%20P%20copy_1f2fbf177848412596ac2101f3e07065.pdf?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-fbsvc%40document-vault-d9b8b.iam.gserviceaccount.com%2F20250808%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250808T205026Z&X-Goog-Expires=604799&X-Goog-SignedHeaders=host&X-Goog-Signature=7437f546e3f07bb8d5a1069f7d0246a6420aa86ccc7d209fcc629d0a50beb8a78362011ffde604a55c6625f10e891fe367c9c7cc99b72d33bdafc15aa96325e130e0c01bdc7f90f503ea44b3f44e1429a8f7e155ec1602aeb7d49690cc07a5448af168bf7a1d0cf306bf6f19839ddab48e686f2078f7769e6c7c6166306ac775e6ed23b69d05a8633d4802251a9de7dd053080c19a6e459f2ba5b82158e6801d32e98cc6f325fbcb01a0e6cc20af9c6e0067f3b8caf09249eb3d749991bec1fc2dedf9bd227de8bdb29d7faeaf2e69a5db420db8bfa46fbfb733169f0cc681edb70952cd5c869610ed14cac24a58d29ba9bc1c3392486530f99f18b7ca484013',
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
    url: 'https://storage.googleapis.com/document-vault-d9b8b.firebasestorage.app/sample-document.pdf',
  },
  {
    id: 'readme-file',
    name: 'README.txt',
    createdAt: '2025-08-07T09:00:00Z',
    type: 'file',
    fileType: 'txt',
  },
];

export function useDocumentData() {
  const [documents, setDocuments] = useState<DocumentNode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get<DocumentNode[]>('/api/v1/documents')
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching documents:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const refetch = () => {
    setLoading(true);
    axiosClient
      .get<DocumentNode[]>('/api/v1/documents')
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching documents:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { documents, loading, refetch };
}
