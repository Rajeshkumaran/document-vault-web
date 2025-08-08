import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-9 px-4 py-2',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-600',
        variant === 'secondary' &&
          'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
        variant === 'ghost' && 'hover:bg-gray-100 text-gray-900',
        className,
      )}
      {...props}
    />
  );
}
