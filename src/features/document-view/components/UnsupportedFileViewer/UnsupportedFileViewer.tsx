import * as React from 'react';
import { Download, FileText } from 'lucide-react';

interface UnsupportedFileViewerProps {
  storagePath: string;
  fileName?: string;
  fileType?: string;
}

export function UnsupportedFileViewer({
  storagePath,
  fileName,
  fileType,
}: UnsupportedFileViewerProps) {
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = storagePath;
    link.download = fileName || 'document';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFileTypeDisplay = (type?: string) => {
    if (!type) return 'Unknown';
    return type.toUpperCase();
  };

  return (
    <div className='flex flex-col items-center justify-center h-full text-gray-500 p-8'>
      <div className='text-center'>
        {/* File Icon */}
        <div className='mb-6'>
          <FileText className='h-16 w-16 text-gray-400 mx-auto' />
        </div>

        {/* File Information */}
        <h3 className='text-lg font-medium text-gray-700 mb-2'>Preview Not Available</h3>
        <p className='text-gray-500 mb-2'>This file type is not supported for preview</p>

        {fileName && (
          <p className='text-sm text-gray-400 mb-1'>
            <strong>File:</strong> {fileName}
          </p>
        )}

        {fileType && (
          <p className='text-sm text-gray-400 mb-6'>
            <strong>Type:</strong> {getFileTypeDisplay(fileType)} file
          </p>
        )}

        {/* Download Button */}
        <button
          onClick={downloadFile}
          className='flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          <Download className='h-5 w-5' />
          <span>Download File</span>
        </button>

        {/* Supported Formats Info */}
        <div className='mt-8 text-xs text-gray-400 max-w-md'>
          <p className='mb-2'>
            <strong>Supported preview formats:</strong>
          </p>
          <p>• PDF documents</p>
          <p>• Images (JPG, PNG, GIF, WebP)</p>
        </div>
      </div>
    </div>
  );
}
