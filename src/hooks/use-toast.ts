// src/hooks/use-toast.ts
'use client';

import { useCallback } from 'react';

export function useToast() {
  return useCallback((message: string) => {
    // Ensure it's only executed client-side after hydration
    if (typeof window !== 'undefined') {
      setTimeout(() => alert(message), 0);
    }
  }, []);
}
