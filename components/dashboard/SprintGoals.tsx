"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface MissionItem {
  id: string;
  text: string;
  completed: boolean;
}

const initialMissions: MissionItem[] = [
  { id: "m-1", text: "Ship v2.0 CI/CD integration", completed: true },
  { id: "m-2", text: "Run pricing experiment", completed: false },
  { id: "m-3", text: "Hire first sales engineer", completed: false },
];

export function SprintGoals() {
  const [missions, setMissions] = useState<MissionItem[]>(initialMissions);

  const toggleMission = (id: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  return (
    <div className="bg-card/50 border border-border/50 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          This Week&apos;s Mission
        </span>
      </div>

      {/* Mission items */}
      <div className="space-y-3">
        {missions.map((mission) => (
          <button
            key={mission.id}
            onClick={() => toggleMission(mission.id)}
            className="flex items-center gap-3 w-full text-left group"
          >
            {/* Checkbox */}
            <div
              className={`w-4 h-4 rounded shrink-0 flex items-center justify-center transition-colors ${
                mission.completed
                  ? "bg-primary"
                  : "border border-border group-hover:border-muted-foreground"
              }`}
            >
              {mission.completed && (
                <Check className="h-3 w-3 text-primary-foreground" />
              )}
            </div>

            {/* Text */}
            <span
              className={`text-sm transition-colors ${
                mission.completed
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {mission.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
