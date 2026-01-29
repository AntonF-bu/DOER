"use client";

import { FileText, Flame, Users, DollarSign } from "lucide-react";
import { ReactNode } from "react";

interface StatCardData {
  label: string;
  value: string | number;
  change?: string;
  changePositive?: boolean;
  icon: ReactNode;
  accentClass?: string;
}

interface StatsCardsProps {
  logsThisWeek: number;
  logsChange?: number;
  streakDays: number;
  streakChange?: number;
  followers: number;
  followersChange?: number;
  fuelReceived: number;
  fuelChange?: number;
}

export function StatsCards({
  logsThisWeek,
  logsChange,
  streakDays,
  streakChange,
  followers,
  followersChange,
  fuelReceived,
  fuelChange,
}: StatsCardsProps) {
  const cards: StatCardData[] = [
    {
      label: "Logs / Week",
      value: logsThisWeek,
      change: logsChange !== undefined ? `${logsChange > 0 ? "+" : ""}${logsChange} vs last wk` : undefined,
      changePositive: logsChange !== undefined ? logsChange >= 0 : undefined,
      icon: <FileText className="h-3.5 w-3.5 text-blue-400" />,
    },
    {
      label: "Streak",
      value: streakDays,
      change: streakChange !== undefined ? `${streakChange > 0 ? "+" : ""}${streakChange} vs last wk` : undefined,
      changePositive: streakChange !== undefined ? streakChange >= 0 : undefined,
      icon: <Flame className="h-3.5 w-3.5 text-orange-400" />,
    },
    {
      label: "Followers",
      value: followers,
      change: followersChange !== undefined ? `${followersChange > 0 ? "+" : ""}${followersChange} this wk` : undefined,
      changePositive: followersChange !== undefined ? followersChange >= 0 : undefined,
      icon: <Users className="h-3.5 w-3.5 text-purple-400" />,
    },
    {
      label: "Fuel Received",
      value: `$${fuelReceived.toLocaleString()}`,
      change: fuelChange !== undefined ? `${fuelChange > 0 ? "+" : ""}$${Math.abs(fuelChange)} this wk` : undefined,
      changePositive: fuelChange !== undefined ? fuelChange >= 0 : undefined,
      icon: <DollarSign className="h-3.5 w-3.5 text-amber-400" />,
      accentClass: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-card/50 border border-border/50 rounded-xl p-4"
        >
          <div className="flex items-center gap-1.5 mb-2">
            {card.icon}
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
              {card.label}
            </span>
          </div>
          <p className={`text-2xl font-mono-nums ${card.accentClass || "text-foreground"}`}>
            {card.value}
          </p>
          {card.change && (
            <p
              className={`text-xs mt-1 ${
                card.changePositive
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {card.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
