"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface VelocityMeterProps {
  velocity: number;
  percentile?: number;
  weeklyChange?: number;
}

export function VelocityMeter({ velocity, percentile, weeklyChange }: VelocityMeterProps) {
  return (
    <div className="bg-card/50 border border-border/50 rounded-xl p-6 gradient-border-subtle">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          Velocity
        </span>
      </div>

      {/* Large velocity number */}
      <div className="mb-4">
        <span className="text-5xl font-mono-nums text-foreground text-glow">
          {velocity}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-2 rounded-full bg-secondary w-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-out"
            style={{ width: `${Math.min(velocity, 100)}%` }}
          />
        </div>
        <div className="flex justify-end mt-1.5">
          <span className="text-xs font-mono-nums text-muted-foreground">
            {velocity}/100
          </span>
        </div>
      </div>

      {/* Percentile and weekly change */}
      <div className="space-y-1">
        {percentile !== undefined && (
          <p className="text-sm text-muted-foreground">
            Top {percentile}% of builders
          </p>
        )}
        {weeklyChange !== undefined && weeklyChange !== 0 && (
          <div className="flex items-center gap-1">
            {weeklyChange > 0 ? (
              <>
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-sm text-emerald-400">
                  +{weeklyChange} this week
                </span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                <span className="text-sm text-red-400">
                  {weeklyChange} this week
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
