'use client';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b">
        <nav className="max-w-4xl mx-auto flex gap-4 p-3">
          <Link href="/">Home</Link>
          <Link href={ROUTES.login}>Login</Link>
          <Link href={ROUTES.signup}>Sign up</Link>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto p-4 grow">{children}</main>
      <footer className="border-t p-4 text-center text-sm">© MyApp</footer>
    </div>
  );
}
