"use client";

import { Log } from "@/types";
import { LOG_TYPES } from "@/lib/constants";
import { LogCard } from "./LogCard";

interface LogTimelineProps {
  logs: Log[];
  showCompany?: boolean;
}

function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const logDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (logDate.getTime() === today.getTime()) return "Today";
  if (logDate.getTime() === yesterday.getTime()) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function groupLogsByDate(logs: Log[]): Map<string, Log[]> {
  const groups = new Map<string, Log[]>();

  for (const log of logs) {
    const label = getDateLabel(log.created_at);
    const existing = groups.get(label);
    if (existing) {
      existing.push(log);
    } else {
      groups.set(label, [log]);
    }
  }

  return groups;
}

export function LogTimeline({ logs, showCompany = false }: LogTimelineProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-sm">No logs to display.</p>
      </div>
    );
  }

  const grouped = groupLogsByDate(logs);

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border/50" />

      <div className="space-y-6">
        {Array.from(grouped.entries()).map(([dateLabel, dateLogs]) => (
          <div key={dateLabel}>
            {/* Date separator */}
            <div className="relative flex items-center gap-3 mb-4">
              <div className="w-[15px] flex justify-center relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-border" />
              </div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                {dateLabel}
              </span>
            </div>

            {/* Log entries for this date */}
            <div className="space-y-3">
              {dateLogs.map((log) => {
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
                      <LogCard log={log} showCompany={showCompany} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
