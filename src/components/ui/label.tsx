import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: '',
        error: 'text-destructive',
        success: 'text-success',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  htmlFor?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, required = false, children, ...props }, ref) => {
    return (
      <label
        className={cn(
          'flex items-center gap-1',
          labelVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {children}
        {required && <span className="text-destructive">*</span>}
      </label>
    );
  }
);
Label.displayName = 'Label';

export { Label };

export function LabelWithHint({
  label,
  hint,
  required = false,
  htmlFor,
  className,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {hint && (
        <span className="text-xs text-muted-foreground">
          {hint}
        </span>
      )}
    </div>
  );
}
