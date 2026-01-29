import { getProfileByUsername, getUserCompanies, getUserBadges, mockLogs } from "@/lib/mock-data";
import { USER_ROLES } from "@/lib/constants";
import { CompanyCard } from "@/components/company/CompanyCard";
import { UserProfile } from "@/components/profile/UserProfile";
import { StreakCounter } from "@/components/profile/StreakCounter";
import { BadgeDisplay } from "@/components/profile/BadgeDisplay";

interface ProfilePageProps {
  params: { username: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const profile = getProfileByUsername(params.username);

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-20">
        <h1 className="text-2xl font-bold text-foreground mb-2">Profile not found</h1>
        <p className="text-muted-foreground">
          The user @{params.username} does not exist.
        </p>
      </div>
    );
  }

  const companies = getUserCompanies(profile.id);
  const badges = getUserBadges(profile.id);
  const userLogs = mockLogs.filter((l) => l.author_id === profile.id);
  const roleConfig = USER_ROLES[profile.role];

  // Calculate total streak from companies
  const maxStreak = companies.reduce((max, c) => Math.max(max, c.streak_days), 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-start gap-5 mb-6">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-2xl font-medium text-foreground shrink-0">
          {profile.full_name
            ? profile.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : profile.username.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{profile.full_name}</h1>
          <p className="text-muted-foreground">@{profile.username}</p>
          {profile.bio && (
            <p className="text-muted-foreground text-sm mt-2">{profile.bio}</p>
          )}
          <span
            className={`inline-block mt-2 ${roleConfig.color} ${roleConfig.bgColor} rounded-full px-3 py-0.5 text-xs font-medium`}
          >
            {roleConfig.label}
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-6 mb-8">
        <div className="text-center">
          <p className="font-mono-nums text-xl font-bold text-foreground">{companies.length}</p>
          <p className="text-xs text-muted-foreground">Companies</p>
        </div>
        <div className="text-center">
          <p className="font-mono-nums text-xl font-bold text-foreground">{userLogs.length}</p>
          <p className="text-xs text-muted-foreground">Total Logs</p>
        </div>
        <div className="text-center">
          <StreakCounter days={maxStreak} />
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-foreground mb-3">Badges</h2>
          <BadgeDisplay badges={badges} />
        </div>
      )}

      {/* Companies Grid */}
      {companies.length > 0 && (
        <div>
          <h2 className="text-lg font-medium text-foreground mb-3">Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
