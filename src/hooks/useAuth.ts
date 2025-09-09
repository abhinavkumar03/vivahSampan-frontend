// src/hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateToken } from '@/lib/api';

interface User {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    validateToken(token)
      .then((response) => {
        if (response.success) {
          setUser(response.user);
        } else {
          localStorage.removeItem('token');
          router.push('/auth/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/auth/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login');
  };

  return { user, loading, logout };
}
