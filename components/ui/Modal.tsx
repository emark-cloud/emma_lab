"use client";

import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

/* Radix Dialog wrapper that matches the legacy .modal visual.
   Focus trap, Escape, backdrop-click, and ARIA are all handled by Radix. */

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  size = "md",
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const sizes: Record<typeof size, string> = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content
          className={clsx(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] bg-white rounded-2xl shadow-lg p-8 md:p-10 max-h-[92vh] overflow-y-auto",
            sizes[size],
          )}
        >
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-bg-soft text-ink hover:bg-surface hover:rotate-90 transition-all flex items-center justify-center"
            >
              <i className="fas fa-times text-sm" aria-hidden />
            </button>
          </Dialog.Close>
          <Dialog.Title className="font-display text-2xl md:text-3xl text-navy font-bold mb-2">
            {title}
          </Dialog.Title>
          {description && (
            <Dialog.Description className="text-ink-body mb-6">
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
