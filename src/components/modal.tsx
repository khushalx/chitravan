"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

export function Modal({
  open,
  title,
  description,
  children,
  onClose,
  className,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#24231F]/45 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5 shadow-xl",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="font-display text-3xl text-[#3B6D11]">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 leading-7 text-[#6F6A60]">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-[#CFC8BA] text-[#6F6A60] hover:bg-[#FAF7F2] hover:text-[#3B6D11]"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
