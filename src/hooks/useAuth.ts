// src/hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { TokenService } from '@/lib/auth/token-service';

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
      const token = TokenService.getToken();

      if (!token) {
        setLoading(false);
        router.push('/login');
        return;
      }

      try {
        const validationResult = await authAPI.validateToken(token);

        if (validationResult.valid && validationResult.user) {
          setUser(validationResult.user);
          setLoading(false);
          return;
        }

        const refreshResult = await authAPI.refreshToken(token);

        if (refreshResult?.access_token) {
          TokenService.setToken(refreshResult.access_token);
          const newValidation = await authAPI.validateToken(refreshResult.access_token);
          if (newValidation.valid && newValidation.user) {
            setUser(newValidation.user);
            setLoading(false);
            return;
          }
        }

        TokenService.removeToken();
        router.push('/login');
      } catch (error) {
        console.error('Auth check error:', error);
        TokenService.removeToken();
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);


  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      TokenService.removeToken();
      router.push('/login');
    }
  };

  return { user, loading, logout };
}