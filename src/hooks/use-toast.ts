'use client';

import { useCallback } from 'react';

type ToastVariant = 'default' | 'destructive' | 'success';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export function useToast() {
  const toast = useCallback(({ title, description, variant = 'default' }: ToastOptions) => {
    // Implementação simplificada que apenas loga no console
    console.log(`[${variant}] ${title}: ${description || ''}`);
  }, []);

  return { toast };
}
