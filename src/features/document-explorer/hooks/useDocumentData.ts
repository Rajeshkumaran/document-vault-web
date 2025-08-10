import { useEffect, useState } from 'react';
import { DocumentNode } from '../interfaces/common';
import { axiosClient } from '@/lib/axiosClient';

export function useDocumentData() {
  // Initialize with the root folder structure even when empty
  const [documents, setDocuments] = useState<DocumentNode[]>([
    {
      id: 'all-files-root',
      name: 'All files',
      createdAt: new Date().toISOString(),
      type: 'folder' as const,
      children: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const wrapInRootFolder = (docs: DocumentNode[]): DocumentNode[] => {
    return [
      {
        id: 'all-files-root',
        name: 'All files',
        createdAt: new Date().toISOString(),
        type: 'folder' as const,
        children: docs,
      },
    ];
  };

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get<DocumentNode[]>('/api/v1/documents')
      .then((response) => {
        const wrappedDocuments = wrapInRootFolder(response.data);
        setDocuments(wrappedDocuments);
        setLoaded(true);
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
    setLoaded(false);
    axiosClient
      .get<DocumentNode[]>('/api/v1/documents')
      .then((response) => {
        const wrappedDocuments = wrapInRootFolder(response.data);
        setDocuments(wrappedDocuments);
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching documents:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { documents, loading, loaded, refetch };
}
