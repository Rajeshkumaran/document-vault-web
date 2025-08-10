import * as React from 'react';
import { Upload } from 'lucide-react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

interface UploadDropZoneProps {
  allowFileTypes: string[];
  onUploadFiles: (files: File[], folderName?: string) => void; // Updated to accept folder name
}

export const UploadDropZone: React.FC<UploadDropZoneProps> = ({
  allowFileTypes,
  onUploadFiles,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const folderInputRef = React.useRef<HTMLInputElement | null>(null);

  const { dragActive, error, handleFiles, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop({
      allowFileTypes,
      onUploadFiles: (files, folderName) => {
        onUploadFiles(files, folderName);
      },
    });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    handleFiles(files);
    e.target.value = '';
  };

  const handleFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    handleFiles(files);
    e.target.value = '';
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const openFolderDialog = () => {
    folderInputRef.current?.click();
  };

  return (
    <>
      <div
        id='drop-zone'
        className={
          'm-3 mb-2 rounded border-2 border-dashed transition-colors text-sm flex flex-col items-center justify-center gap-2 px-4 py-6 cursor-pointer ' +
          (dragActive
            ? 'border-orange-600 bg-amber-50'
            : 'border-gray-300 hover:border-orange-400 hover:bg-amber-50/40')
        }
        onDragEnter={handleDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => openFileDialog()}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFileDialog();
          }
        }}
        aria-label='Upload files or folders'
        aria-describedby={error ? 'upload-error' : undefined}
      >
        <Upload className='h-6 w-6 text-orange-600' />
        <div className='text-gray-700 font-medium'>Drag & drop files or folders here</div>
        <div className='text-gray-500 text-xs'>
          or click to browse ({allowFileTypes.join(', ')})
        </div>

        <div className='flex gap-2 mt-2'>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
            className='px-3 py-1 text-xs rounded-full border bg-orange-100 border-orange-300 text-orange-700 hover:bg-orange-200 transition-colors'
          >
            Choose Files
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              openFolderDialog();
            }}
            className='px-3 py-1 text-xs rounded-full border bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 transition-colors'
          >
            Choose Folders
          </button>
        </div>

        {/* File input for regular files */}
        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept={allowFileTypes.join(',')}
          onChange={handleFileInputChange}
          className='hidden'
        />

        <input
          ref={(el) => {
            folderInputRef.current = el;
            if (el) {
              el.setAttribute('webkitdirectory', 'true');
            }
          }}
          type='file'
          multiple
          onChange={handleFolderInputChange}
          className='hidden'
        />
      </div>
      {error && (
        <p
          id='upload-error'
          role='alert'
          className='mx-4 mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1'
        >
          {error}
        </p>
      )}
    </>
  );
};

export default UploadDropZone;
