import Link from "next/link";
import { Company } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/shared/Avatar";
import { StatusBadge } from "@/components/shared/Badge";
import { Sparkles, Flame } from "lucide-react";
import { mockProfiles } from "@/lib/mock-data";

interface RisingFoundersProps {
  companies: Company[];
}

export function RisingFounders({ companies }: RisingFoundersProps) {
  const rising = [...companies]
    .sort((a, b) => b.streak_days - a.streak_days)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Rising Founders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rising.map((company) => {
            const owner = mockProfiles.find((p) => p.id === company.owner_id);
            return (
              <Link
                key={company.id}
                href={`/company/${company.slug}`}
                className="flex items-center gap-3 hover:bg-muted/50 rounded-md p-1.5 -mx-1.5 transition-colors"
              >
                <UserAvatar
                  name={owner?.full_name || company.name}
                  src={owner?.avatar_url}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{owner?.full_name}</p>
                  <p className="text-xs text-muted-foreground truncate">{company.name}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-orange-500 font-medium">
                  <Flame className="h-3 w-3" />
                  {company.streak_days}d
                </span>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
