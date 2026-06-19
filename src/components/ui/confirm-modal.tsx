"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ConfirmModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="fixed inset-0 z-[100] m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-surface p-0 shadow-xl backdrop:bg-teal-deep/40 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <h2
          className="mb-2 text-xl text-teal-deep"
          style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
        >
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  );
}
