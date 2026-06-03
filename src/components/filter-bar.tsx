"use client";

import { Search, X } from "lucide-react";

type FilterGroup = {
  label: string;
  options: string[];
};

type FilterBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
  groups: FilterGroup[];
  selected: string[];
  onToggle: (option: string) => void;
  onClear: () => void;
};

export function FilterBar({
  query,
  onQueryChange,
  placeholder,
  groups,
  selected,
  onToggle,
  onClear,
}: FilterBarProps) {
  return (
    <div className="rounded-xl border border-[#CFC8BA]/85 bg-[#FAF8F4] p-4">
      <label className="flex min-h-12 items-center gap-2 rounded-lg border border-[#CFC8BA] bg-[#FAF7F2] px-3">
        <Search size={18} className="text-[#6F6A60]" aria-hidden="true" />
        <span className="sr-only">{placeholder}</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-base outline-none placeholder:text-[#6F6A60]"
        />
      </label>
      <div className="mt-5 grid gap-5">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold uppercase text-[#6F6A60]">
              {group.label}
            </p>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
              {group.options.map((option) => {
                const active = selected.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => onToggle(option)}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-[#3B6D11] bg-[#3B6D11] text-white"
                        : "border-[#CFC8BA] bg-[#FAF7F2] text-[#3B6D11] hover:border-[#5F8F2F]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {selected.length ? (
        <button
          onClick={onClear}
          className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-[#CFC8BA] px-4 text-sm font-semibold text-[#6F6A60] hover:bg-[#FAF7F2]"
        >
          <X size={15} aria-hidden="true" />
          Clear filters
        </button>
      ) : null}
    </div>
  );
}
