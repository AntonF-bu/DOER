export const LOG_TYPES = {
  shipped: {
    label: "Shipped",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: "Rocket",
    prompt: "What did you launch or complete?",
  },
  experiment: {
    label: "Experiment",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: "FlaskConical",
    prompt: "What are you testing? What's your hypothesis?",
  },
  decision: {
    label: "Decision",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: "Scale",
    prompt: "What are you deciding? What are the options?",
  },
  pivot: {
    label: "Pivot",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icon: "RefreshCw",
    prompt: "What changed? Why?",
  },
  failure: {
    label: "Failure",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    icon: "XCircle",
    prompt: "What didn't work? What did you learn?",
  },
} as const;

export type LogType = keyof typeof LOG_TYPES;

export const COMPANY_STAGES = {
  idea: { label: "Idea", color: "text-gray-600", bgColor: "bg-gray-100" },
  building: { label: "Building", color: "text-blue-600", bgColor: "bg-blue-100" },
  launched: { label: "Launched", color: "text-emerald-600", bgColor: "bg-emerald-100" },
  scaling: { label: "Scaling", color: "text-purple-600", bgColor: "bg-purple-100" },
} as const;

export type CompanyStage = keyof typeof COMPANY_STAGES;

export const USER_ROLES = {
  founder: { label: "Founder", color: "text-blue-600", bgColor: "bg-blue-100" },
  investor: { label: "Investor", color: "text-emerald-600", bgColor: "bg-emerald-100" },
  talent: { label: "Talent", color: "text-purple-600", bgColor: "bg-purple-100" },
  collaborator: { label: "Collaborator", color: "text-amber-600", bgColor: "bg-amber-100" },
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
