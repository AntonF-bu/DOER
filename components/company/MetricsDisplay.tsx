import { Company } from "@/types";
import { TrendingUp, Flame, FileText, Users, Fuel } from "lucide-react";

interface MetricsDisplayProps {
  company: Company;
}

export function MetricsDisplay({ company }: MetricsDisplayProps) {
  const metrics = [
    {
      label: "Velocity",
      value: company.execution_score,
      icon: <TrendingUp className="h-3.5 w-3.5 text-primary" />,
    },
    {
      label: "Streak",
      value: `${company.streak_days}d`,
      icon: <Flame className="h-3.5 w-3.5 text-orange-400" />,
    },
    {
      label: "Logs",
      value: company.log_count ?? 0,
      icon: <FileText className="h-3.5 w-3.5 text-muted-foreground" />,
    },
    {
      label: "Followers",
      value: company.follower_count ?? 0,
      icon: <Users className="h-3.5 w-3.5 text-muted-foreground" />,
    },
    {
      label: "Fuel",
      value: `$${company.fuel_total.toLocaleString()}`,
      icon: <Fuel className="h-3.5 w-3.5 text-amber-400" />,
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-secondary/30 rounded-lg p-3 min-w-[100px]">
          <div className="flex items-center gap-1.5 mb-1">
            {metric.icon}
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {metric.label}
            </span>
          </div>
          <span className="font-mono-nums text-xl text-foreground">
            {metric.value}
          </span>
        </div>
      ))}
    </div>
  );
}
