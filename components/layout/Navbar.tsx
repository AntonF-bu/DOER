"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Menu } from "lucide-react";
import { useState } from "react";
import { mockCurrentUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/discover", label: "Discover" },
  { href: "/log", label: "Log" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = mockCurrentUser;

  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.username.slice(0, 2).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-16 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex h-full items-center justify-between px-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="gradient-text text-xl font-bold tracking-tight"
            >
              DOER
            </Link>

            {/* Center/Right nav links - only shown when logged in */}
            {user && (
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right: Notification bell + Avatar */}
          <div className="flex items-center gap-3">
            {user && (
              <>
                {/* Notification bell */}
                <button
                  className="hidden md:flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors duration-200"
                  aria-label="Notifications"
                >
                  <Activity className="h-4 w-4" />
                </button>

                {/* User avatar */}
                <Link
                  href={`/profile/${user.username}`}
                  className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-xs font-semibold ring-1 ring-border/50 hover:ring-primary/50 transition-all duration-200"
                >
                  {initials}
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
