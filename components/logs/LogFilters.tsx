"use client";

import { LOG_TYPES, LogType } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Rocket, FlaskConical, Scale, RefreshCw, XCircle } from "lucide-react";

const typeIcons = {
  shipped: Rocket,
  experiment: FlaskConical,
  decision: Scale,
  pivot: RefreshCw,
  failure: XCircle,
};

interface LogFiltersProps {
  activeFilter: LogType | "all";
  onFilterChange: (filter: LogType | "all") => void;
}

export function LogFilters({ activeFilter, onFilterChange }: LogFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onFilterChange("all")}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
          activeFilter === "all"
            ? "bg-foreground text-background"
            : "bg-muted text-muted-foreground hover:text-foreground"
        )}
      >
        All
      </button>
      {(Object.keys(LOG_TYPES) as LogType[]).map((type) => {
        const config = LOG_TYPES[type];
        const Icon = typeIcons[type];
        return (
          <button
            key={type}
            onClick={() => onFilterChange(type)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
              activeFilter === type
                ? `${config.bgColor} ${config.color} ${config.borderColor} border`
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-3 w-3" />
            {config.label}
          </button>
        );
      })}
    </div>
  );
}
