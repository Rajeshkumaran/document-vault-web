import * as React from 'react';
import { X, CheckCircle, AlertCircle, Upload, Loader2 } from 'lucide-react';
import { UploadProgress } from '../../services/uploadQueue';

interface UploadProgressIndicatorProps {
  uploads: UploadProgress[];
  onClearCompleted?: () => void;
}

export const UploadProgressIndicator: React.FC<UploadProgressIndicatorProps> = ({
  uploads,
  onClearCompleted,
}) => {
  if (uploads.length === 0) {
    return null;
  }

  const stats = uploads.reduce(
    (acc, upload) => {
      acc[upload.status]++;
      acc.total++;
      return acc;
    },
    { pending: 0, uploading: 0, completed: 0, error: 0, total: 0 },
  );

  const isActive = stats.pending > 0 || stats.uploading > 0;
  const hasCompleted = stats.completed > 0 || stats.error > 0;

  return (
    <div className='fixed bottom-4 right-4 w-96 max-h-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50'>
        <div className='flex items-center gap-2'>
          <Upload className='h-4 w-4 text-orange-600' />
          <span className='text-sm font-medium'>
            Uploads ({stats.completed}/{stats.total})
          </span>
        </div>
        <div className='flex items-center gap-1'>
          {hasCompleted && (
            <button
              onClick={onClearCompleted}
              className='text-xs px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded'
              title='Clear completed'
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Progress Summary */}
      {isActive && (
        <div className='p-3 border-b border-gray-200'>
          <div className='flex items-center justify-between text-xs text-gray-600 mb-2'>
            <span>Overall Progress</span>
            <span>{Math.round((stats.completed / stats.total) * 100)}%</span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div
              className='bg-orange-600 h-2 rounded-full transition-all duration-300'
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            />
          </div>
          <div className='flex justify-between text-xs text-gray-500 mt-1'>
            <span>{stats.uploading} uploading</span>
            <span>{stats.pending} pending</span>
          </div>
        </div>
      )}

      {/* Upload List */}
      <div className='max-h-64 overflow-y-auto'>
        {uploads.map((upload) => (
          <UploadItem key={upload.id} upload={upload} />
        ))}
      </div>
    </div>
  );
};

interface UploadItemProps {
  upload: UploadProgress;
  onCancel?: (id: string) => void;
}

const UploadItem: React.FC<UploadItemProps> = ({ upload, onCancel }) => {
  const getStatusIcon = () => {
    switch (upload.status) {
      case 'pending':
        return <div className='h-4 w-4 rounded-full border-2 border-gray-300' />;
      case 'uploading':
        return <Loader2 className='h-4 w-4 text-orange-600 animate-spin' />;
      case 'completed':
        return <CheckCircle className='h-4 w-4 text-green-600' />;
      case 'error':
        return <AlertCircle className='h-4 w-4 text-red-600' />;
    }
  };

  const getStatusColor = () => {
    switch (upload.status) {
      case 'pending':
        return 'text-gray-600';
      case 'uploading':
        return 'text-orange-600';
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
    }
  };

  const canCancel = upload.status === 'pending' || upload.status === 'uploading';

  return (
    <div className='p-3 border-b border-gray-100 last:border-b-0'>
      <div className='flex items-center gap-3'>
        <div className='flex-shrink-0'>{getStatusIcon()}</div>

        <div className='flex-1 min-w-0'>
          <div className='flex items-center justify-between mb-1'>
            <p className='text-sm font-medium text-gray-900 truncate'>{upload.file.name}</p>
            {canCancel && onCancel && (
              <button
                onClick={() => onCancel(upload.id)}
                className='flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded'
                title='Cancel upload'
              >
                <X className='h-3 w-3' />
              </button>
            )}
          </div>

          <div className='flex items-center justify-between text-xs'>
            <span className={`capitalize ${getStatusColor()}`}>
              {upload.status}
              {upload.error && `: ${upload.error}`}
            </span>
            <span className='text-gray-500'>{(upload.file.size / 1024 / 1024).toFixed(1)} MB</span>
          </div>

          {upload.status === 'uploading' && (
            <div className='mt-2'>
              <div className='flex justify-between text-xs text-gray-600 mb-1'>
                <span>Uploading...</span>
                <span>{upload.progress}%</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-1'>
                <div
                  className='bg-orange-600 h-1 rounded-full transition-all duration-300'
                  style={{ width: `${upload.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadProgressIndicator;
