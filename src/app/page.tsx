"use client";

import { useMemo, useState } from "react";
import { Globe } from "@/components/globe";
import { ambassadors, continents, stats } from "@/data/ambassadors";
import type { Ambassador, Continent } from "@/data/ambassadors";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type GroupBy = "continent" | "country" | "timezone";

function AmbassadorCard({
  ambassador,
  isSelected,
  onClick,
  compact,
}: {
  ambassador: Ambassador;
  isSelected: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left border rounded-lg transition-all duration-200 w-full ${
        compact ? "px-2.5 py-2" : "px-3 py-2.5"
      } ${
        isSelected
          ? "border-emerald-500/50 bg-emerald-500/10"
          : "border-neutral-800 bg-neutral-950 hover:border-neutral-600 hover:bg-neutral-900"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`fi fi-${ambassador.country.toLowerCase()} fis rounded-sm shrink-0`}
          style={{ width: compact ? 16 : 18, height: compact ? 11 : 13 }}
        />
        <p
          className={`font-medium truncate ${compact ? "text-xs" : "text-sm"}`}
        >
          {ambassador.name}
        </p>
      </div>
      <p
        className={`text-neutral-500 truncate mt-0.5 ${
          compact ? "text-[10px] ml-[24px]" : "text-xs ml-[26px]"
        }`}
      >
        {ambassador.city}
      </p>
    </button>
  );
}

export default function Home() {
  const [view, setView] = useState<"globe" | "grid">("globe");
  const [selected, setSelected] = useState<Ambassador | null>(null);
  const [activeContinent, setActiveContinent] = useState<Continent | "all">(
    "all"
  );
  const [activeCountry, setActiveCountry] = useState<string | "all">("all");
  const [groupBy, setGroupBy] = useState<GroupBy>("continent");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = ambassadors;
    if (activeContinent !== "all") {
      result = result.filter((a) => a.continent === activeContinent);
    }
    if (activeCountry !== "all") {
      result = result.filter((a) => a.country === activeCountry);
    }
    return result;
  }, [activeContinent, activeCountry]);

  const countries = useMemo(() => {
    const base =
      activeContinent !== "all"
        ? ambassadors.filter((a) => a.continent === activeContinent)
        : ambassadors;
    return [...new Set(base.map((a) => a.country))].sort();
  }, [activeContinent]);

  const grouped = useMemo(() => {
    const map: Record<string, Ambassador[]> = {};
    for (const a of filtered) {
      const key =
        groupBy === "continent"
          ? a.continent
          : groupBy === "country"
            ? a.country
            : a.timezone;
      if (!map[key]) map[key] = [];
      map[key].push(a);
    }
    const entries = Object.entries(map);
    if (groupBy === "timezone") {
      entries.sort(([a], [b]) => {
        const parse = (tz: string) => {
          const m = tz.match(/UTC([+-]?\d+)?/);
          return m && m[1] ? parseInt(m[1]) : 0;
        };
        return parse(a) - parse(b);
      });
    } else {
      entries.sort(([, a], [, b]) => b.length - a.length);
    }
    return entries;
  }, [filtered, groupBy]);

  const clearFilters = () => {
    setActiveContinent("all");
    setActiveCountry("all");
  };

  const hasFilters = activeContinent !== "all" || activeCountry !== "all";

  const handleSelect = (a: Ambassador | null) => {
    setSelected(a);
    setDrawerOpen(false);
  };

  return (
    <main className="h-dvh flex flex-col overflow-hidden">
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0 border-b border-neutral-900">
        <div>
          <h1 className="text-base sm:text-lg font-semibold tracking-tight">
            Codex Ambassadors
          </h1>
          <p className="text-[10px] sm:text-xs text-neutral-500 font-mono">
            {filtered.length}
            {hasFilters ? ` / ${stats.ambassadorsWithCity}` : ""} mapped
            {" / "}
            {stats.countries} countries
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/crafter-station/codex-globe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-[10px] sm:text-xs text-neutral-500 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-neutral-900 rounded-lg p-0.5 sm:p-1">
            <button
              onClick={() => setView("globe")}
              className={`p-1.5 rounded-md transition-colors ${
                view === "globe"
                  ? "bg-neutral-700 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                view === "grid"
                  ? "bg-neutral-700 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className="flex items-center gap-2 px-3 sm:px-6 py-2 border-b border-neutral-900 shrink-0 overflow-x-auto"
        style={{
          maskImage:
            "linear-gradient(to right, black calc(100% - 20px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, black calc(100% - 20px), transparent)",
        }}
      >
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={() => {
              setActiveContinent("all");
              setActiveCountry("all");
            }}
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors ${
              activeContinent === "all"
                ? "bg-neutral-700 text-white"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            }`}
          >
            All
          </button>
          {continents.map((c) => {
            const count = ambassadors.filter((a) => a.continent === c).length;
            return (
              <button
                key={c}
                onClick={() => {
                  setActiveContinent(activeContinent === c ? "all" : c);
                  setActiveCountry("all");
                }}
                className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
                  activeContinent === c
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {c}{" "}
                <span className="text-neutral-600 hidden sm:inline">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-px h-4 bg-neutral-800 shrink-0 hidden sm:block" />

        <div
          className="hidden sm:flex items-center gap-1 overflow-x-auto"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
          }}
        >
          {countries.map((c) => {
            const count = (
              activeContinent !== "all"
                ? ambassadors.filter(
                    (a) => a.continent === activeContinent && a.country === c
                  )
                : ambassadors.filter((a) => a.country === c)
            ).length;
            return (
              <button
                key={c}
                onClick={() =>
                  setActiveCountry(activeCountry === c ? "all" : c)
                }
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  activeCountry === c
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <span
                  className={`fi fi-${c.toLowerCase()} fis rounded-sm`}
                  style={{ width: 14, height: 10 }}
                />
                {c}{" "}
                <span className="text-neutral-600">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {view === "globe" ? (
        <div className="flex-1 flex min-h-0 relative">
          <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-[min(65dvh,700px)] sm:max-w-[min(80vh,700px)] aspect-square">
              <Globe
                ambassadors={filtered}
                selected={selected}
                onSelectAmbassador={handleSelect}
              />
            </div>
          </div>

          <aside className="w-72 border-l border-neutral-900 overflow-y-auto shrink-0 hidden lg:flex flex-col">
            <div className="p-3 space-y-1 flex-1">
              {filtered.map((a) => (
                <AmbassadorCard
                  key={a.name}
                  ambassador={a}
                  isSelected={selected?.name === a.name}
                  onClick={() =>
                    handleSelect(selected?.name === a.name ? null : a)
                  }
                />
              ))}
            </div>
          </aside>

          <div className="lg:hidden absolute bottom-4 left-0 right-0 flex justify-center z-30">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <button className="px-4 py-2 bg-neutral-900/90 backdrop-blur-md border border-neutral-700 rounded-full text-xs font-medium text-neutral-200 shadow-lg active:scale-95 transition-transform">
                  {filtered.length} ambassadors
                  {selected && (
                    <span className="ml-1.5 text-emerald-400">
                      {selected.name.split(" ")[0]}
                    </span>
                  )}
                </button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[85dvh]">
                <DrawerHeader className="pb-2">
                  <DrawerTitle className="text-sm font-semibold">
                    {filtered.length} Ambassadors
                    {hasFilters && (
                      <span className="text-neutral-500 font-normal">
                        {" "}
                        (filtered)
                      </span>
                    )}
                  </DrawerTitle>
                </DrawerHeader>
                <div
                  className="overflow-y-auto px-4 pb-[env(safe-area-inset-bottom,24px)] space-y-1.5"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black calc(100% - 32px), transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black calc(100% - 32px), transparent)",
                  }}
                >
                  {filtered.map((a) => (
                    <AmbassadorCard
                      key={a.name}
                      ambassador={a}
                      isSelected={selected?.name === a.name}
                      compact
                      onClick={() =>
                        handleSelect(selected?.name === a.name ? null : a)
                      }
                    />
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 sm:px-6 py-2 sm:py-3 flex items-center gap-2 border-b border-neutral-900 sticky top-0 bg-black/80 backdrop-blur-sm z-10">
            <span className="text-[10px] sm:text-xs text-neutral-500">
              Group by
            </span>
            {(["continent", "country", "timezone"] as GroupBy[]).map((g) => (
              <button
                key={g}
                onClick={() => setGroupBy(g)}
                className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors capitalize ${
                  groupBy === g
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
            {grouped.map(([group, members]) => (
              <div key={group}>
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  {groupBy === "country" && (
                    <span
                      className={`fi fi-${group.toLowerCase()} fis rounded-sm`}
                      style={{ width: 20, height: 14 }}
                    />
                  )}
                  {groupBy === "timezone" && (
                    <span className="text-neutral-600 font-mono text-xs">
                      {group}
                    </span>
                  )}
                  <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-300">
                    {groupBy === "timezone" ? "" : group}
                  </h2>
                  <span className="text-[10px] sm:text-xs text-neutral-600 font-mono">
                    {members.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2">
                  {members.map((a) => (
                    <AmbassadorCard
                      key={a.name}
                      ambassador={a}
                      isSelected={selected?.name === a.name}
                      compact
                      onClick={() =>
                        handleSelect(selected?.name === a.name ? null : a)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
