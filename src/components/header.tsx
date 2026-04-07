"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CodexLogo } from "./logos/codex";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "./theme-provider";

interface HeaderProps {
  activePage: "ambassadors" | "events";
  stats: string;
  view: "globe" | "grid";
  onViewChange: (view: "globe" | "grid") => void;
  hasFilters: boolean;
  onClearFilters: () => void;
}

function StarIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
    </svg>
  );
}

export function Header({ activePage, stats, view, onViewChange, hasFilters, onClearFilters }: HeaderProps) {
  const [stars, setStars] = useState<number | null>(null);
  const { resolved } = useTheme();

  useEffect(() => {
    fetch("https://api.github.com/repos/crafter-station/codex-globe")
      .then((r) => r.json())
      .then((d) => setStars(d.stargazers_count))
      .catch(() => {});
  }, []);

  return (
    <header className="flex items-center justify-between px-3 sm:px-5 py-2.5 shrink-0 border-b border-border">
      <div className="flex items-center gap-3 sm:gap-4">
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <CodexLogo
            variant="logo-color"
            mode={resolved}
            className="h-5 sm:h-6 w-auto"
          />
        </Link>

        <nav className="flex items-center bg-secondary rounded-lg p-0.5">
          <Link
            href="/"
            className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors ${
              activePage === "ambassadors"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Ambassadors
          </Link>
          <Link
            href="/events"
            className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors ${
              activePage === "events"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Events
          </Link>
        </nav>

        <p className="text-[10px] sm:text-xs text-muted-foreground font-mono hidden sm:block">
          {stats}
        </p>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <a
          href="https://github.com/crafter-station/codex-globe"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          {stars !== null && (
            <span className="flex items-center gap-0.5">
              <StarIcon />
              {stars}
            </span>
          )}
        </a>

        <ThemeToggle />

        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
        )}

        <div className="flex items-center bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => onViewChange("globe")}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors ${
              view === "globe"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="hidden sm:inline">Globe</span>
          </button>
          <button
            onClick={() => onViewChange("grid")}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-colors ${
              view === "grid"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>
    </header>
  );
}
