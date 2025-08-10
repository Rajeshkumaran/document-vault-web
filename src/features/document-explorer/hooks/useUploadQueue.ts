import { useCallback, useEffect, useRef, useState } from 'react';
import { UploadQueue, UploadProgress } from '../services/uploadQueue';

export const useUploadQueue = (maxConcurrentUploads = 3, onAllUploadsComplete?: () => void) => {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const queueRef = useRef<UploadQueue | null>(null);
  const callbackRef = useRef(onAllUploadsComplete);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = onAllUploadsComplete;
  }, [onAllUploadsComplete]);

  useEffect(() => {
    // Initialize upload queue
    queueRef.current = new UploadQueue(
      maxConcurrentUploads,
      (progress) => {
        setUploads([...progress]);
      },
      () => {
        // Use the latest callback from ref
        if (callbackRef.current) {
          callbackRef.current();
        }
      },
    );

    return () => {
      // Cleanup on unmount
      if (queueRef.current) {
        queueRef.current.cancelAllUploads();
      }
    };
  }, [maxConcurrentUploads]); // Remove onAllUploadsComplete from dependencies

  const addFiles = useCallback(
    (
      files: File[],
      metaData: {
        currentFolderId?: string;
      },
    ): string[] => {
      if (!queueRef.current) return [];
      return queueRef.current.addFiles(files, metaData);
    },
    [],
  );

  const clearCompleted = useCallback(() => {
    if (queueRef.current) {
      queueRef.current.clearCompleted();
    }
  }, []);

  const isActive = useCallback((): boolean => {
    return queueRef.current?.isActive() ?? false;
  }, []);

  const getStats = useCallback(() => {
    return (
      queueRef.current?.getStats() ?? {
        pending: 0,
        uploading: 0,
        completed: 0,
        error: 0,
        total: 0,
      }
    );
  }, []);

  return {
    uploads,
    addFiles,
    clearCompleted,
    isActive,
    getStats,
  };
};
