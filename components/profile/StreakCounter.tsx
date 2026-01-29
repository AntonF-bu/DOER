import { Flame } from "lucide-react";

interface StreakCounterProps {
  days: number;
}

export function StreakCounter({ days }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2">
      <Flame
        className={`h-5 w-5 ${days > 0 ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
      />
      <span className="font-mono-nums text-2xl font-bold text-amber-400">
        {days}
      </span>
      <span className="text-sm text-muted-foreground">day streak</span>
    </div>
  );
}
