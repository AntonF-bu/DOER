"use client";

import { COMPANY_STAGES, INDUSTRIES } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

interface FilterBarProps {
  stage: string;
  industry: string;
  sort: string;
  onStageChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

export function FilterBar({
  stage,
  industry,
  sort,
  onStageChange,
  onIndustryChange,
  onSortChange,
  onReset,
}: FilterBarProps) {
  const hasFilters = stage !== "all" || industry !== "all" || sort !== "execution_score";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Select value={stage} onValueChange={onStageChange}>
          <SelectTrigger className="h-8 w-[130px] text-xs">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {Object.entries(COMPANY_STAGES).map(([key, val]) => (
              <SelectItem key={key} value={key}>{val.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={industry} onValueChange={onIndustryChange}>
          <SelectTrigger className="h-8 w-[150px] text-xs">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {INDUSTRIES.map((ind) => (
              <SelectItem key={ind} value={ind}>{ind}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="h-8 w-[160px] text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="execution_score">Execution Score</SelectItem>
            <SelectItem value="recent">Recent Activity</SelectItem>
            <SelectItem value="followers">Most Followed</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1" onClick={onReset}>
            <X className="h-3 w-3" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
