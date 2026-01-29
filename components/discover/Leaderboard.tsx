import Link from "next/link";
import { mockCompanies } from "@/lib/mock-data";

export function Leaderboard() {
  const sorted = [...mockCompanies]
    .sort((a, b) => b.execution_score - a.execution_score)
    .slice(0, 5);

  return (
    <div className="bg-card/50 border border-border/50 rounded-xl p-4">
      <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
        Velocity Leaders
      </h3>
      <div className="space-y-2">
        {sorted.map((company, index) => (
          <Link
            key={company.id}
            href={`/company/${company.slug}`}
            className="flex items-center gap-3 py-1.5 hover:bg-secondary/30 rounded-md px-1.5 -mx-1.5 transition-colors"
          >
            <span className="font-mono-nums text-muted-foreground text-sm w-5 text-center shrink-0">
              {index + 1}
            </span>
            <span className="text-sm text-foreground truncate flex-1">
              {company.name}
            </span>
            <span className="font-mono-nums text-sm text-primary shrink-0">
              {company.execution_score}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
