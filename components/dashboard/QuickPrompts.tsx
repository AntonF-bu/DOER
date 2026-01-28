"use client";

import Link from "next/link";
import { LOG_TYPES, LogType } from "@/lib/constants";
import { Rocket, FlaskConical, Scale, RefreshCw, XCircle } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  FlaskConical,
  Scale,
  RefreshCw,
  XCircle,
};

const logTypeKeys: LogType[] = ["shipped", "experiment", "decision", "pivot", "failure"];

export function QuickPrompts() {
  return (
    <div className="bg-card/50 border border-border/50 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          Quick Log
        </span>
      </div>

      {/* Log type buttons */}
      <div className="flex flex-wrap gap-2">
        {logTypeKeys.map((type) => {
          const config = LOG_TYPES[type];
          const Icon = iconMap[config.icon];

          return (
            <Link
              key={type}
              href={`/log?type=${type}`}
              className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border transition-all duration-150 hover:scale-[1.02] hover:brightness-125 ${config.bgColor} ${config.color} ${config.borderColor}`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {config.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
