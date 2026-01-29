"use client";

import { INDUSTRIES } from "@/lib/constants";

interface FilterBarProps {
  industry: string;
  sort: string;
  onIndustryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const SORT_OPTIONS = [
  { key: "execution_score", label: "Most Active" },
  { key: "velocity", label: "Highest Velocity" },
  { key: "fuel", label: "Most Fuel" },
  { key: "recent", label: "Newest" },
];

export function FilterBar({
  industry,
  sort,
  onIndustryChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      {/* Industry pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onIndustryChange("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            industry === "all"
              ? "bg-primary/10 text-primary border-primary/30"
              : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary"
          }`}
        >
          All
        </button>
        {INDUSTRIES.map((ind) => (
          <button
            key={ind}
            onClick={() => onIndustryChange(ind)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              industry === ind
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Sort options */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Sort:</span>
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.key}
            onClick={() => onSortChange(option.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              sort === option.key
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
