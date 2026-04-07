"use client";

import { useMemo, useState } from "react";
import { Globe } from "@/components/globe";
import { ambassadors, continents, stats } from "@/data/ambassadors";
import type { Ambassador, Continent } from "@/data/ambassadors";
import { Header } from "@/components/header";
import { GithubLogo } from "@/components/logos/github";
import { TwitterLogo } from "@/components/logos/twitter";
import { LinkedinLogo } from "@/components/logos/linkedin";
import { ThreadsLogo } from "@/components/logos/threads";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type GroupBy = "continent" | "country" | "timezone";

function SocialLinks({ ambassador, compact }: { ambassador: Ambassador; compact?: boolean }) {
  const hasSocials = ambassador.github || ambassador.twitter || ambassador.linkedin || ambassador.website || ambassador.threads;
  if (!hasSocials) return null;

  const iconSize = compact ? "w-3 h-3" : "w-3.5 h-3.5";

  return (
    <div className={`flex items-center gap-1.5 ${compact ? "ml-[24px] mt-0.5" : "ml-[26px] mt-1"}`}>
      {ambassador.github && (
        <a
          href={`https://github.com/${ambassador.github}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground/50 hover:text-foreground transition-colors"
          aria-label={`${ambassador.name} on GitHub`}
        >
          <GithubLogo className={iconSize} />
        </a>
      )}
      {ambassador.twitter && (
        <a
          href={`https://x.com/${ambassador.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground/50 hover:text-foreground transition-colors"
          aria-label={`${ambassador.name} on X`}
        >
          <TwitterLogo className={iconSize} />
        </a>
      )}
      {ambassador.linkedin && (
        <a
          href={ambassador.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground/50 hover:text-foreground transition-colors"
          aria-label={`${ambassador.name} on LinkedIn`}
        >
          <LinkedinLogo className={iconSize} colorScheme="grayscale" />
        </a>
      )}
      {ambassador.threads && (
        <a
          href={`https://www.threads.net/@${ambassador.threads}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground/50 hover:text-foreground transition-colors"
          aria-label={`${ambassador.name} on Threads`}
        >
          <ThreadsLogo className={iconSize} />
        </a>
      )}
      {ambassador.website && (
        <a
          href={ambassador.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground/50 hover:text-foreground transition-colors"
          aria-label={`${ambassador.name}'s website`}
        >
          <svg className={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </a>
      )}
    </div>
  );
}

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
          : "border-border bg-card hover:border-ring hover:bg-accent"
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
        className={`text-muted-foreground truncate mt-0.5 ${
          compact ? "text-[10px] ml-[24px]" : "text-xs ml-[26px]"
        }`}
      >
        {ambassador.city}
      </p>
      <SocialLinks ambassador={ambassador} compact={compact} />
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
      <Header
        activePage="ambassadors"
        stats={`${filtered.length}${hasFilters ? ` / ${stats.ambassadorsWithCity}` : ""} mapped / ${stats.countries} countries`}
        view={view}
        onViewChange={setView}
        hasFilters={hasFilters}
        onClearFilters={clearFilters}
      />

      <div
        className="flex items-center gap-2 px-3 sm:px-6 py-2 border-b border-border shrink-0 overflow-x-auto"
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
                ? "bg-accent-foreground/10 text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
                    ? "bg-accent-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {c}{" "}
                <span className="text-muted-foreground/50 hidden sm:inline">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-px h-4 bg-border shrink-0 hidden sm:block" />

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
                    ? "bg-accent-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <span
                  className={`fi fi-${c.toLowerCase()} fis rounded-sm`}
                  style={{ width: 14, height: 10 }}
                />
                {c}{" "}
                <span className="text-muted-foreground/50">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {view === "globe" ? (
        <div className="flex-1 flex min-h-0 relative">
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <Globe
              ambassadors={filtered}
              selected={selected}
              onSelectAmbassador={handleSelect}
            />
          </div>

          <aside className="w-72 border-l border-border overflow-y-auto shrink-0 hidden lg:flex flex-col">
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
                <button className="px-4 py-2 bg-popover/90 backdrop-blur-md border border-border rounded-full text-xs font-medium text-foreground shadow-lg active:scale-95 transition-transform">
                  {filtered.length} ambassadors
                  {selected && (
                    <span className="ml-1.5 text-emerald-500">
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
                      <span className="text-muted-foreground font-normal">
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
          <div className="px-3 sm:px-6 py-2 sm:py-3 flex items-center gap-2 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              Group by
            </span>
            {(["continent", "country", "timezone"] as GroupBy[]).map((g) => (
              <button
                key={g}
                onClick={() => setGroupBy(g)}
                className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors capitalize ${
                  groupBy === g
                    ? "bg-accent-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
                    <span className="text-muted-foreground/50 font-mono text-xs">
                      {group}
                    </span>
                  )}
                  <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {groupBy === "timezone" ? "" : group}
                  </h2>
                  <span className="text-[10px] sm:text-xs text-muted-foreground/50 font-mono">
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
