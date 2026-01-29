import Link from "next/link";
import { Rocket, Zap, Flame } from "lucide-react";
import { mockLogs } from "@/lib/mock-data";
import { LOG_TYPES } from "@/lib/constants";

/* ── helpers (server-only, zero client JS) ─────────────────────────── */

const ACTION_VERBS: Record<string, string> = {
  shipped: "shipped",
  experiment: "started experiment",
  decision: "decided on",
  pivot: "pivoted on",
  failure: "shared a setback on",
};

const DISPLAY_TIMES = ["2h ago", "5h ago", "1d ago", "2d ago", "3d ago"];

const liveFeed = mockLogs.slice(0, 5).map((log, i) => ({
  id: log.id,
  author: log.author?.full_name ?? "Anonymous",
  verb: ACTION_VERBS[log.type] ?? log.type,
  title: log.title,
  dotColor: LOG_TYPES[log.type].dotColor,
  time: DISPLAY_TIMES[i],
}));

const features = [
  {
    Icon: Rocket,
    title: "Ship Publicly",
    desc: "Log what you build. Five types: ship, experiment, decision, pivot, failure. No vanity metrics.",
  },
  {
    Icon: Zap,
    title: "Velocity Score",
    desc: "Your execution speed, measured. Not followers, not likes \u2014 real output. Updated in real time.",
  },
  {
    Icon: Flame,
    title: "Add Fuel",
    desc: "Back the founders you believe in. $5, $25, or $100. Put money where your conviction is.",
  },
];

const stats = [
  { value: "347", label: "founders" },
  { value: "1,247", label: "logs shipped" },
  { value: "$48k", label: "fuel added" },
];

/* ── page ───────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ─── Top Nav (inline, landing-only) ─────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="gradient-text font-bold text-xl">
            DOER
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/discover"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Discover
            </Link>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-primary/90 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ───────────────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 min-h-screen pt-16">
        <h1 className="gradient-text text-5xl md:text-7xl font-bold tracking-tight">
          Visibility is earned.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed">
          The live execution layer for startups.
          <br />
          Log what you ship. Build in public.
          <br />
          Let your work speak.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <Link
            href="/signup"
            className="bg-primary text-primary-foreground rounded-lg px-8 py-3 font-medium text-lg hover:bg-primary/90 transition-all glow-box"
          >
            Start Building &rarr;
          </Link>
          <Link
            href="/discover"
            className="border border-border text-foreground rounded-lg px-8 py-3 font-medium text-lg hover:bg-secondary transition-all"
          >
            Explore Startups
          </Link>
        </div>
      </section>

      {/* ─── Live Now ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto py-20 px-6 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-live" />
          <span className="text-xs uppercase tracking-wider text-cyan-400">
            Live Now
          </span>
          <span className="flex-1 h-px bg-border/50" />
        </div>

        <div>
          {liveFeed.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-3 border-b border-border/30 last:border-0"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dotColor}`}
              />
              <p className="text-sm text-muted-foreground truncate">
                <span className="text-foreground">{item.author}</span>{" "}
                {item.verb} &ldquo;{item.title}&rdquo;
              </p>
              <span className="text-xs text-muted-foreground/50 ml-auto whitespace-nowrap">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto py-20 px-6 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            The Proof Is in the Log
          </span>
          <span className="flex-1 h-px bg-border/50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card/50 border border-border/50 rounded-xl p-6 hover:bg-card/80 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <f.Icon className="w-5 h-5" />
              </div>
              <h3 className="text-foreground font-medium text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Numbers ────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center w-full">
        <div className="flex items-center justify-center gap-8 md:gap-16">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8 md:gap-16">
              {i > 0 && (
                <div className="hidden md:block w-px h-12 bg-border/30" />
              )}
              <div>
                <div className="font-mono-nums text-3xl md:text-4xl text-foreground text-glow">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center w-full">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Ready to build in public?
        </h2>
        <p className="text-muted-foreground mb-8">
          The best founders don&apos;t hide. They log.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-primary text-primary-foreground rounded-lg px-8 py-3 font-medium text-lg hover:bg-primary/90 transition-all glow-box"
        >
          Start Now &rarr;
        </Link>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-border/50 py-8 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Built for founders who ship.
        </p>
        <div className="text-xs text-muted-foreground/50 flex items-center justify-center gap-4 mt-4">
          <span>&copy; 2024 DOER</span>
        </div>
      </footer>
    </div>
  );
}
