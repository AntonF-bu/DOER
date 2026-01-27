import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Rocket,
  Eye,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  FlaskConical,
  Scale,
  Users,
  BarChart3,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Zap className="h-5 w-5 text-primary" />
            DOER
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/discover">Explore</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-4 w-4" />
            Where builders ship in public
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Visibility earned through{" "}
            <span className="text-primary">execution</span>, not performance
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            DOER is the live execution platform for startups. Document your journey -
            shipping, experiments, decisions, pivots, failures - and let your work
            speak for itself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/signup" className="gap-2">
                Join as Founder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/discover">Explore Companies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t bg-muted/30">
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              The startup world has a visibility problem
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-destructive/10 p-3 w-fit mx-auto mb-4">
                  <Eye className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-2">Vanity over value</h3>
                <p className="text-sm text-muted-foreground">
                  Social platforms reward viral content, not actual progress. Great
                  builders get buried under engagement bait.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-amber-100 p-3 w-fit mx-auto mb-4">
                  <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Opaque journeys</h3>
                <p className="text-sm text-muted-foreground">
                  Investors and talent can&apos;t see the real story. Pitch decks
                  hide the messy truth of building a company.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-purple-100 p-3 w-fit mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">No execution signal</h3>
                <p className="text-sm text-muted-foreground">
                  There&apos;s no standardized way to measure and showcase how fast a
                  team executes and iterates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t">
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How DOER works
            </h2>
            <p className="text-muted-foreground">
              Three steps to building in public with purpose.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Log your execution</h3>
              <p className="text-sm text-muted-foreground">
                Document what you shipped, experiments you ran, decisions you made,
                pivots you took, and lessons you learned.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Build your score</h3>
              <p className="text-sm text-muted-foreground">
                Your execution score grows with consistent, transparent updates.
                The algorithm rewards action, not engagement.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Get discovered</h3>
              <p className="text-sm text-muted-foreground">
                Investors, talent, and collaborators find you through your track
                record, not your Twitter following.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30">
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Built for builders
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Rocket,
                title: "5 Log Types",
                desc: "Shipped, Experiment, Decision, Pivot, Failure. Every type of progress has a home.",
              },
              {
                icon: TrendingUp,
                title: "Execution Score",
                desc: "An algorithmic score that rewards consistent action and transparent building.",
              },
              {
                icon: Users,
                title: "Discover Feed",
                desc: "Find companies ranked by execution velocity, not follower count.",
              },
              {
                icon: FlaskConical,
                title: "Experiment Tracking",
                desc: "Log hypotheses, track experiments, and share results publicly.",
              },
              {
                icon: Scale,
                title: "Decision Logs",
                desc: "Document the why behind every major decision for full transparency.",
              },
              {
                icon: CheckCircle,
                title: "Streak System",
                desc: "Build momentum with daily logging streaks and milestone badges.",
              },
            ].map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <feature.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to build in public?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join founders who believe that transparency is a competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/signup" className="gap-2">
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/discover">See Who&apos;s Building</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold">
              <Zap className="h-4 w-4 text-primary" />
              DOER
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} DOER. Built for builders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
