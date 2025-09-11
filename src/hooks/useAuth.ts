// src/hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateToken, refreshToken } from '@/lib/api';

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
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        router.push('/login');
        return;
      }

      try {
        const validationResult = await validateToken(token);

        if (validationResult.valid && validationResult.user) {
          setUser(validationResult.user);
          setLoading(false);
          return;
        }

        const refreshResult = await refreshToken(token);

        if (refreshResult?.access_token) {
          localStorage.setItem('token', refreshResult.access_token);
          const newValidation = await validateToken(refreshResult.access_token);
          if (newValidation.valid && newValidation.user) {
            setUser(newValidation.user);
            setLoading(false);
            return;
          }
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Clear cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
  };

  return { user, loading, logout };
}