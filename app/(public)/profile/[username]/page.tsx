import { notFound } from "next/navigation";
import { getProfileByUsername, getUserCompanies, getUserBadges, mockLogs } from "@/lib/mock-data";
import { UserProfile } from "@/components/profile/UserProfile";

interface ProfilePageProps {
  params: { username: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const profile = getProfileByUsername(params.username);

  if (!profile) {
    notFound();
  }

  const companies = getUserCompanies(profile.id);
  const badges = getUserBadges(profile.id);
  const logs = mockLogs.filter((l) => l.author_id === profile.id);

  return (
    <div className="max-w-3xl mx-auto">
      <UserProfile
        profile={profile}
        companies={companies}
        badges={badges}
        logCount={logs.length}
      />
    </div>
  );
}
