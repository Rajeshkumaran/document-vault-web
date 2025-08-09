import { useEffect, useState, useCallback } from 'react';
import { axiosClient } from '@/lib/axiosClient';
import { mockSummary } from '../utils/mockSummary';

export function useGetDocumentSummary({ documentId }: { documentId: string }) {
  const [summary, setSummary] = useState<string>(mockSummary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get<{ summary: string }>(
        `/api/v1/documents/${documentId}/summary`,
      );
      setSummary(response.data.summary);
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

  return { summary, loading, error };
}
