import { useEffect, useState, useCallback } from 'react';
import { axiosClient } from '@/lib/axiosClient';

const mockSummary = `
 ## Resume Summary\n\n**Title:** Amoha V - Computer Science Student Resume\n\n**TL;DR:** Third-year Computer Science student at Shiv Nadar University with strong IoT/ML experience, including a software development internship at Valeo India and multiple hackathon wins.\n\n**Key Points:**\n• **Education:** B.Tech Computer Science with IoT specialization (2023-2027), CGPA: 9.36\n• **Professional Experience:** Software Development Intern at Valeo India (Jun-Jul 2024), developed automated dashboard reducing analysis time by 50%\n• **Notable Projects:**\n  - Sproutique: IoT plantation monitoring system (40% pesticide reduction, 25% yield increase)\n  - MCP Terminal Server with real-time AI command execution\n  - HuffZip compression tool achieving 40-60% file size reduction\n  - DocQuery RAG system with 87% query accuracy improvement\n• **Technical Skills:** Python, C, MERN Stack, IoT (ESP32, LoRaWAN), AI/ML (TensorFlow, PyTorch, LLMs), Cloud platforms\n• **Achievements:** Winner at 3 hackathons (Envithon'24, Itrix'25, Innovate-X'25), Campus Ambassador roles, Top 1% in Cyber Security\n• **Research:** Water Quality Index Prediction using ML with 92% accuracy\n• **Certifications:** Multiple Google Cloud, AWS, and Meta certifications in ML/AI\n\n**Action Items:**\n• None identified - this is a completed resume document 
`;

export function useGetDocumentSummary({ documentId }: { documentId: string }) {
  const [summary, setSummary] = useState<string>('');
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
