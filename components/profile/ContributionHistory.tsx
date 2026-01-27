import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";

export function ContributionHistory() {
  // Generate mock contribution data (GitHub-style grid)
  const weeks = 12;
  const days = 7;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <History className="h-4 w-4" />
          Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {Array.from({ length: weeks }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {Array.from({ length: days }).map((_, dayIdx) => {
                const level = Math.random();
                let bg = "bg-muted";
                if (level > 0.8) bg = "bg-emerald-500";
                else if (level > 0.6) bg = "bg-emerald-400";
                else if (level > 0.4) bg = "bg-emerald-300";
                else if (level > 0.2) bg = "bg-emerald-100";
                return (
                  <div
                    key={dayIdx}
                    className={`h-3 w-3 rounded-sm ${bg}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Activity over the last 12 weeks
        </p>
      </CardContent>
    </Card>
  );
}
