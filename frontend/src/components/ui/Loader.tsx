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
  const spinnerSize = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[size || 'md'];

  return (
    <div className={loaderVariants({ size, className })} {...props}>
      <div className={`relative ${spinnerSize}`}>
        <div className="absolute inset-0 border-4 border-t-primary-500 rounded-full animate-spin"></div>
        <div className="absolute inset-[10%] border-4 border-t-secondary-500 rounded-full animate-spin [animation-duration:1.5s]"></div>
        <div className="absolute inset-[20%] border-4 border-t-purple-500 rounded-full animate-spin [animation-duration:2s]"></div>
      </div>
      {text && <span className="text-slate-400 animate-pulse">{text}</span>}
    </div>
  );
}
