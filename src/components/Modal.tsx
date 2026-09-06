import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-tan-200 bg-cream-50 p-6 sm:p-8 text-ink-900 shadow-2xl backdrop:bg-ink-900/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <h2 id={titleId} className="font-display text-2xl font-bold">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="p-1 rounded-full hover:bg-tan-100"
        >
          <X size={22} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
