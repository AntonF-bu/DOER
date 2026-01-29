"use client";

import Link from "next/link";
import { Profile, Company, UserBadge } from "@/types";
import { USER_ROLES } from "@/lib/constants";
import { Building2, FileText, CalendarDays, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UserProfileProps {
  profile: Profile;
  companies?: Company[];
  badges?: UserBadge[];
  logCount?: number;
}

export function UserProfile({ profile, companies = [], badges = [], logCount = 0 }: UserProfileProps) {
  const roleConfig = USER_ROLES[profile.role];

  const initials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : profile.username.slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-xl font-medium text-foreground shrink-0">
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">{profile.full_name}</h1>
            {profile.is_verified && (
              <CheckCircle className="h-5 w-5 text-primary" />
            )}
          </div>
          <p className="text-muted-foreground">@{profile.username}</p>
          <span
            className={`inline-block mt-1.5 ${roleConfig.color} ${roleConfig.bgColor} rounded-full px-3 py-0.5 text-xs font-medium`}
          >
            {roleConfig.label}
          </span>
        </div>
      </div>

      {profile.bio && (
        <p className="text-sm text-muted-foreground">{profile.bio}</p>
      )}

      {/* Stats Row */}
      <div className="flex items-center gap-6 text-sm">
        <span className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono-nums font-semibold text-foreground">{companies.length}</span>
          <span className="text-muted-foreground">companies</span>
        </span>
        <span className="flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono-nums font-semibold text-foreground">{logCount}</span>
          <span className="text-muted-foreground">logs</span>
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Joined {formatDate(profile.created_at)}</span>
        </span>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Badges</h2>
          <div className="flex flex-wrap gap-2">
            {badges.map((ub) => (
              <div
                key={ub.id}
                className="bg-secondary/30 rounded-lg px-3 py-1.5 text-xs text-foreground"
              >
                {ub.badge?.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Companies */}
      {companies.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-foreground mb-2">Companies</h2>
          <div className="grid gap-3">
            {companies.map((company) => (
              <Link key={company.id} href={`/company/${company.slug}`}>
                <div className="bg-card/50 border border-border/50 rounded-xl p-4 hover:bg-card/80 hover:border-border/80 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {company.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground">{company.name}</p>
                      {company.one_liner && (
                        <p className="text-xs text-muted-foreground truncate">{company.one_liner}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
