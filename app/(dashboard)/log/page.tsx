import { LogComposer } from "@/components/logs/LogComposer";

export const metadata = {
  title: "New Log - DOER",
  description: "Create a new progress log",
};

export default function LogPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <LogComposer />
    </div>
  );
}
