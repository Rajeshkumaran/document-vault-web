import * as React from 'react';
import { Upload } from 'lucide-react';

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
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadMode, setUploadMode] = React.useState<'files' | 'folders'>('files');
  const [customFolderName, setCustomFolderName] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Clear error after 5s
  React.useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(t);
  }, [error]);

  const normalisedTypes = React.useMemo(
    () => allowFileTypes.map((t) => t.trim().toLowerCase()).filter(Boolean),
    [allowFileTypes],
  );

  const isFileAllowed = React.useCallback(
    (file: File) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const dotExt = '.' + ext;
      return (
        normalisedTypes.includes(ext) ||
        normalisedTypes.includes(dotExt) ||
        normalisedTypes.includes(file.type.toLowerCase())
      );
    },
    [normalisedTypes],
  );

  const handleFiles = React.useCallback(
    (files: File[]) => {
      if (!files.length) return;
      const allowed: File[] = [];
      const rejected: File[] = [];
      files.forEach((f) => (isFileAllowed(f) ? allowed.push(f) : rejected.push(f)));
      if (rejected.length) {
        const names = rejected
          .slice(0, 3)
          .map((f) => f.name)
          .join(', ');
        setError(
          `${rejected.length} unsupported file${rejected.length > 1 ? 's' : ''}: ${names}$${
            rejected.length > 3 ? '…' : ''
          }`,
        );
      }
      if (!allowed.length) return;

      // Determine folder name
      let folderName = customFolderName.trim();
      if (!folderName && allowed[0]?.webkitRelativePath) {
        // Extract from file path if available
        const pathParts = allowed[0].webkitRelativePath.split('/');
        if (pathParts.length > 1) {
          folderName = pathParts[0];
        }
      }

      onUploadFiles(allowed, folderName || undefined);
      setCustomFolderName('');
    },
    [onUploadFiles, isFileAllowed, customFolderName],
  );

  const handleUploadInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    handleFiles(files);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if ((e.target as HTMLElement).id === 'drop-zone') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files ?? []);
    handleFiles(files);
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
          onChange={handleUploadInput}
          className='hidden'
        />
      </div>
      {error && (
        <p
          id='upload-error'
          role='alert'
          className='mx-4 mb-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1'
        >
          {error.replace('$', '')}
        </p>
      )}
    </>
  );
};

export default UploadDropZone;
