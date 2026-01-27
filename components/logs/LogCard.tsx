"use client";

import Link from "next/link";
import { Log } from "@/types";
import { LOG_TYPES } from "@/lib/constants";
import { formatRelativeTime } from "@/lib/utils";
import { UserAvatar } from "@/components/shared/Avatar";
import { StatusBadge } from "@/components/shared/Badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Rocket, FlaskConical, Scale, RefreshCw, XCircle } from "lucide-react";

const typeIcons = {
  shipped: Rocket,
  experiment: FlaskConical,
  decision: Scale,
  pivot: RefreshCw,
  failure: XCircle,
};

interface LogCardProps {
  log: Log;
  showCompany?: boolean;
}

export function LogCard({ log, showCompany = false }: LogCardProps) {
  const Icon = typeIcons[log.type];
  const typeConfig = LOG_TYPES[log.type];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className={`rounded-full p-2 ${typeConfig.bgColor} shrink-0`}>
            <Icon className={`h-4 w-4 ${typeConfig.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <StatusBadge variant="logType" value={log.type} size="sm" />
              {showCompany && log.company && (
                <Link
                  href={`/company/${log.company.slug}`}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {log.company.name}
                </Link>
              )}
            </div>
            <h3 className="font-semibold text-base mb-2">{log.title}</h3>
            {log.content && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3 whitespace-pre-line">
                {log.content}
              </p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {log.author && (
                  <>
                    <UserAvatar
                      name={log.author.full_name || log.author.username}
                      src={log.author.avatar_url}
                      size="sm"
                    />
                    <span className="text-sm text-muted-foreground">
                      {log.author.full_name || log.author.username}
                    </span>
                  </>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(log.created_at)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="text-xs">{log.comment_count || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
