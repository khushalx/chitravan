import { CheckCircle2 } from "lucide-react";

type SuccessMessageProps = {
  message: string;
};

export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div
      role="status"
      className="rounded-lg border border-[#5F8F2F]/35 bg-[#5F8F2F]/12 px-4 py-3 text-sm font-semibold text-[#3B6D11]"
    >
      <span className="inline-flex items-center gap-2">
        <CheckCircle2 size={17} aria-hidden="true" />
        {message}
      </span>
    </div>
  );
}
