import '../globals.css';
import './auth.css';
import AppShell from '@/components/layout/app-shell';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
