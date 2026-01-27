import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
  days: number;
  size?: "sm" | "md" | "lg";
}

export function StreakCounter({ days, size = "md" }: StreakCounterProps) {
  const isMilestone = [7, 30, 100].includes(days);

  const sizeClasses = {
    sm: "text-sm gap-1",
    md: "text-base gap-1.5",
    lg: "text-lg gap-2",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center font-bold",
        sizeClasses[size],
        days > 0 ? "text-orange-500" : "text-muted-foreground",
        isMilestone && "animate-pulse"
      )}
    >
      <Flame className={cn(iconSizes[size], days > 0 && "fill-orange-500")} />
      <span>{days}</span>
      <span className="font-normal text-muted-foreground">
        {size !== "sm" && "day streak"}
      </span>
    </div>
  );
}
