"use client";

import { LOG_TYPES, LogType } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function LogFilters({ activeFilter, onFilterChange }: LogFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {/* All filter */}
      <button
        onClick={() => onFilterChange("all")}
        className={cn(
          "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
          activeFilter === "all"
            ? "text-foreground bg-secondary"
            : "text-muted-foreground hover:text-foreground bg-transparent"
        )}
      >
        All
      </button>

      {/* Type filters */}
      {(Object.keys(LOG_TYPES) as LogType[]).map((type) => {
        const config = LOG_TYPES[type];
        const isActive = activeFilter === type;

        return (
          <button
            key={type}
            onClick={() => onFilterChange(type)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
              isActive
                ? `${config.color} ${config.bgColor}`
                : "text-muted-foreground hover:text-foreground bg-transparent"
            )}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
}
