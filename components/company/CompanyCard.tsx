import Link from "next/link";
import { Company } from "@/types";
import { COMPANY_STAGES } from "@/lib/constants";
import { Flame, Fuel, Users } from "lucide-react";

interface CompanyCardProps {
  company: Company;
}

function formatFuel(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }
  return `$${amount}`;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const stageConfig = COMPANY_STAGES[company.stage];

  return (
    <Link href={`/company/${company.slug}`}>
      <div className="bg-card/50 border border-border/50 rounded-xl p-4 hover:bg-card/80 hover:border-border/80 transition-all cursor-pointer h-full">
        {/* Header: name + stage badge */}
        <div className="flex items-center justify-between">
          <h3 className="text-foreground font-medium text-sm truncate">
            {company.name}
          </h3>
          <span
            className={`${stageConfig.color} ${stageConfig.bgColor} rounded-full px-2 py-0.5 text-xs shrink-0 ml-2`}
          >
            {stageConfig.label}
          </span>
        </div>

        {/* One-liner */}
        {company.one_liner && (
          <p className="text-muted-foreground text-sm line-clamp-1 mt-1">
            {company.one_liner}
          </p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1 font-mono-nums text-sm text-foreground">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            {company.execution_score}
          </span>
          <span className="flex items-center gap-1 font-mono-nums text-sm text-amber-400">
            <Fuel className="h-3.5 w-3.5" />
            {formatFuel(company.fuel_total)}
          </span>
          <span className="flex items-center gap-1 font-mono-nums text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            {company.follower_count || 0}
          </span>
        </div>

        {/* Activity indicator */}
        {(company.log_count ?? 0) > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 align-middle" />
            {company.log_count} logs this week
          </p>
        )}
      </div>
    </Link>
  );
}
