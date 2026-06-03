"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { SponsoredAd } from "@/components/sponsored-ad";
import { WorkshopCard } from "@/components/workshop-card";
import { WorkshopRegistrationModal } from "@/components/workshop-registration-modal";
import type { Workshop } from "@/lib/data";
import { getArtistBySlug, sponsoredAds, workshops } from "@/lib/data";

export function WorkshopsPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  const groups = useMemo(
    () => [
      { label: "Access", options: ["Free", "Ticketed"] },
      { label: "Format", options: ["Live", "Recorded"] },
      {
        label: "Art form",
        options: Array.from(new Set(workshops.map((workshop) => workshop.artForm))),
      },
      {
        label: "State/region",
        options: Array.from(new Set(workshops.map((workshop) => workshop.region))),
      },
    ],
    [],
  );

  const filtered = workshops.filter((workshop) => {
    const searchable = [
      workshop.title,
      workshop.artForm,
      workshop.region,
      workshop.description,
    ]
      .join(" ")
      .toLowerCase();
    const queryMatches = !query || searchable.includes(query.toLowerCase());
    const filtersMatch = filters.every(
      (filter) =>
        workshop.access === filter ||
        workshop.format === filter ||
        workshop.artForm === filter ||
        workshop.region === filter,
    );
    return queryMatches && filtersMatch;
  });

  function toggleFilter(filter: string) {
    setFilters((current) =>
      current.includes(filter)
        ? current.filter((item) => item !== filter)
        : [...current, filter],
    );
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
        <main className="grid gap-5">
          <FilterBar
            query={query}
            onQueryChange={setQuery}
            placeholder="Search workshops by art form, artist, or region"
            groups={groups}
            selected={filters}
            onToggle={toggleFilter}
            onClear={() => setFilters([])}
          />
          {filtered.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((workshop) => {
                const teacher = getArtistBySlug(workshop.teacherSlug);
                if (!teacher) return null;
                return (
                  <WorkshopCard
                    key={workshop.id}
                    workshop={workshop}
                    teacher={teacher}
                    onRegister={setSelectedWorkshop}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No workshops found"
              description="Try another art form, format, access type, or region."
            />
          )}
        </main>
        <aside className="grid content-start gap-4">
          <SponsoredAd ad={sponsoredAds[2]} compact />
        </aside>
      </div>
      <WorkshopRegistrationModal
        workshop={selectedWorkshop}
        open={Boolean(selectedWorkshop)}
        onClose={() => setSelectedWorkshop(null)}
      />
    </>
  );
}
