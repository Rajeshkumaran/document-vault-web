import * as React from 'react';
import { X, CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const getToastIcon = (type: Toast['type']) => {
  const baseClass = 'w-5 h-5';

  switch (type) {
    case 'success':
      return (
        <div className='w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center'>
          <CheckCircle className={`${baseClass} text-green-600 dark:text-green-400`} />
        </div>
      );
    case 'error':
      return (
        <div className='w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center'>
          <XCircle className={`${baseClass} text-red-600 dark:text-red-400`} />
        </div>
      );
    case 'warning':
      return (
        <div className='w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center'>
          <AlertCircle className={`${baseClass} text-amber-600 dark:text-amber-400`} />
        </div>
      );
    case 'info':
      return (
        <div className='w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center'>
          <Info className={`${baseClass} text-blue-600 dark:text-blue-400`} />
        </div>
      );
    default:
      return (
        <div className='w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center'>
          <Info className={`${baseClass} text-gray-600 dark:text-gray-400`} />
        </div>
      );
  }
};

const getToastColors = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'bg-white dark:bg-gray-800 border-l-4 border-l-green-500 shadow-lg shadow-green-500/20';
    case 'error':
      return 'bg-white dark:bg-gray-800 border-l-4 border-l-red-500 shadow-lg shadow-red-500/20';
    case 'warning':
      return 'bg-white dark:bg-gray-800 border-l-4 border-l-amber-500 shadow-lg shadow-amber-500/20';
    case 'info':
      return 'bg-white dark:bg-gray-800 border-l-4 border-l-blue-500 shadow-lg shadow-blue-500/20';
    default:
      return 'bg-white dark:bg-gray-800 border-l-4 border-l-gray-500 shadow-lg';
  }
};

export const ToastComponent: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 200);
  }, [onClose, toast.id]);

  React.useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, handleClose]);

  return (
    <div
      className={`
        relative transform transition-all duration-300 ease-out
        ${
          isVisible && !isExiting
            ? 'translate-x-0 opacity-100 scale-100'
            : isExiting
            ? 'translate-x-full opacity-0 scale-95'
            : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      <div
        className={`
          w-96 max-w-md p-4 rounded-lg border border-gray-200 dark:border-gray-700
          ${getToastColors(toast.type)}
          backdrop-blur-sm hover:shadow-xl transition-shadow duration-200
        `}
      >
        <div className='flex items-start space-x-3'>
          <div className='flex-shrink-0'>{getToastIcon(toast.type)}</div>

          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <h4 className='text-sm font-semibold text-gray-900 dark:text-white leading-5'>
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className='mt-1 text-sm text-gray-600 dark:text-gray-300 leading-5'>
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                onClick={handleClose}
                className='ml-3 flex-shrink-0 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group'
                aria-label='Close notification'
              >
                <X className='w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200' />
              </button>
            </div>

            {toast.action && (
              <div className='mt-3'>
                <button
                  onClick={toast.action.onClick}
                  className='text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors hover:underline'
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastComponent;
