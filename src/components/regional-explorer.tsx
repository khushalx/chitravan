"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { TraditionCard } from "@/components/tradition-card";
import type { RegionalArtForm } from "@/lib/data";

type RegionalExplorerProps = {
  traditions: RegionalArtForm[];
};

export function RegionalExplorer({ traditions }: RegionalExplorerProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  const groups = useMemo(() => {
    const states = Array.from(new Set(traditions.map((item) => item.state)));
    const mediums = Array.from(new Set(traditions.map((item) => item.medium)));
    return [
      { label: "State", options: states },
      { label: "Medium", options: mediums },
      { label: "Tradition type", options: ["Painting", "Textile", "Ceramic", "Digital"] },
    ];
  }, [traditions]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return traditions.filter((item) => {
      const searchable = [item.name, item.state, item.medium, item.context]
        .join(" ")
        .toLowerCase();
      const queryMatches =
        !normalizedQuery || searchable.includes(normalizedQuery);
      const filtersMatch = filters.every((filter) => {
        if (filter === "Digital") return item.medium.toLowerCase().includes("digital");
        return (
          item.state === filter ||
          item.medium.includes(filter) ||
          item.name === filter
        );
      });

      return queryMatches && filtersMatch;
    });
  }, [filters, query, traditions]);

  function toggleFilter(filter: string) {
    setFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  }

  return (
    <div className="grid gap-7">
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Search by tradition, state, medium, or community"
        groups={groups}
        selected={filters}
        onToggle={toggleFilter}
        onClear={() => setFilters([])}
      />
      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((tradition) => (
            <TraditionCard key={tradition.slug} tradition={tradition} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No traditions found yet"
          description="Try a different state, medium, or tradition type to continue exploring Indian art forms."
        />
      )}
    </div>
  );
}
