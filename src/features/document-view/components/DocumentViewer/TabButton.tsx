import * as React from 'react';

interface TabButtonProps {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export function TabButton({ active, children, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative px-4 py-2 text-sm font-medium rounded-t-md transition-colors',
        active
          ? 'bg-white text-gray-900 border border-gray-200 border-b-white'
          : 'text-gray-600 hover:text-gray-900',
      ].join(' ')}
      aria-current={active ? 'page' : undefined}
      type='button'
    >
      {children}
    </button>
  );
}
