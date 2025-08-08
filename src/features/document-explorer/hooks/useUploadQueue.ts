import { useCallback, useEffect, useRef, useState } from 'react';
import { generateUUID } from '@/lib/utils';
import { UploadQueue, UploadProgress } from '../services/uploadQueue';

export const useUploadQueue = (maxConcurrentUploads = 3) => {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const queueRef = useRef<UploadQueue | null>(null);

  useEffect(() => {
    // Initialize upload queue
    queueRef.current = new UploadQueue(maxConcurrentUploads, (progress) => {
      setUploads([...progress]);
    });

    return () => {
      // Cleanup on unmount
      if (queueRef.current) {
        queueRef.current.cancelAllUploads();
      }
    };
  }, [maxConcurrentUploads]);

  const addFiles = useCallback((files: File[], folderName?: string): string[] => {
    if (!queueRef.current) return [];
    const folderId = generateUUID();
    return queueRef.current.addFiles(files, folderName, folderId);
  }, []);

  const cancelUpload = useCallback((id: string) => {
    if (queueRef.current) {
      queueRef.current.cancelUpload(id);
    }
  }, []);

  const cancelAllUploads = useCallback(() => {
    if (queueRef.current) {
      queueRef.current.cancelAllUploads();
    }
  }, []);

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
    cancelUpload,
    cancelAllUploads,
    clearCompleted,
    isActive,
    getStats,
  };
};
