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

interface LogTypeSelectorProps {
  value: LogType;
  onChange: (type: LogType) => void;
}

export function LogTypeSelector({ value, onChange }: LogTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
      {(Object.keys(LOG_TYPES) as LogType[]).map((type) => {
        const config = LOG_TYPES[type];
        const Icon = typeIcons[type];
        const isActive = value === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
              isActive
                ? `${config.borderColor} ${config.bgColor} border-current ${config.color}`
                : "border-transparent bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
