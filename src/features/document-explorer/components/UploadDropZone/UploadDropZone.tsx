import * as React from 'react';
import { Upload } from 'lucide-react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

interface UploadDropZoneProps {
  allowFileTypes: string[];
  onUploadFiles: (files: File[], folderName?: string) => void; // Updated to accept folder name
  allowFolders?: boolean; // New prop to control folder upload
}

export const UploadDropZone: React.FC<UploadDropZoneProps> = ({
  allowFileTypes,
  onUploadFiles,
  allowFolders = false,
}) => {
  const [uploadMode, setUploadMode] = React.useState<'files' | 'folders'>('files');
  const [customFolderName, setCustomFolderName] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const { dragActive, error, handleFiles, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop({
      allowFileTypes,
      onUploadFiles: (files, folderName) => {
        onUploadFiles(files, folderName);
        setCustomFolderName('');
      },
    });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    handleFiles(files, customFolderName);
    e.target.value = '';
    setCustomFolderName('');
  };

  const handleDropWithCustomFolder = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files ?? []);
    handleFiles(files, customFolderName);
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
        onDrop={customFolderName ? handleDropWithCustomFolder : handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        aria-label='Upload files'
        aria-describedby={error ? 'upload-error' : undefined}
      >
        <Upload className='h-6 w-6 text-orange-600' />
        <div className='text-gray-700 font-medium'>
          Drag & drop {uploadMode === 'folders' ? 'folders' : 'files'} here
        </div>
        <div className='text-gray-500 text-xs'>
          or click to browse ({allowFileTypes.join(', ')})
        </div>

        {allowFolders && (
          <div className='flex gap-2 mt-2'>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setUploadMode('files');
              }}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                uploadMode === 'files'
                  ? 'bg-orange-100 border-orange-300 text-orange-700'
                  : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Files
            </button>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setUploadMode('folders');
              }}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                uploadMode === 'folders'
                  ? 'bg-orange-100 border-orange-300 text-orange-700'
                  : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Folders
            </button>
          </div>
        )}

        {/* Custom folder name input */}
        {uploadMode === 'files' && (
          <div className='mt-2 w-full max-w-xs'>
            <input
              type='text'
              placeholder='Optional folder name'
              value={customFolderName}
              onChange={(e) => {
                e.stopPropagation();
                setCustomFolderName(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              className='w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200'
            />
          </div>
        )}

        <input
          ref={(el) => {
            fileInputRef.current = el;
            if (el) {
              if (uploadMode === 'folders') {
                el.setAttribute('webkitdirectory', 'true');
              } else {
                el.removeAttribute('webkitdirectory');
              }
            }
          }}
          type='file'
          multiple
          accept={allowFileTypes.join(',')}
          onChange={handleFileInputChange}
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
