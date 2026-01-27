import Link from "next/link";
import { Company } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/Badge";
import { FollowButton } from "@/components/shared/FollowButton";
import { formatRelativeTime } from "@/lib/utils";
import { Users, FileText, Flame, TrendingUp } from "lucide-react";
import { LOG_TYPES } from "@/lib/constants";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/company/${company.slug}`}>
      <Card className="hover:shadow-md transition-all hover:border-primary/20 h-full">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {company.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{company.name}</h3>
                {company.industry && (
                  <p className="text-xs text-muted-foreground">{company.industry}</p>
                )}
              </div>
            </div>
            <FollowButton companyId={company.id} size="sm" />
          </div>

          {company.one_liner && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {company.one_liner}
            </p>
          )}

          <div className="flex items-center gap-3 mb-3">
            <StatusBadge variant="stage" value={company.stage} size="sm" />
            {company.is_open_to_investors && (
              <span className="text-xs text-emerald-600 font-medium">Open to investors</span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {company.execution_score}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {company.follower_count || 0}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {company.log_count || 0}
              </span>
            </div>
            {company.streak_days > 0 && (
              <span className="flex items-center gap-1 text-orange-500 font-medium">
                <Flame className="h-3 w-3" />
                {company.streak_days}d
              </span>
            )}
          </div>

          {company.recent_log && (
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-medium ${LOG_TYPES[company.recent_log.type]?.color || ''}`}>
                  {LOG_TYPES[company.recent_log.type]?.label}:
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {company.recent_log.title}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
