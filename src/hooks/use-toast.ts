// src/hooks/use-toast.ts
'use client';

import { useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  type?: ToastType;
  duration?: number;
}

export function useToast() {
  const show = useCallback((message: string, type: ToastType = 'info') => {
    if (typeof window === 'undefined') return;

    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 p-4 rounded-md shadow-lg text-sm font-medium text-white ${
      type === 'success' ? 'bg-green-600' :
      type === 'error' ? 'bg-red-600' :
      'bg-gray-700'
    }`;
    toast.textContent = message;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }, []);

  return {
    success: (message: string) => show(message, 'success'),
    error: (message: string) => show(message, 'error'),
    info: (message: string) => show(message, 'info'),
  };
}
