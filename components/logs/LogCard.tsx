"use client";

import Link from "next/link";
import { Log } from "@/types";
import { LOG_TYPES } from "@/lib/constants";
import { MessageSquare } from "lucide-react";

interface LogCardProps {
  log: Log;
  showCompany?: boolean;
}

function formatTimeAgo(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export function LogCard({ log, showCompany = false }: LogCardProps) {
  const typeConfig = LOG_TYPES[log.type];
  const companySlug = log.company?.slug ?? "unknown";

  return (
    <Link href={`/company/${companySlug}`}>
      <div className="bg-card/50 border border-border/50 rounded-xl p-4 hover:bg-card/80 hover:border-border transition-all cursor-pointer">
        {/* Top row: dot, type label, log number, time ago */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${typeConfig.dotColor}`}
            />
            <span className={`${typeConfig.color} text-xs font-medium`}>
              {typeConfig.label}
            </span>
            <span className="font-mono-nums text-xs text-muted-foreground">
              #{log.log_number}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTimeAgo(log.created_at)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-foreground font-medium text-sm mt-2">
          {log.title}
        </h3>

        {/* Content preview */}
        {log.content && (
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
            {log.content}
          </p>
        )}

        {/* Bottom: author, company, comments */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {log.author && (
              <span>{log.author.full_name || log.author.username}</span>
            )}
            {showCompany && log.company && (
              <>
                <span className="text-border">·</span>
                <span>{log.company.name}</span>
              </>
            )}
          </div>
          {(log.comment_count ?? 0) > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="font-mono-nums text-xs">
                {log.comment_count}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
