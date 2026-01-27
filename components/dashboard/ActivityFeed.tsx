import { Log } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/utils";
import { MessageSquare, UserPlus, Eye } from "lucide-react";

interface Activity {
  id: string;
  type: "comment" | "follow" | "view";
  message: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons = {
  comment: MessageSquare,
  follow: UserPlus,
  view: Eye,
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="rounded-full bg-muted p-1.5 mt-0.5">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          {activities.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent activity yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
