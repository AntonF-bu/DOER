"use client";

import { useState } from "react";
import { Log } from "@/types";
import { LOG_TYPES } from "@/lib/constants";
import { LogCard } from "@/components/logs/LogCard";

interface CompanyTimelineProps {
  logs: Log[];
}

type FilterType = "all" | "shipped" | "experiment" | "decision" | "pivot" | "failure";

const FILTER_TABS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "shipped", label: "Ship" },
  { key: "experiment", label: "Exp" },
  { key: "decision", label: "Dec" },
  { key: "pivot", label: "Piv" },
  { key: "failure", label: "Fail" },
];

export function CompanyTimeline({ logs }: CompanyTimelineProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredLogs = filter === "all"
    ? logs
    : logs.filter((log) => log.type === filter);

  // Sort newest first
  const sortedLogs = [...filteredLogs].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div>
      {/* Section header */}
      <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-4">
        Timeline
      </h2>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {FILTER_TABS.map((tab) => {
          const isActive = filter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isActive
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Timeline entries */}
      {sortedLogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">No logs to display.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Thin vertical connecting line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border/50" />

          <div className="space-y-3">
            {sortedLogs.map((log) => {
              const typeConfig = LOG_TYPES[log.type];
              return (
                <div key={log.id} className="relative flex gap-3">
                  {/* Timeline dot */}
                  <div className="w-[15px] flex justify-center shrink-0 pt-5 relative z-10">
                    <div
                      className={`w-2 h-2 rounded-full ${typeConfig.dotColor}`}
                    />
                  </div>
                  {/* Log card */}
                  <div className="flex-1 min-w-0">
                    <LogCard log={log} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
