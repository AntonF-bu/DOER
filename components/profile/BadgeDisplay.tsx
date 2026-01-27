import { UserBadge } from "@/types";
import { Award, Rocket, Flame, Eye, RefreshCw } from "lucide-react";

const badgeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket,
  flame: Flame,
  eye: Eye,
  refresh: RefreshCw,
};

interface BadgeDisplayProps {
  badges: UserBadge[];
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((ub) => {
        const IconComponent = ub.badge?.icon
          ? badgeIcons[ub.badge.icon] || Award
          : Award;
        return (
          <div
            key={ub.id}
            className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5"
            title={ub.badge?.description || ""}
          >
            <IconComponent className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">
              {ub.badge?.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
