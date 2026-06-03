"use client";

import { useMemo, useState, useTransition } from "react";
import { ArtistCard } from "@/components/artist-card";
import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { LoadingGrid } from "@/components/loading-grid";
import type { Artist } from "@/lib/data";

type ArtistExplorerProps = {
  artists: Artist[];
};

const filterGroups = {
  state: ["Bihar", "Maharashtra", "Madhya Pradesh", "Odisha", "Tamil Nadu", "Andhra Pradesh", "Punjab", "Rajasthan"],
  style: ["Madhubani", "Warli", "Gond", "Pattachitra", "Tanjore", "Kalamkari", "Phulkari", "Block Printing"],
  category: ["Traditional", "Digital", "Handmade", "Painting", "Textile", "Sculpture"],
  status: ["Verified artists", "New artists"],
} satisfies Record<string, string[]>;

export function ArtistExplorer({ artists }: ArtistExplorerProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const filteredArtists = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return artists.filter((artist) => {
      const searchable = [
        artist.name,
        artist.state,
        artist.city,
        artist.region,
        ...artist.styles,
        ...artist.mediums,
      ]
        .join(" ")
        .toLowerCase();

      const queryMatches =
        !normalizedQuery || searchable.includes(normalizedQuery);

      const filtersMatch = filters.every((filter) => {
        if (filter === "Verified artists") return artist.verified;
        if (filter === "New artists") return !artist.verified;
        return (
          artist.state === filter ||
          artist.styles.includes(filter) ||
          artist.mediums.includes(filter)
        );
      });

      return queryMatches && filtersMatch;
    });
  }, [artists, filters, query]);

  function toggleFilter(filter: string) {
    startTransition(() => {
      setFilters((current) =>
        current.includes(filter)
          ? current.filter((item) => item !== filter)
          : [...current, filter],
      );
    });
  }

  return (
    <div className="grid gap-8">
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Search by artist name, state, style, or medium"
        groups={Object.entries(filterGroups).map(([label, options]) => ({
          label,
          options,
        }))}
        selected={filters}
        onToggle={toggleFilter}
        onClear={() => setFilters([])}
      />

      {isPending ? (
        <LoadingGrid />
      ) : filteredArtists.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No artists found yet"
          description="Try a broader state, style, or category. Chitravan is designed for new regional artists to keep joining over time."
        />
      )}
    </div>
  );
}
