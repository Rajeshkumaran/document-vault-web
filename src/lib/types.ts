export interface Document {
  id: string;
  name: string;
  mimeType: string;
  size: number; // bytes
  updatedAt: string; // ISO date
}
export interface Amount {
  label: string;
  value: number;
  currency: string;
}

export interface FinancialData {
  amounts: Amount[];
  dates: string[];
}

export interface KeyInsights {
  financial_data: FinancialData;
  coverage_details: string[];
  critical_information: string[];
}

export interface DocumentInsights {
  document_type: string;
  key_insights: KeyInsights;
  confidence_score: number;
}
