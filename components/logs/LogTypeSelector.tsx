"use client";

import { LOG_TYPES, LogType } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogTypeSelectorProps {
  selected: LogType;
  onSelect: (type: LogType) => void;
}

export function LogTypeSelector({ selected, onSelect }: LogTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(LOG_TYPES) as LogType[]).map((type) => {
        const config = LOG_TYPES[type];
        const isActive = selected === type;

        return (
          <button
            key={type}
            type="button"
            onClick={() => onSelect(type)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer",
              isActive
                ? `${config.bgColor} ${config.borderColor} ${config.color}`
                : "bg-secondary/30 border-transparent text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                isActive ? config.dotColor : "bg-muted-foreground/50"
              )}
            />
            {config.label}
          </button>
        );
      })}
    </div>
  );
}
