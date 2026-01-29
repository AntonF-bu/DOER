"use client";

import { useState, useMemo } from "react";
import { mockCompanies, mockLogs } from "@/lib/mock-data";
import { FilterBar } from "./FilterBar";
import { CompanyGrid } from "./CompanyGrid";
import { Leaderboard } from "./Leaderboard";
import { RisingFounders } from "./RisingFounders";
import { Company } from "@/types";

export function DiscoverFeed() {
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

    if (industry !== "all") {
      result = result.filter((c) => c.industry === industry);
    }

    switch (sort) {
      case "execution_score":
        result.sort((a, b) => b.execution_score - a.execution_score);
        break;
      case "velocity":
        result.sort((a, b) => b.execution_score - a.execution_score);
        break;
      case "fuel":
        result.sort((a, b) => b.fuel_total - a.fuel_total);
        break;
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      default:
        result.sort((a, b) => b.execution_score - a.execution_score);
    }

    return result;
  }, [companiesWithLogs, industry, sort]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
      {/* Left: filters + grid */}
      <div className="space-y-5 min-w-0">
        <FilterBar
          industry={industry}
          sort={sort}
          onIndustryChange={setIndustry}
          onSortChange={setSort}
        />

        {filtered.length > 0 ? (
          <CompanyGrid companies={filtered} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground text-sm">
              No companies found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {/* Right: sidebar */}
      <div>
        <Leaderboard />
        <RisingFounders />
      </div>
    </div>
  );
}
