"use client";

import { Building2, Eye, TrendingUp, Users, UserPlus } from "lucide-react";
import { mockProfiles, mockCompanies } from "@/lib/mock-data";
import Link from "next/link";

// Mock signal data
const mockSignalStats = {
  impressions: 847,
  impressionsChange: 23,
  profileViews: 23,
  profileViewsChange: 34,
  investorsWatching: 7,
};

const mockInvestorActivity = [
  {
    id: "inv-1",
    name: "a]ventures",
    type: "firm",
    focus: "Series A · $2-5M checks · Fintech, Payments",
    action: "Viewed your profile and 3 logs",
    time: "2h ago",
    isAnonymous: false,
  },
  {
    id: "inv-2",
    name: "Anonymous Investor",
    type: "individual",
    focus: null,
    action: "Viewed your company page",
    time: "1d ago",
    isAnonymous: true,
  },
  {
    id: "inv-3",
    name: "Horizon Ventures",
    type: "firm",
    focus: "Seed · Climate, Developer Tools",
    action: "Viewed your timeline",
    time: "2d ago",
    isAnonymous: false,
  },
];

const mockNewFollowers = [
  {
    id: "fol-1",
    username: "marcus",
    name: "Marcus Johnson",
    role: "Founder @ GreenGrid",
    time: "12h ago",
  },
  {
    id: "fol-2",
    username: "alexk",
    name: "Alex Kim",
    role: "Engineer @ Stripe",
    time: "1d ago",
  },
  {
    id: "fol-3",
    username: "priyap",
    name: "Priya Patel",
    role: "Partner @ Sequoia",
    time: "2d ago",
  },
];

function StatCard({
  icon: Icon,
  value,
  label,
  change,
  suffix,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  change?: number;
  suffix?: string;
}) {
  return (
    <div className="bg-card/50 border border-border/50 rounded-xl p-5">
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        <Icon className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <div className="font-mono-nums text-3xl text-foreground">
        {value.toLocaleString()}
        {suffix && <span className="text-lg text-muted-foreground">{suffix}</span>}
      </div>
      {change !== undefined && (
        <div className={`text-xs mt-1 ${change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%{" "}
          <span className="text-muted-foreground">vs last week</span>
        </div>
      )}
    </div>
  );
}

export default function SignalPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Signal</h1>
        <p className="text-muted-foreground mt-1">Your visibility across the ecosystem</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={Eye}
          value={mockSignalStats.impressions}
          label="Feed Impressions"
          change={mockSignalStats.impressionsChange}
        />
        <StatCard
          icon={Users}
          value={mockSignalStats.profileViews}
          label="Profile Views"
          change={mockSignalStats.profileViewsChange}
        />
        <div className="bg-card/50 border border-amber-500/20 rounded-xl p-5">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <Building2 className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Investors Watching</span>
          </div>
          <div className="font-mono-nums text-3xl text-amber-400 text-glow-fuel">
            {mockSignalStats.investorsWatching}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            verified investor accounts
          </div>
        </div>
      </div>

      {/* Investor Activity */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            Investor Activity
          </span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        <div className="space-y-3">
          {mockInvestorActivity.map((activity) => (
            <div
              key={activity.id}
              className={`bg-card/50 border rounded-xl p-4 ${
                !activity.isAnonymous
                  ? "border-amber-500/20 hover:border-amber-500/40"
                  : "border-border/50 hover:border-border"
              } transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.isAnonymous
                        ? "bg-secondary text-muted-foreground"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {activity.isAnonymous ? (
                      <Users className="w-5 h-5" />
                    ) : (
                      <Building2 className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="text-foreground font-medium">{activity.name}</div>
                    {activity.focus && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {activity.focus}
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground mt-1">
                      {activity.action}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground/50 font-mono-nums">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Followers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              New Followers
            </span>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          <Link
            href="/discover"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            See all
          </Link>
        </div>

        <div className="bg-card/50 border border-border/50 rounded-xl divide-y divide-border/30">
          {mockNewFollowers.map((follower) => (
            <Link
              key={follower.id}
              href={`/profile/${follower.username}`}
              className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground">
                  {follower.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground font-medium">
                      @{follower.username}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{follower.role}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground/50 font-mono-nums">
                {follower.time}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
