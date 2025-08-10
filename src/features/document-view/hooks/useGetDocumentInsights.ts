import { useState, useCallback } from 'react';
import { getDocumentInsights } from '@/data/api';
import { DocumentInsights } from '@/lib/types';

export function useGetDocumentInsights({ documentId }: { documentId: string }) {
  const [insights, setInsights] = useState<DocumentInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInsights = useCallback(async () => {
    setLoading(true);
    setError(null);
    setLoaded(false);
    try {
      const response = await getDocumentInsights(documentId);

      const parsedInsights = response.insights as DocumentInsights;
      setInsights(parsedInsights);
      setError(null);
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching document insights:', error);
      setError('Failed to load document insights');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  return { insights, loaded, loading, error, fetchInsights: getInsights };
}
