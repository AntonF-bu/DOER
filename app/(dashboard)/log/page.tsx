import { LogComposer } from "@/components/logs/LogComposer";

export const metadata = {
  title: "New Log - DOER",
  description: "Create a new progress log",
};

export default function LogPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-foreground">New Log</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Record what happened.
        </p>
      </div>
      <LogComposer />
    </div>
  );
}
