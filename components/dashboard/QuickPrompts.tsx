import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, FlaskConical, Scale, RefreshCw, XCircle, Lightbulb } from "lucide-react";

const prompts = [
  {
    icon: Rocket,
    label: "What did you ship today?",
    color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100",
    type: "shipped",
  },
  {
    icon: FlaskConical,
    label: "Running any experiments?",
    color: "text-blue-600 bg-blue-50 hover:bg-blue-100",
    type: "experiment",
  },
  {
    icon: Scale,
    label: "Weighing a decision?",
    color: "text-amber-600 bg-amber-50 hover:bg-amber-100",
    type: "decision",
  },
  {
    icon: RefreshCw,
    label: "Making a pivot?",
    color: "text-purple-600 bg-purple-50 hover:bg-purple-100",
    type: "pivot",
  },
  {
    icon: XCircle,
    label: "Share a lesson learned",
    color: "text-gray-600 bg-gray-50 hover:bg-gray-100",
    type: "failure",
  },
];

export function QuickPrompts() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Lightbulb className="h-4 w-4" />
          Quick Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {prompts.map((prompt) => (
            <Link
              key={prompt.type}
              href={`/log?type=${prompt.type}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${prompt.color}`}
            >
              <prompt.icon className="h-4 w-4 shrink-0" />
              {prompt.label}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
