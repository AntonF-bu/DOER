import { TrendingUp, Users, FileText, Flame, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Metric {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
}

interface MetricsDisplayProps {
  metrics: Metric[];
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              {metric.icon}
              <span className="text-xs">{metric.label}</span>
            </div>
            <p className="text-2xl font-bold">{metric.value}</p>
            {metric.change && (
              <p className="text-xs text-emerald-600 mt-1">{metric.change}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
