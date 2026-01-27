"use client";

import { useState } from "react";
import { Log } from "@/types";
import { LogCard } from "./LogCard";
import { LogFilters } from "./LogFilters";
import { EmptyState } from "@/components/shared/EmptyState";
import { FileText } from "lucide-react";
import { LogType } from "@/lib/constants";

interface LogTimelineProps {
  logs: Log[];
  showCompany?: boolean;
}

export function LogTimeline({ logs, showCompany = false }: LogTimelineProps) {
  const [filter, setFilter] = useState<LogType | "all">("all");

  const filteredLogs = filter === "all" ? logs : logs.filter((log) => log.type === filter);

  if (logs.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No logs yet"
        description="Start documenting your journey by creating your first log."
      />
    );
  }

  return (
    <div className="space-y-4">
      <LogFilters activeFilter={filter} onFilterChange={setFilter} />
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <LogCard key={log.id} log={log} showCompany={showCompany} />
        ))}
      </div>
      {filteredLogs.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">
          No logs match this filter.
        </p>
      )}
    </div>
  );
}
