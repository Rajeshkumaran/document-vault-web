import * as React from 'react';
import { Download } from 'lucide-react';
import Image from 'next/image';

interface ImageViewerProps {
  storagePath: string;
  fileName?: string;
}

export function ImageViewer({ storagePath, fileName }: ImageViewerProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = storagePath;
    link.download = fileName || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError('Failed to load image');
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Image Controls */}
      <div className='flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50'>
        <span className='text-sm font-medium text-gray-700'>{fileName}</span>
        <button onClick={downloadFile} className='p-1 rounded hover:bg-gray-200' title='Download'>
          <Download className='h-4 w-4' />
        </button>
      </div>

      {/* Image Display */}
      <div className='flex-1 overflow-auto bg-gray-100 p-4'>
        <div className='flex justify-center items-center h-full'>
          {error ? (
            <div className='text-red-500 text-center'>
              <p>{error}</p>
              <button
                onClick={downloadFile}
                className='mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
              >
                <Download className='h-4 w-4 inline mr-2' />
                Download Image
              </button>
            </div>
          ) : (
            <div className='relative max-w-full max-h-full'>
              {isLoading && (
                <div className='absolute inset-0 flex items-center justify-center bg-gray-200 rounded'>
                  <div className='text-gray-500'>Loading image...</div>
                </div>
              )}
              <Image
                src={storagePath}
                alt={fileName || 'Image preview'}
                width={800}
                height={600}
                className='object-contain shadow-lg max-w-full max-h-full'
                onLoad={handleImageLoad}
                onError={handleImageError}
                unoptimized={true} // Since we're using Firebase Storage URLs
                priority={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
