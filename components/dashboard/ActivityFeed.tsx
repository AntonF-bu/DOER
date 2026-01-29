"use client";

import { Log, Profile, Company } from "@/types";
import { LOG_TYPES, LogType } from "@/lib/constants";
import { formatRelativeTime } from "@/lib/utils";
import { mockCompanies, mockProfiles } from "@/lib/mock-data";

interface ActivityFeedProps {
  logs: Log[];
}

function getLogActionText(type: LogType): string {
  switch (type) {
    case "shipped":
      return "shipped";
    case "experiment":
      return "started experiment";
    case "decision":
      return "made a decision";
    case "pivot":
      return "announced a pivot";
    case "failure":
      return "shared a lesson";
    default:
      return "logged";
  }
}

export function ActivityFeed({ logs }: ActivityFeedProps) {
  return (
    <div className="bg-card/50 border border-border/50 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-live" />
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          Live Activity
        </span>
      </div>

      {/* Activity list */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
        {logs.map((log) => {
          const logType = LOG_TYPES[log.type as LogType];
          const author = log.author || mockProfiles.find((p) => p.id === log.author_id);
          const company = log.company || mockCompanies.find((c) => c.id === log.company_id);
          const authorName = author?.full_name || "Unknown";
          const companyName = company?.name || "Unknown";
          const actionText = getLogActionText(log.type as LogType);

          return (
            <div key={log.id} className="flex items-start gap-3">
              {/* Colored dot */}
              <div
                className={`w-2 h-2 rounded-full mt-2 shrink-0 ${logType?.dotColor || "bg-muted-foreground"}`}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug">
                  <span className="text-foreground font-medium">{authorName}</span>{" "}
                  <span className="text-muted-foreground">
                    {actionText} &ldquo;{log.title}&rdquo;
                  </span>
                </p>
                <p className="text-xs text-muted-foreground/50 mt-0.5">
                  {companyName} &middot; {formatRelativeTime(log.created_at)}
                </p>
              </div>
            </div>
          );
        })}

        {logs.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No recent activity
          </p>
        )}
      </div>
    </div>
  );
}
