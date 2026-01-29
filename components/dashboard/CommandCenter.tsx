"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mockCurrentUser, getUserCompanies, mockLogs, getCompanyFuel } from "@/lib/mock-data";
import { VelocityMeter } from "./VelocityMeter";
import { StatsCards } from "./StatsCards";
import { ActivityFeed } from "./ActivityFeed";
import { SprintGoals } from "./SprintGoals";
import { QuickPrompts } from "./QuickPrompts";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function CommandCenter() {
  const user = mockCurrentUser;
  const companies = getUserCompanies(user.id);
  const primaryCompany = companies[0];
  const firstName = user.full_name?.split(" ")[0] || user.username;

  // Compute stats from mock data
  const velocity = primaryCompany?.execution_score || 0;
  const streakDays = primaryCompany?.streak_days || 0;
  const followers = primaryCompany?.follower_count || 0;
  const fuelContributions = primaryCompany ? getCompanyFuel(primaryCompany.id) : [];
  const fuelReceived = primaryCompany?.fuel_total || 0;

  // Mock weekly changes
  const velocityPercentile = 12;
  const velocityWeeklyChange = 4;
  const logsThisWeek = 12;
  const logsChange = 3;
  const streakChange = 7;
  const followersChange = 8;
  const fuelChange = 125;

  // All logs sorted by most recent
  const recentLogs = [...mockLogs].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="grid gap-6">
      {/* Header: Greeting + Quick Log CTA */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl text-foreground font-medium">
            {getGreeting()}, {firstName}.
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {primaryCompany?.name} is in the top {velocityPercentile}% of builders this week.
          </p>
        </div>
        <Link
          href="/log"
          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          Quick Log
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Top row: Velocity Meter + Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <VelocityMeter
            velocity={velocity}
            percentile={velocityPercentile}
            weeklyChange={velocityWeeklyChange}
          />
        </div>
        <div className="lg:col-span-2">
          <StatsCards
            logsThisWeek={logsThisWeek}
            logsChange={logsChange}
            streakDays={streakDays}
            streakChange={streakChange}
            followers={followers}
            followersChange={followersChange}
            fuelReceived={fuelReceived}
            fuelChange={fuelChange}
          />
        </div>
      </div>

      {/* Bottom row: Live Activity + Mission Panel + Quick Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed logs={recentLogs} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <SprintGoals />
          <QuickPrompts />
        </div>
      </div>
    </div>
  );
}
