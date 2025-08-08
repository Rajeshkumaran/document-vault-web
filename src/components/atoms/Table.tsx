import { ReactNode } from 'react';

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className='overflow-x-auto w-full'>
      <table className='w-full text-left text-sm border-collapse'>{children}</table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className='bg-gray-50 text-gray-700 font-semibold'>{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className='divide-y divide-gray-100'>{children}</tbody>;
}

export function TR({ children }: { children: ReactNode }) {
  return <tr className='hover:bg-gray-50/80 transition-colors'>{children}</tr>;
}

export function TH({ children }: { children: ReactNode }) {
  return <th className='py-2 px-3 text-xs font-medium uppercase tracking-wide'>{children}</th>;
}

export function TD({ children }: { children: ReactNode }) {
  return <td className='py-2 px-3 align-middle'>{children}</td>;
}
