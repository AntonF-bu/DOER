import { Log } from "@/types";
import { LOG_TYPES } from "@/lib/constants";
import { formatRelativeTime } from "@/lib/utils";

interface ContributionHistoryProps {
  logs: Log[];
}

export function ContributionHistory({ logs }: ContributionHistoryProps) {
  if (logs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No activity yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => {
        const typeConfig = LOG_TYPES[log.type];
        return (
          <div key={log.id} className="flex items-start gap-3 text-sm">
            <span
              className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${typeConfig.dotColor}`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-foreground truncate">{log.title}</p>
              <p className="text-xs text-muted-foreground">
                {formatRelativeTime(log.created_at)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
