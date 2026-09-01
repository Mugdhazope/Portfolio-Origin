"use client";

import { ArrowUpRight, FolderOpen, Network, Search } from "lucide-react";
import { useMemo, useState } from "react";

export type FinderEntry = {
  id: string;
  name: string;
  detail: string;
  group?: string;
  filter?: string;
  accent?: string;
  kind: "project" | "research" | "collaborator";
};

type FinderWindowProps = {
  eyebrow: string;
  title: string;
  description: string;
  entries: FinderEntry[];
  countLabel?: string;
  filters?: string[];
  onSelect: (entry: FinderEntry) => void;
};

export function FinderWindow({
  eyebrow,
  title,
  description,
  entries,
  countLabel,
  filters,
  onSelect,
}: FinderWindowProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const visibleEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesFilter = activeFilter === "ALL" || entry.filter === activeFilter;
      const searchable = `${entry.name} ${entry.detail} ${entry.group ?? ""} ${entry.filter ?? ""}`.toLowerCase();
      return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeFilter, entries, query]);

  return (
    <article className="finder-window">
      <div className="finder-intro">
        <div>
          <span className="document-eyebrow">{eyebrow}</span>
          <h3>{title}<span className="accent-dot">.</span></h3>
        </div>
        <span className="browser-count">{countLabel ?? `${String(entries.length).padStart(2, "0")} ITEMS`}</span>
      </div>
      <p className="finder-copy">{description}</p>
      {filters?.length ? (
        <div className="finder-tools">
          <label className="finder-search">
            <Search size={13} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects"
              aria-label="Search projects"
            />
          </label>
          <div className="finder-filters" aria-label="Filter projects">
            {["ALL", ...filters].map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? "is-active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <div className="finder-list">
        {visibleEntries.map((entry) => (
          <button
            className="finder-entry"
            type="button"
            key={entry.id}
            onClick={() => onSelect(entry)}
          >
            <span className="finder-entry-icon" style={{ "--entry-accent": entry.accent } as React.CSSProperties}>
              {entry.kind === "collaborator" ? <Network size={15} /> : entry.kind === "research" ? <Search size={15} /> : <FolderOpen size={15} />}
            </span>
            <span className="finder-entry-copy">
              {entry.group ? <small>{entry.group}</small> : null}
              <strong>{entry.name}</strong>
              <span>{entry.detail}</span>
            </span>
            <ArrowUpRight size={14} />
            <span className="sr-only">Open {entry.name}</span>
          </button>
        ))}
      </div>
      {!visibleEntries.length ? <p className="finder-empty">No matching projects.</p> : null}
    </article>
  );
}
