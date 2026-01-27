import { Company, TeamMember } from "@/types";
import { StatusBadge } from "@/components/shared/Badge";
import { FollowButton } from "@/components/shared/FollowButton";
import { UserAvatar } from "@/components/shared/Avatar";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  FileText,
  Flame,
  TrendingUp,
  Globe,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface CompanyProfileProps {
  company: Company;
  teamMembers: TeamMember[];
}

export function CompanyProfile({ company, teamMembers }: CompanyProfileProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl shrink-0">
          {company.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{company.name}</h1>
              {company.one_liner && (
                <p className="text-muted-foreground mt-1">{company.one_liner}</p>
              )}
            </div>
            <FollowButton companyId={company.id} />
          </div>

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <StatusBadge variant="stage" value={company.stage} />
            {company.industry && (
              <span className="text-sm text-muted-foreground">{company.industry}</span>
            )}
            {company.location && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {company.location}
              </span>
            )}
            {company.website_url && (
              <a
                href={company.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Globe className="h-3 w-3" />
                Website
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="font-semibold">{company.execution_score}</span>
              <span className="text-muted-foreground">score</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{company.follower_count || 0}</span>
              <span className="text-muted-foreground">followers</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{company.log_count || 0}</span>
              <span className="text-muted-foreground">logs</span>
            </span>
            {company.streak_days > 0 && (
              <span className="flex items-center gap-1.5 text-orange-500">
                <Flame className="h-4 w-4" />
                <span className="font-semibold">{company.streak_days}</span>
                <span>day streak</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {company.is_open_to_investors && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          <p className="text-sm text-emerald-700 font-medium">
            This company is open to investor conversations
          </p>
        </div>
      )}

      {/* Description */}
      {company.description && (
        <>
          <Separator />
          <div>
            <h2 className="font-semibold mb-2">About</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {company.description}
            </p>
          </div>
        </>
      )}

      {/* Team */}
      {teamMembers.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="font-semibold mb-3">Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <UserAvatar name={member.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  {member.is_founder && (
                    <StatusBadge variant="role" value="founder" size="sm" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
