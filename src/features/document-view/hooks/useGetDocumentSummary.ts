import { useEffect, useState, useCallback } from 'react';
import { getDocumentSummary } from '@/data/api';

export function useGetDocumentSummary({ documentId }: { documentId: string }) {
  const [summary, setSummary] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDocumentSummary(documentId);
      setSummary(response.summary);
      setError(null);
    } catch (error) {
      console.error('Error fetching document summary:', error);
      setError('Failed to load document summary');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    getSummary();
  }, [getSummary]);

  return { summary, loading, error, fetch: getSummary };
}
