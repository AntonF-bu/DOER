import Link from "next/link";
import { Profile, Company, UserBadge } from "@/types";
import { UserAvatar } from "@/components/shared/Avatar";
import { StatusBadge } from "@/components/shared/Badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, Building2, Award, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UserProfileProps {
  profile: Profile;
  companies: Company[];
  badges: UserBadge[];
  logCount: number;
}

export function UserProfile({ profile, companies, badges, logCount }: UserProfileProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <UserAvatar
          name={profile.full_name || profile.username}
          src={profile.avatar_url}
          size="xl"
        />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            {profile.is_verified && (
              <CheckCircle className="h-5 w-5 text-primary" />
            )}
          </div>
          <p className="text-muted-foreground">@{profile.username}</p>
          <div className="flex items-center gap-2 mt-2">
            <StatusBadge variant="role" value={profile.role} />
            {profile.investor_verified && (
              <Badge variant="secondary" className="text-xs">Verified Investor</Badge>
            )}
          </div>
        </div>
      </div>

      {profile.bio && (
        <p className="text-sm text-muted-foreground">{profile.bio}</p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm">
        <span className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{companies.length}</span>
          <span className="text-muted-foreground">companies</span>
        </span>
        <span className="flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{logCount}</span>
          <span className="text-muted-foreground">logs</span>
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Joined {formatDate(profile.created_at)}</span>
        </span>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Badges
            </h2>
            <div className="flex flex-wrap gap-2">
              {badges.map((ub) => (
                <div
                  key={ub.id}
                  className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1"
                >
                  <Award className="h-3.5 w-3.5 text-amber-600" />
                  <span className="text-xs font-medium text-amber-700">
                    {ub.badge?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Companies */}
      {companies.length > 0 && (
        <>
          <Separator />
          <div>
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Companies
            </h2>
            <div className="grid gap-3">
              {companies.map((company) => (
                <Link key={company.id} href={`/company/${company.slug}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {company.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{company.name}</p>
                        {company.one_liner && (
                          <p className="text-xs text-muted-foreground truncate">{company.one_liner}</p>
                        )}
                      </div>
                      <StatusBadge variant="stage" value={company.stage} size="sm" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
