import { CommandCenter } from "@/components/dashboard/CommandCenter";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { SprintGoals } from "@/components/dashboard/SprintGoals";
import { QuickPrompts } from "@/components/dashboard/QuickPrompts";
import { LogTimeline } from "@/components/logs/LogTimeline";
import { mockCurrentUser, getUserCompanies, getCompanyLogs, mockLogs } from "@/lib/mock-data";

export default function DashboardPage() {
  const companies = getUserCompanies(mockCurrentUser.id);
  const primaryCompany = companies[0];
  const companyLogs = primaryCompany ? getCompanyLogs(primaryCompany.id) : [];

  const stats = {
    followers: primaryCompany?.follower_count || 0,
    profileViews: 284,
    logCount: primaryCompany?.log_count || 0,
    engagement: 89,
    executionScore: primaryCompany?.execution_score || 0,
    streakDays: primaryCompany?.streak_days || 0,
  };

  const activities = [
    {
      id: "a1",
      type: "comment" as const,
      message: "Emily Roberts commented on your CI/CD v2.0 launch",
      timestamp: "2024-05-28T15:30:00Z",
    },
    {
      id: "a2",
      type: "follow" as const,
      message: "Alex Kim started following DevFlow",
      timestamp: "2024-05-28T12:00:00Z",
    },
    {
      id: "a3",
      type: "view" as const,
      message: "3 investors viewed your company profile",
      timestamp: "2024-05-27T18:00:00Z",
    },
    {
      id: "a4",
      type: "comment" as const,
      message: "Marcus Johnson commented on your API decision",
      timestamp: "2024-05-26T10:00:00Z",
    },
    {
      id: "a5",
      type: "follow" as const,
      message: "Priya Patel started following DevFlow",
      timestamp: "2024-05-25T14:00:00Z",
    },
  ];

  return (
    <div className="space-y-6">
      <CommandCenter />
      <StatsCards stats={stats} />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold mb-4">Recent Logs</h2>
            <LogTimeline logs={companyLogs.slice(0, 5)} />
          </div>
        </div>
        <div className="space-y-6">
          <SprintGoals />
          <QuickPrompts />
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}
