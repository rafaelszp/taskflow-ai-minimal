'use client';

import * as React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  useForm as useHookForm,
  useFormContext,
  Controller,
  type UseControllerProps,
  type FieldValues,
  type Path,
  type FieldPath,
  type UseFormReturn,
  type ControllerRenderProps,
  type UseFormStateReturn,
  type SubmitHandler,
  type FormProviderProps,
  FormProvider,
} from 'react-hook-form';
import { cn } from '@/lib/utils';

// Re-export commonly used types and hooks
export { useForm, useFormContext } from 'react-hook-form';
export { zodResolver } from '@hookform/resolvers/zod';

type FormProps<T extends FieldValues> = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
  children: React.ReactNode;
};

/**
 * Form component that wraps react-hook-form's form handling with proper TypeScript support.
 */
export function Form<T extends FieldValues>({ 
  form, 
  onSubmit, 
  className, 
  children,
  ...props 
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className={cn('space-y-4', className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

// FormField, FormItem, FormLabel, and FormMessage are now provided by form-field.tsx
// FormControl and FormDescription are also provided by form-field.tsx

// Export types for easier consumption
export type {
  FieldValues,
  UseFormReturn,
  SubmitHandler,
  ControllerRenderProps,
  UseFormStateReturn,
  Path,
  FieldPath,
  UseControllerProps,
  FormProviderProps,
} from 'react-hook-form';

export type { z };
