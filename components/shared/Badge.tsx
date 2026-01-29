import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  color?: string;
  bgColor?: string;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-0.5 text-xs",
};

export function StatusBadge({
  label,
  color,
  bgColor,
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        sizeClasses[size],
        color ?? "text-muted-foreground",
        bgColor ?? "bg-secondary"
      )}
    >
      {label}
    </span>
  );
}
