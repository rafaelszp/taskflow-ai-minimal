'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
  title?: string;
  description?: string;
  onClose?: () => void;
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Toaster({
  variant = 'default',
  title,
  description,
  onClose,
  duration = 5000,
  open: openProp,
  onOpenChange,
  ...props
}: ToasterProps) {
  const [open, setOpen] = React.useState(openProp ?? false);
  const { theme } = useTheme();

  React.useEffect(() => {
    setOpen(openProp ?? false);
  }, [openProp]);

  React.useEffect(() => {
    if (open && duration) {
      const timer = setTimeout(() => {
        setOpen(false);
        onOpenChange?.(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose, onOpenChange]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    onOpenChange?.(isOpen);
    if (!isOpen) {
      onClose?.();
    }
  };

  return (
    <ToastProvider>
      <Toast
        variant={variant}
        open={open}
        onOpenChange={handleOpenChange}
        className={cn(theme === 'dark' ? 'dark' : '', props.className)}
      >
        <div className="grid gap-1">
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && (
            <ToastDescription>{description}</ToastDescription>
          )}
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export function useToast() {
  const [toast, setToast] = React.useState<{
    title?: string;
    description?: string;
    variant?: 'default' | 'destructive' | 'success';
    duration?: number;
  } | null>(null);

  const showToast = React.useCallback(
    ({
      title,
      description,
      variant = 'default',
      duration = 5000,
    }: {
      title?: string;
      description?: string;
      variant?: 'default' | 'destructive' | 'success';
      duration?: number;
    }) => {
      setToast({ title, description, variant, duration });
    },
    []
  );

  const ToastComponent = React.useMemo(
    () =>
      toast && (
        <Toaster
          open={!!toast}
          onOpenChange={(open) => {
            if (!open) setToast(null);
          }}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          duration={toast.duration}
        />
      ),
    [toast]
  );

  return {
    toast: showToast,
    Toast: ToastComponent,
  };
}
