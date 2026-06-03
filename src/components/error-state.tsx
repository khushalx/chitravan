type ErrorStateProps = {
  title: string;
  description: string;
};

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-8">
      <p className="text-sm font-semibold uppercase text-[#E76F51]">
        Needs attention
      </p>
      <h1 className="mt-3 font-display text-5xl text-[#3B6D11]">{title}</h1>
      <p className="mt-4 max-w-2xl leading-8 text-[#6F6A60]">{description}</p>
    </div>
  );
}
