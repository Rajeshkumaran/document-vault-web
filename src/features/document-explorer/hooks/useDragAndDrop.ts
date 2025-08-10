import * as React from 'react';

// Simple types for FileSystem API support
interface FileSystemEntryLike {
  isFile: boolean;
  isDirectory: boolean;
  name: string;
  file?: (callback: (file: File) => void) => void;
  createReader?: () => {
    readEntries: (callback: (entries: FileSystemEntryLike[]) => void) => void;
  };
}

interface UseDragAndDropOptions {
  allowFileTypes: string[];
  onUploadFiles: (files: File[], folderName?: string) => void;
  onError?: (error: string) => void;
}

interface UseDragAndDropReturn {
  // State
  dragActive: boolean;
  error: string | null;

  // File validation
  isFileAllowed: (file: File) => boolean;

  // Handlers
  handleFiles: (files: File[], customFolderName?: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleUploadInput: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Error management
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  clearError: () => void;
}

export const useDragAndDrop = ({
  allowFileTypes,
  onUploadFiles,
  onError,
}: UseDragAndDropOptions): UseDragAndDropReturn => {
  const [dragActive, setDragActive] = React.useState(false);
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
    (files: File[], customFolderName?: string) => {
      if (!files.length) return;

      const allowed: File[] = [];
      const rejected: File[] = [];

      files.forEach((f) => (isFileAllowed(f) ? allowed.push(f) : rejected.push(f)));

      if (rejected.length) {
        const names = rejected
          .slice(0, 3)
          .map((f) => f.name)
          .join(', ');
        const errorMessage = `${rejected.length} unsupported file${
          rejected.length > 1 ? 's' : ''
        }: ${names}${rejected.length > 3 ? '…' : ''}`;
        setError(errorMessage);
        onError?.(errorMessage);
      }

      if (!allowed.length) return;

      // Determine folder name
      let folderName = customFolderName?.trim();
      if (!folderName && allowed[0]?.webkitRelativePath) {
        // Extract from file path if available
        const pathParts = allowed[0].webkitRelativePath.split('/');
        if (pathParts.length > 1) {
          folderName = pathParts[0];
        }
      }

      onUploadFiles(allowed, folderName || undefined);
    },
    [onUploadFiles, isFileAllowed, onError],
  );

  const handleUploadInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      handleFiles(files);
      e.target.value = '';
    },
    [handleFiles],
  );

  const handleDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!dragActive) setDragActive(true);
    },
    [dragActive],
  );

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if ((e.target as HTMLElement).id === 'drop-zone') setDragActive(false);
  }, []);

  const handleDrop = React.useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const items = Array.from(e.dataTransfer.items);
      const files: File[] = [];

      // Check if we have DataTransferItems and webkitGetAsEntry support
      const hasWebkitSupport = items.length > 0 && 'webkitGetAsEntry' in items[0];

      if (hasWebkitSupport) {
        // Use the FileSystem API for better folder support
        const entries = items
          .map((item) => {
            // Type assertion for webkitGetAsEntry which may not be in all DataTransferItem types
            const itemWithWebkit = item as DataTransferItem & {
              webkitGetAsEntry?: () => FileSystemEntryLike | null;
            };
            const entry = itemWithWebkit.webkitGetAsEntry?.();
            return entry as FileSystemEntryLike | null;
          })
          .filter((entry): entry is FileSystemEntryLike => entry !== null);

        const processEntry = async (entry: FileSystemEntryLike, folderPath = ''): Promise<void> => {
          if (entry.isFile && entry.file) {
            return new Promise<void>((resolve) => {
              entry.file!((file: File) => {
                // Create a new file with the correct webkitRelativePath
                const newFile = new File([file], file.name, {
                  type: file.type,
                  lastModified: file.lastModified,
                });
                // Add the path information
                Object.defineProperty(newFile, 'webkitRelativePath', {
                  value: folderPath ? `${folderPath}/${file.name}` : file.name,
                  writable: false,
                });
                files.push(newFile);
                resolve();
              });
            });
          } else if (entry.isDirectory && entry.createReader) {
            const reader = entry.createReader();
            return new Promise<void>((resolve) => {
              reader.readEntries(async (entries: FileSystemEntryLike[]) => {
                const newFolderPath = folderPath ? `${folderPath}/${entry.name}` : entry.name;
                await Promise.all(entries.map((subEntry) => processEntry(subEntry, newFolderPath)));
                resolve();
              });
            });
          }
        };

        try {
          await Promise.all(entries.map((entry) => processEntry(entry)));
          handleFiles(files);
        } catch (error) {
          console.error('Error processing dropped folders:', error);
          setError('Error processing dropped folders. Please try again.');
        }
      } else {
        // Fallback to the original method for simple file drops
        const files = Array.from(e.dataTransfer.files ?? []);
        handleFiles(files);
      }
    },
    [handleFiles, setError],
  );

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    dragActive,
    error,

    // File validation
    isFileAllowed,

    // Handlers
    handleFiles,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleUploadInput,

    // Error management
    setError,
    clearError,
  };
};
