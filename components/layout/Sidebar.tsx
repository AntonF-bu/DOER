"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  PenLine,
  Compass,
  Radio,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockCurrentUser, getUserCompanies } from "@/lib/mock-data";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/company/edit", label: "My Company", icon: Building2 },
  { href: "/log", label: "New Log", icon: PenLine },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/signal", label: "Signal", icon: Radio },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = mockCurrentUser;
  const companies = getUserCompanies(user.id);
  const primaryCompany = companies[0];
  const velocityScore = primaryCompany?.execution_score ?? 0;

  return (
    <aside className="hidden lg:flex w-[240px] flex-col bg-card/50 border-r border-border/50 h-[calc(100vh-4rem)] sticky top-16">
      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border-l-2 border-primary glow-box"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border-l-2 border-transparent"
              )}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Velocity indicator */}
      {primaryCompany && (
        <div className="p-4 border-t border-border/50">
          <div className="rounded-lg bg-secondary/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Velocity
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono-nums text-2xl font-bold text-foreground text-glow">
                {velocityScore}
              </span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
            <div className="mt-2 h-1 rounded-full bg-border/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${velocityScore}%` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground/70 truncate">
              {primaryCompany.name}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
