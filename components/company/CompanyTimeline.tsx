"use client";

import { Log } from "@/types";
import { LogTimeline } from "@/components/logs/LogTimeline";

interface CompanyTimelineProps {
  logs: Log[];
}

export function CompanyTimeline({ logs }: CompanyTimelineProps) {
  return (
    <div>
      <h2 className="font-semibold mb-4">Activity Timeline</h2>
      <LogTimeline logs={logs} />
    </div>
  );
}
