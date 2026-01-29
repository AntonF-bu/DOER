import Link from "next/link";
import { mockCompanies, mockProfiles } from "@/lib/mock-data";
import { Flame } from "lucide-react";

export function RisingFounders() {
  const rising = [...mockCompanies]
    .sort((a, b) => b.streak_days - a.streak_days)
    .slice(0, 5);

  return (
    <div className="bg-card/50 border border-border/50 rounded-xl p-4 mt-4">
      <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
        Rising Founders
      </h3>
      <div className="space-y-2">
        {rising.map((company) => {
          const owner = mockProfiles.find((p) => p.id === company.owner_id);
          const initials = (owner?.full_name || company.name)
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2);

          return (
            <Link
              key={company.id}
              href={`/company/${company.slug}`}
              className="flex items-center gap-3 py-1.5 hover:bg-secondary/30 rounded-md px-1.5 -mx-1.5 transition-colors"
            >
              {/* Avatar initials circle */}
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-medium shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">
                  {owner?.full_name || "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {company.name}
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs text-amber-400 font-medium shrink-0">
                <Flame className="h-3 w-3" />
                {company.streak_days}d
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
