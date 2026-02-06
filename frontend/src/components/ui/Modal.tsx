'use client';

import { useEffect, forwardRef, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title: string;
  onClose: () => void;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({ open, title, onClose, children }, ref) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div ref={ref} className="bg-[var(--color-surface)] border border-slate-700/20 rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">×</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
});
