"use client";

import { useState, useMemo } from "react";
import { mockCompanies, mockLogs } from "@/lib/mock-data";
import { FilterBar } from "./FilterBar";
import { CompanyGrid } from "./CompanyGrid";
import { Leaderboard } from "./Leaderboard";
import { RisingFounders } from "./RisingFounders";
import { EmptyState } from "@/components/shared/EmptyState";
import { Building2 } from "lucide-react";
import { Company } from "@/types";

export function DiscoverFeed() {
  const [stage, setStage] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [sort, setSort] = useState("execution_score");

  // Add recent log to companies
  const companiesWithLogs: Company[] = useMemo(() => {
    return mockCompanies.map((company) => {
      const companyLogs = mockLogs.filter((l) => l.company_id === company.id);
      return {
        ...company,
        recent_log: companyLogs[0] || undefined,
      };
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...companiesWithLogs];

    if (stage !== "all") {
      result = result.filter((c) => c.stage === stage);
    }
    if (industry !== "all") {
      result = result.filter((c) => c.industry === industry);
    }

    switch (sort) {
      case "execution_score":
        result.sort((a, b) => b.execution_score - a.execution_score);
        break;
      case "recent":
        result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        break;
      case "followers":
        result.sort((a, b) => (b.follower_count || 0) - (a.follower_count || 0));
        break;
    }

    return result;
  }, [companiesWithLogs, stage, industry, sort]);

  const resetFilters = () => {
    setStage("all");
    setIndustry("all");
    setSort("execution_score");
  };

  return (
    <div className="space-y-6">
      <FilterBar
        stage={stage}
        industry={industry}
        sort={sort}
        onStageChange={setStage}
        onIndustryChange={setIndustry}
        onSortChange={setSort}
        onReset={resetFilters}
      />
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {filtered.length > 0 ? (
            <CompanyGrid companies={filtered} />
          ) : (
            <EmptyState
              icon={Building2}
              title="No companies found"
              description="Try adjusting your filters to see more results."
            />
          )}
        </div>
        <div className="space-y-6">
          <Leaderboard companies={companiesWithLogs} />
          <RisingFounders companies={companiesWithLogs} />
        </div>
      </div>
    </div>
  );
}
