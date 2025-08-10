'use client';
import * as React from 'react';
import { ToastComponent, type Toast } from './Toast';

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

const ToastContext = React.createContext<ToastContextType | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const showToast = React.useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 15);
    const newToast: Toast = {
      id,
      duration: 5000, // Default 5 seconds
      ...toastData,
    };

    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = React.useMemo(
    () => ({
      showToast,
      removeToast,
      toasts,
    }),
    [showToast, removeToast, toasts],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Toast Container */}
      <div className='fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none max-w-md'>
        {toasts.map((toast) => (
          <div key={toast.id} className='pointer-events-auto'>
            <ToastComponent toast={toast} onClose={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Convenience hooks for different toast types
export const useToastHelpers = () => {
  const { showToast } = useToast();

  const showSuccess = React.useCallback(
    (title: string, message?: string, options?: Partial<Toast>) => {
      showToast({ type: 'success', title, message, ...options });
    },
    [showToast],
  );

  const showError = React.useCallback(
    (title: string, message?: string, options?: Partial<Toast>) => {
      showToast({ type: 'error', title, message, ...options });
    },
    [showToast],
  );

  const showWarning = React.useCallback(
    (title: string, message?: string, options?: Partial<Toast>) => {
      showToast({ type: 'warning', title, message, ...options });
    },
    [showToast],
  );

  const showInfo = React.useCallback(
    (title: string, message?: string, options?: Partial<Toast>) => {
      showToast({ type: 'info', title, message, ...options });
    },
    [showToast],
  );

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default ToastProvider;
