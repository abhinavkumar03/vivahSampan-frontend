'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Button from '@/components/ui/button';

export default function AppPage() {
  const { loading, authenticated } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return null;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome to VivahSampan 🎉</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/users">
          <Button className="w-full">Users</Button>
        </Link>
        <Link href="/vendors">
          <Button className="w-full">Vendors</Button>
        </Link>
        <Link href="/media/upload">
          <Button className="w-full">Upload Media</Button>
        </Link>
      </div>
    </div>
  );
}
