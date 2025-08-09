import * as React from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Import PDF worker setup
import '@/lib/pdfWorkerSetup';

// Import modular viewer components
import { PDFViewer } from '../PDFViewer/PDFViewer';
import { ImageViewer } from '../ImageViewer/ImageViewer';
import { UnsupportedFileViewer } from '../UnsupportedFileViewer/UnsupportedFileViewer';
import { EmptyStateViewer } from '../EmptyStateViewer/EmptyStateViewer';
import { FileTypeDetector } from '../../utils/fileTypeDetector';

interface PreviewViewProps {
  storagePath?: string;
  fileName?: string;
  fileType?: string;
}

export function PreviewView({ storagePath, fileName, fileType }: PreviewViewProps) {
  // Handle different file types using the modular components
  const renderContent = () => {
    if (!storagePath) {
      return <EmptyStateViewer />;
    }

    const fileTypeInfo = FileTypeDetector.detectFileType(storagePath, fileType);

    switch (fileTypeInfo.category) {
      case 'pdf':
        return <PDFViewer storagePath={storagePath} fileName={fileName} />;

      case 'image':
        return <ImageViewer storagePath={storagePath} fileName={fileName} />;

      default:
        return (
          <UnsupportedFileViewer
            storagePath={storagePath}
            fileName={fileName}
            fileType={fileType}
          />
        );
    }
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='mb-4 flex-shrink-0'>
        <p className='text-xs text-gray-500'>{fileName}</p>
      </div>
      <div className='flex-1 border border-gray-200 rounded-lg overflow-auto'>
        {renderContent()}
      </div>
    </div>
  );
}
