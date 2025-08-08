import { useEffect, useState } from 'react';
import { Document } from '@/lib/types';
import { getDocuments } from '../services/documentApi';

export function useDocumentData() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDocuments()
      .then(setDocuments)
      .catch((err) => setError(err.message || 'Failed to load documents'))
      .finally(() => setLoading(false));
  }, []);

  return { documents, loading, error };
}
