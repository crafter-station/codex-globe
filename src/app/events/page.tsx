"use client";

import { useMemo, useState } from "react";
import { EventsGlobe } from "@/components/events-globe";
import { events, eventStats } from "@/data/events";
import type { CodexEvent, EventType } from "@/data/events";
import type { Continent } from "@/data/ambassadors";
import { Header } from "@/components/header";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const continents: Continent[] = [
  "North America",
  "South America",
  "Europe",
  "Asia",
  "Oceania",
];

function EventCard({
  event,
  isSelected,
  onClick,
  compact,
}: {
  event: CodexEvent;
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
          ? event.type === "hackathon"
            ? "border-fuchsia-500/50 bg-fuchsia-500/10"
            : "border-blue-500/50 bg-blue-500/10"
          : "border-border bg-card hover:border-ring hover:bg-accent"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`fi fi-${event.country.toLowerCase()} fis rounded-sm shrink-0`}
          style={{ width: compact ? 16 : 18, height: compact ? 11 : 13 }}
        />
        <p
          className={`font-medium truncate ${compact ? "text-xs" : "text-sm"}`}
        >
          {event.city}
        </p>
        <span
          className={`shrink-0 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase tracking-wider ${
            event.type === "hackathon"
              ? "bg-fuchsia-500/15 text-fuchsia-400"
              : "bg-blue-500/15 text-blue-400"
          }`}
        >
          {event.type === "hackathon" ? "Hack" : "Meet"}
        </span>
      </div>
      <p
        className={`text-muted-foreground truncate mt-0.5 ${
          compact ? "text-[10px] ml-[24px]" : "text-xs ml-[26px]"
        }`}
      >
        {event.name}
      </p>
      <div
        className={`flex items-center gap-2 mt-0.5 ${
          compact ? "ml-[24px]" : "ml-[26px]"
        }`}
      >
        <span
          className={`text-muted-foreground/70 ${
            compact ? "text-[9px]" : "text-[10px]"
          } font-mono`}
        >
          {event.date}
        </span>
        <span
          className={`text-muted-foreground/50 ${
            compact ? "text-[9px]" : "text-[10px]"
          }`}
        >
          {event.organizer}
        </span>
      </div>
    </button>
  );
}

export default function EventsPage() {
  const [view, setView] = useState<"globe" | "grid">("globe");
  const [selected, setSelected] = useState<CodexEvent | null>(null);
  const [activeContinent, setActiveContinent] = useState<Continent | "all">(
    "all"
  );
  const [activeType, setActiveType] = useState<EventType | "all">("all");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = events;
    if (activeContinent !== "all") {
      result = result.filter((e) => e.continent === activeContinent);
    }
    if (activeType !== "all") {
      result = result.filter((e) => e.type === activeType);
    }
    return result;
  }, [activeContinent, activeType]);

  const hasFilters = activeContinent !== "all" || activeType !== "all";

  const handleEventSelect = (event: CodexEvent | null) => {
    setSelected(event);
    setDrawerOpen(false);
  };

  const clearFilters = () => {
    setActiveContinent("all");
    setActiveType("all");
  };

  const grouped = useMemo(() => {
    const byDate: Record<string, CodexEvent[]> = {};
    for (const e of filtered) {
      if (!byDate[e.date]) byDate[e.date] = [];
      byDate[e.date].push(e);
    }
    return Object.entries(byDate);
  }, [filtered]);

  return (
    <main className="h-dvh flex flex-col overflow-hidden">
      <Header
        activePage="events"
        stats={`${filtered.length}${hasFilters ? ` / ${eventStats.total}` : ""} events / ${eventStats.countries} countries`}
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
            const count = events.filter((e) => e.continent === c).length;
            if (count === 0) return null;
            return (
              <button
                key={c}
                onClick={() => {
                  setActiveContinent(activeContinent === c ? "all" : c);
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

        <div className="w-px h-4 bg-border shrink-0" />

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={() => setActiveType("all")}
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors ${
              activeType === "all"
                ? "bg-accent-foreground/10 text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            All Types
          </button>
          <button
            onClick={() =>
              setActiveType(activeType === "meetup" ? "all" : "meetup")
            }
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors flex items-center gap-1 ${
              activeType === "meetup"
                ? "bg-blue-500/15 text-blue-400"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Meetups{" "}
            <span className="text-muted-foreground/50">
              {eventStats.meetups}
            </span>
          </button>
          <button
            onClick={() =>
              setActiveType(activeType === "hackathon" ? "all" : "hackathon")
            }
            className={`px-2 sm:px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors flex items-center gap-1 ${
              activeType === "hackathon"
                ? "bg-fuchsia-500/15 text-fuchsia-400"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
            Hackathons{" "}
            <span className="text-muted-foreground/50">
              {eventStats.hackathons}
            </span>
          </button>
        </div>
      </div>

      {view === "globe" ? (
        <div className="flex-1 flex min-h-0 relative">
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <EventsGlobe
              events={filtered}
              selected={selected}
              onSelect={handleEventSelect}
            />
          </div>

          <aside className="w-72 border-l border-border overflow-y-auto shrink-0 hidden lg:flex flex-col">
            <div className="p-3 space-y-1 flex-1">
              {filtered.map((e, i) => (
                <EventCard
                  key={`${e.city}-${e.date}-${i}`}
                  event={e}
                  isSelected={selected === e}
                  onClick={() =>
                    handleEventSelect(selected === e ? null : e)
                  }
                />
              ))}
            </div>
          </aside>

          <div className="lg:hidden absolute bottom-4 left-0 right-0 flex justify-center z-30">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <button className="px-4 py-2 bg-popover/90 backdrop-blur-md border border-border rounded-full text-xs font-medium text-foreground shadow-lg active:scale-95 transition-transform">
                  {filtered.length} events
                  {selected && (
                    <span className="ml-1.5 text-emerald-500">
                      {selected.city}
                    </span>
                  )}
                </button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[85dvh]">
                <DrawerHeader className="pb-2">
                  <DrawerTitle className="text-sm font-semibold">
                    {filtered.length} Events
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
                  {filtered.map((e, i) => (
                    <EventCard
                      key={`${e.city}-${e.date}-${i}`}
                      event={e}
                      isSelected={selected === e}
                      compact
                      onClick={() =>
                        handleEventSelect(selected === e ? null : e)
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
          <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
            {grouped.map(([date, dateEvents]) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-muted-foreground/50 font-mono text-xs">
                    {date}
                  </span>
                  <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {dateEvents.length} event{dateEvents.length > 1 ? "s" : ""}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2">
                  {dateEvents.map((e, i) => (
                    <EventCard
                      key={`${e.city}-${e.date}-${i}`}
                      event={e}
                      isSelected={selected === e}
                      compact
                      onClick={() =>
                        handleEventSelect(selected === e ? null : e)
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
