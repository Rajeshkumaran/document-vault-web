import { Logo } from '@atoms';

export function Header() {
  return (
    <header className='sticky top-0 z-40 w-full bg-white backdrop-blur supports-[backdrop-filter]:bg-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.06)] border-b border-transparent'>
      <div className='mx-6 px-6 h-16 flex items-center justify-between'>
        <div className='flex items-center gap-2 w-[100px]'>
          <Logo />
        </div>
      </div>
    </header>
  );
}
