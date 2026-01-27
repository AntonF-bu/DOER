import { Card, CardContent } from "@/components/ui/card";
import { Users, Eye, FileText, MessageSquare, TrendingUp, Flame } from "lucide-react";

interface StatsCardsProps {
  stats: {
    followers: number;
    profileViews: number;
    logCount: number;
    engagement: number;
    executionScore: number;
    streakDays: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    { label: "Followers", value: stats.followers, icon: Users, color: "text-blue-600" },
    { label: "Profile Views", value: stats.profileViews, icon: Eye, color: "text-purple-600" },
    { label: "Total Logs", value: stats.logCount, icon: FileText, color: "text-emerald-600" },
    { label: "Engagement", value: stats.engagement, icon: MessageSquare, color: "text-amber-600" },
    { label: "Exec Score", value: stats.executionScore, icon: TrendingUp, color: "text-primary" },
    { label: "Streak", value: `${stats.streakDays}d`, icon: Flame, color: "text-orange-500" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <card.icon className={`h-3.5 w-3.5 ${card.color}`} />
              <span className="text-xs text-muted-foreground">{card.label}</span>
            </div>
            <p className="text-xl font-bold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
