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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {badges.map((ub) => {
        const IconComponent = ub.badge?.icon
          ? badgeIcons[ub.badge.icon] || Award
          : Award;
        return (
          <div
            key={ub.id}
            className="bg-secondary/30 rounded-lg p-3"
          >
            <IconComponent className="h-5 w-5 text-amber-400 mb-2" />
            <p className="text-sm text-foreground font-medium">
              {ub.badge?.name}
            </p>
            {ub.badge?.description && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {ub.badge.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
