'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white',
        secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
        outline: 'bg-transparent border-slate-400 hover:border-primary-500 text-slate-300 hover:text-primary-400',
        ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, loading, children, ...props }, ref) => (
  <button ref={ref} className={buttonVariants({ variant, size, className })} disabled={loading || props.disabled} {...props}>
    {loading ? <span className="loader animate-spin border-2 border-t-transparent rounded-full w-4 h-4" /> : children}
  </button>
));
