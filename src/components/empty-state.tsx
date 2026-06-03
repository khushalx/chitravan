type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-8 text-left">
      <h2 className="font-display text-3xl text-[#3B6D11]">{title}</h2>
      <p className="mt-3 max-w-xl leading-7 text-[#6F6A60]">{description}</p>
    </div>
  );
}
