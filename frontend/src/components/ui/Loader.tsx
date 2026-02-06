import { HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const loaderVariants = cva('flex flex-col items-center gap-4', {
  variants: {
    size: {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
    },
  },
  defaultVariants: { size: 'md' },
});

interface LoaderProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof loaderVariants> {
  text?: string;
}

export function Loader({ size, text, className, ...props }: LoaderProps) {
  return (
    <div className={loaderVariants({ size, className })} {...props}>
      <div className="relative animate-spin">
        {/* Spinner circles with Tailwind animations */}
        <div className="absolute inset-0 border-4 border-t-primary-500 rounded-full animate-spin"></div>
        {/* More layers */}
      </div>
      {text && <span className="text-slate-400 animate-pulse">{text}</span>}
    </div>
  );
}
