"use client";

import { Company, Log, FuelContribution, TeamMember } from "@/types";
import { COMPANY_STAGES } from "@/lib/constants";
import { FollowButton } from "@/components/shared/FollowButton";
import { FuelPanel } from "./FuelPanel";
import { CompanyTimeline } from "./CompanyTimeline";
import { TeamMembersList } from "./TeamMembers";
import { MetricsDisplay } from "./MetricsDisplay";
import {
  MapPin,
  Globe,
  ExternalLink,
  Flame,
} from "lucide-react";

interface CompanyProfileProps {
  company: Company;
  logs?: Log[];
  fuelContributions?: FuelContribution[];
  teamMembers?: TeamMember[];
}

export function CompanyProfile({
  company,
  logs = [],
  fuelContributions = [],
  teamMembers = [],
}: CompanyProfileProps) {
  const stageConfig = COMPANY_STAGES[company.stage];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
      {/* Left column - Main content */}
      <div className="space-y-6 min-w-0">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {company.name}
              </h1>
              {company.one_liner && (
                <p className="text-muted-foreground mt-1">{company.one_liner}</p>
              )}
            </div>
            <FollowButton companyId={company.id} />
          </div>

          {/* Meta: stage, industry, location, website */}
          <div className="flex items-center gap-3 flex-wrap mt-3">
            <span
              className={`${stageConfig.color} ${stageConfig.bgColor} rounded-full px-2 py-0.5 text-xs`}
            >
              {stageConfig.label}
            </span>
            {company.industry && (
              <span className="text-sm text-muted-foreground">
                {company.industry}
              </span>
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
        </div>

        {/* Velocity section */}
        <div className="bg-card/50 border border-border/50 rounded-xl p-5">
          <div className="flex items-center gap-6 mb-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Velocity
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-4xl font-mono-nums text-foreground text-glow">
                  {company.execution_score}
                </span>
              </div>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                Streak
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="text-4xl font-mono-nums text-foreground">
                  {company.streak_days}
                </span>
                <span className="text-sm text-muted-foreground">days</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-secondary w-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-out"
              style={{ width: `${Math.min(company.execution_score, 100)}%` }}
            />
          </div>
          <div className="flex justify-end mt-1.5">
            <span className="text-xs font-mono-nums text-muted-foreground">
              {company.execution_score}/100
            </span>
          </div>
        </div>

        {/* Metrics row */}
        <MetricsDisplay company={company} />

        {/* Description */}
        {company.description && (
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
              About
            </h2>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {company.description}
            </p>
          </div>
        )}

        {/* Team */}
        {teamMembers.length > 0 && (
          <TeamMembersList members={teamMembers} />
        )}

        {/* Investor interest */}
        {company.is_open_to_investors && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-4 py-3">
            <p className="text-sm text-emerald-400 font-medium">
              Open to investor conversations
            </p>
          </div>
        )}

        {/* Timeline */}
        <CompanyTimeline logs={logs} />
      </div>

      {/* Right sidebar - Fuel Panel */}
      <div className="space-y-4">
        <FuelPanel company={company} contributions={fuelContributions} />
      </div>
    </div>
  );
}
