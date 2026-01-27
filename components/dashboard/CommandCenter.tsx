import { mockCurrentUser, getUserCompanies, mockLogs } from "@/lib/mock-data";
import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CommandCenter() {
  const companies = getUserCompanies(mockCurrentUser.id);
  const primaryCompany = companies[0];
  const streak = primaryCompany?.streak_days || 0;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border">
      <div>
        <h1 className="text-xl font-bold mb-1">
          Welcome back, {mockCurrentUser.full_name?.split(" ")[0] || mockCurrentUser.username}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {streak > 0 ? (
            <span className="flex items-center gap-1 text-orange-500 font-medium">
              <Flame className="h-4 w-4" />
              {streak} day streak - keep it going!
            </span>
          ) : (
            <span>Start your streak by posting a log today!</span>
          )}
        </div>
      </div>
      <Button asChild className="gap-1.5">
        <Link href="/log">
          Post a Log
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
