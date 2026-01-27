import Link from "next/link";
import { Company } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Flame } from "lucide-react";

interface LeaderboardProps {
  companies: Company[];
}

export function Leaderboard({ companies }: LeaderboardProps) {
  const sorted = [...companies].sort((a, b) => b.execution_score - a.execution_score).slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Top Executors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sorted.map((company, index) => (
            <Link
              key={company.id}
              href={`/company/${company.slug}`}
              className="flex items-center gap-3 hover:bg-muted/50 rounded-md p-1.5 -mx-1.5 transition-colors"
            >
              <span className="text-sm font-bold text-muted-foreground w-5 text-center">
                {index + 1}
              </span>
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                {company.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{company.name}</p>
                <p className="text-xs text-muted-foreground">{company.industry}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{company.execution_score}</p>
                {company.streak_days > 0 && (
                  <p className="text-xs text-orange-500 flex items-center gap-0.5 justify-end">
                    <Flame className="h-3 w-3" />
                    {company.streak_days}d
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
