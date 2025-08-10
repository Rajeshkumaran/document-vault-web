import { useEffect, useState, useCallback } from 'react';
import { getDocumentInsights } from '@/data/api';

interface Amount {
  label: string;
  value: number;
  currency: string;
}

interface FinancialData {
  amounts: Amount[];
  dates: string[];
}

interface KeyInsights {
  financial_data: FinancialData;
  coverage_details: string[];
  critical_information: string[];
}

interface DocumentInsights {
  document_type: string;
  key_insights: KeyInsights;
  confidence_score: number;
}

export function useGetDocumentInsights({ documentId }: { documentId: string }) {
  const [insights, setInsights] = useState<DocumentInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getInsights = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDocumentInsights(documentId);

      const parsedInsights = response.insights as DocumentInsights;
      setInsights(parsedInsights);
      setError(null);
    } catch (error) {
      console.error('Error fetching document insights:', error);
      setError('Failed to load document insights');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  return { insights, loading, error, fetchInsights: getInsights };
}
