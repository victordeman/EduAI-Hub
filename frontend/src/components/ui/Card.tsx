import { forwardRef, HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'bg-[var(--color-surface)]/60 backdrop-blur-md border border-slate-700/50 rounded-xl transition-all',
  {
    variants: {
      hover: { true: 'hover:translate-y-[-4px] hover:border-primary-300/30 hover:shadow-2xl' },
      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: { padding: 'md' },
  }
);

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, hover, padding, children, ...props }, ref) => (
  <div ref={ref} className={cardVariants({ hover, padding, className })} {...props}>
    {children}
  </div>
));
