import { useEffect, useState, useRef } from 'react';
import { axiosClient } from '@/lib/axiosClient';

export function useGetDocumentSummary({ documentId }: { documentId: string }) {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!documentId) return;

    // Don't fetch if we already have data for this documentId
    if (hasFetchedRef.current.has(documentId)) {
      return;
    }

    setLoading(true);
    setError(null);

    axiosClient
      .get<{ summary: string }>(`/api/v1/documents/${documentId}/summary`)
      .then((response) => {
        const { data } = response;
        setSummary(data.summary);
        hasFetchedRef.current.add(documentId);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching document summary:', error);
        setError('Failed to load document summary');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [documentId]);

  return { summary, loading, error };
}
