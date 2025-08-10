import React from 'react';

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

interface InsightsProps {
  insights?: DocumentInsights;
}

const Insights: React.FC<InsightsProps> = ({ insights }) => {
  if (!insights) {
    return (
      <div className='p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200/50'>
        <div className='text-center'>
          <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-blue-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
              />
            </svg>
          </div>
          <p className='text-sm font-medium mb-1 text-gray-900'>No insights available</p>
          <p className='text-xs text-gray-500'>Generate insights to see analysis here</p>
        </div>
      </div>
    );
  }

  const { document_type, key_insights, confidence_score } = insights;
  const confidencePercentage = Math.round(confidence_score * 100);

  return (
    <div className='space-y-6 max-h-[550px] overflow-y-auto pr-2'>
      {/* Header Card */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200/50 p-5'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                />
              </svg>
            </div>
            <span className='text-sm font-medium text-gray-600 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1.5 rounded-full'>
              AI Generated Insights
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full'>
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  confidence_score >= 0.8
                    ? 'bg-emerald-500 shadow-sm shadow-emerald-500/30'
                    : confidence_score >= 0.6
                    ? 'bg-amber-500 shadow-sm shadow-amber-500/30'
                    : 'bg-red-500 shadow-sm shadow-red-500/30'
                }`}
              />
              <span className='text-sm font-semibold text-gray-700'>
                {confidencePercentage}% confidence
              </span>
            </div>
          </div>
        </div>
        <p className='text-xs text-gray-500 mt-2'>
          Document Type: <span className='font-medium text-gray-700'>{document_type}</span>
        </p>
      </div>

      {/* Financial Data */}
      {key_insights.financial_data.amounts.length > 0 && (
        <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50 p-6'>
          <div className='flex items-center mb-4'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mr-3'>
              <svg
                className='w-5 h-5 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>Financial Information</h3>
              <p className='text-sm text-gray-500'>Monetary values extracted from document</p>
            </div>
          </div>
          <div className='grid gap-3'>
            {key_insights.financial_data.amounts.map((amount, index) => (
              <div
                key={index}
                className='flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow'
              >
                <span className='text-sm font-medium text-gray-700'>{amount.label}</span>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full'>
                    {amount.currency} {amount.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coverage Details */}
      {key_insights.coverage_details.length > 0 && (
        <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50 p-6'>
          <div className='flex items-center mb-4'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-3'>
              <svg
                className='w-5 h-5 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>Coverage Details</h3>
              <p className='text-sm text-gray-500'>Protection and coverage information</p>
            </div>
          </div>
          <div className='space-y-3'>
            {key_insights.coverage_details.map((detail, index) => (
              <div
                key={index}
                className='flex items-start space-x-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100'
              >
                <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0' />
                <span className='text-sm text-gray-700 leading-relaxed'>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Information */}
      {key_insights.critical_information.length > 0 && (
        <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50 p-6'>
          <div className='flex items-center mb-4'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mr-3'>
              <svg
                className='w-5 h-5 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>Critical Information</h3>
              <p className='text-sm text-gray-500'>Important details requiring attention</p>
            </div>
          </div>
          <div className='space-y-3'>
            {key_insights.critical_information.map((info, index) => (
              <div
                key={index}
                className='relative p-4 rounded-lg bg-amber-50/50 border border-amber-200'
              >
                <div className='absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-lg' />
                <div className='flex items-start space-x-3'>
                  <div className='w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0' />
                  <span className='text-sm text-gray-700 leading-relaxed block'>{info}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200/50 p-4'>
        <div className='text-center'>
          <div className='flex items-center justify-center space-x-2 mb-2'>
            <div className='w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse' />
            <div
              className='w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse'
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse'
              style={{ animationDelay: '0.4s' }}
            />
          </div>
          <p className='text-xs text-gray-500 leading-relaxed'>
            Analysis generated with{' '}
            <span className='font-semibold text-gray-700'>{confidencePercentage}%</span> confidence
            <br />
            <span className='text-gray-400'>
              Data extracted from document structure and content
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
