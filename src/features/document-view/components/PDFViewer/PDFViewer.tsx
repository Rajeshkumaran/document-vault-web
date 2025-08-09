import * as React from 'react';
import { Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Loader2 } from 'lucide-react';

interface PDFViewerProps {
  storagePath: string;
  fileName?: string;
}

export function PDFViewer({ storagePath, fileName }: PDFViewerProps) {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [scale, setScale] = React.useState<number>(1.0);
  const [_isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF document');
    setIsLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber((page) => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setPageNumber((page) => Math.min(numPages, page + 1));
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(3.0, prevScale + 0.25));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(0.5, prevScale - 0.25));
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = storagePath;
    link.download = fileName || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  React.useEffect(() => {
    setIsLoading(true);
    setError(null);
  }, [storagePath]);

  // Effect to handle container width changes
  React.useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth - 32; // Account for padding
        setContainerWidth(width);
      }
    };

    updateContainerWidth();
    const resizeObserver = new ResizeObserver(updateContainerWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className='flex flex-col h-full'>
      {/* PDF Controls */}
      <div className='flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50'>
        <div className='flex items-center space-x-2'>
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className='p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ChevronLeft className='h-4 w-4' />
          </button>
          <span className='text-sm text-gray-600'>
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className='p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>

        <div className='flex items-center space-x-2'>
          <button onClick={zoomOut} className='p-1 rounded hover:bg-gray-200' title='Zoom Out'>
            <ZoomOut className='h-4 w-4' />
          </button>
          <span className='text-sm text-gray-600 min-w-[60px] text-center'>
            {Math.round(scale * 100)}%
          </span>
          <button onClick={zoomIn} className='p-1 rounded hover:bg-gray-200' title='Zoom In'>
            <ZoomIn className='h-4 w-4' />
          </button>
          <div className='w-px h-4 bg-gray-300 mx-1' />
          <button onClick={downloadFile} className='p-1 rounded hover:bg-gray-200' title='Download'>
            <Download className='h-4 w-4' />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div ref={containerRef} className='flex-1 h-full max-h-[500px] overflow-auto bg-gray-100 p-4'>
        <div className='flex justify-center w-full'>
          {error && (
            <div className='flex items-center justify-center h-64 text-red-500'>
              <p>{error}</p>
            </div>
          )}

          {!error && (
            <Document
              file={storagePath}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className='flex items-center justify-center h-64'>
                  <Loader2 className='h-6 w-6 animate-spin text-gray-500' />
                  <span className='ml-2 text-gray-500'>Loading PDF...</span>
                </div>
              }
              className='shadow-lg w-full max-w-full'
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                loading={
                  <div className='flex items-center justify-center h-64'>
                    <Loader2 className='h-6 w-6 animate-spin text-gray-500' />
                  </div>
                }
                className='border border-gray-300 max-w-full'
                width={containerWidth || undefined}
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
