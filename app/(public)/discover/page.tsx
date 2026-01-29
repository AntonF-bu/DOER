import { DiscoverFeed } from "@/components/discover/DiscoverFeed";

export const metadata = {
  title: "Discover - DOER",
  description: "Discover startups ranked by execution velocity",
};

export default function DiscoverPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Discover</h1>
        <p className="text-muted-foreground text-sm">
          Find companies ranked by execution, not engagement.
        </p>
      </div>
      <DiscoverFeed />
    </div>
  );
}
