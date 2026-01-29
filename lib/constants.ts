export const LOG_TYPES = {
  shipped: {
    label: "Shipped",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    dotColor: "bg-emerald-400",
    icon: "Rocket",
    prompt: "What did you launch or complete?",
  },
  experiment: {
    label: "Experiment",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    dotColor: "bg-purple-400",
    icon: "FlaskConical",
    prompt: "What are you testing? What's your hypothesis?",
  },
  decision: {
    label: "Decision",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    dotColor: "bg-amber-400",
    icon: "Scale",
    prompt: "What are you deciding? What are the options?",
  },
  pivot: {
    label: "Pivot",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    dotColor: "bg-pink-400",
    icon: "RefreshCw",
    prompt: "What changed? Why?",
  },
  failure: {
    label: "Failure",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    dotColor: "bg-red-400",
    icon: "XCircle",
    prompt: "What didn't work? What did you learn?",
  },
} as const;

export type LogType = keyof typeof LOG_TYPES;

export const COMPANY_STAGES = {
  idea: { label: "Idea", color: "text-gray-400", bgColor: "bg-gray-500/10" },
  building: { label: "Building", color: "text-blue-400", bgColor: "bg-blue-500/10" },
  launched: { label: "Launched", color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  scaling: { label: "Scaling", color: "text-purple-400", bgColor: "bg-purple-500/10" },
} as const;

export type CompanyStage = keyof typeof COMPANY_STAGES;

export const USER_ROLES = {
  founder: { label: "Founder", color: "text-blue-400", bgColor: "bg-blue-500/10" },
  investor: { label: "Investor", color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  talent: { label: "Talent", color: "text-purple-400", bgColor: "bg-purple-500/10" },
  collaborator: { label: "Collaborator", color: "text-amber-400", bgColor: "bg-amber-500/10" },
} as const;

export type UserRole = keyof typeof USER_ROLES;

export const INDUSTRIES = [
  "SaaS",
  "Fintech",
  "Healthcare",
  "Education",
  "E-commerce",
  "AI/ML",
  "Developer Tools",
  "Consumer",
  "B2B",
  "Marketplace",
  "Climate",
  "Other",
] as const;
