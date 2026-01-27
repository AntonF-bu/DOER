import { cn } from "@/lib/utils";
import { LOG_TYPES, COMPANY_STAGES, USER_ROLES } from "@/lib/constants";

interface StageBadgeProps {
  variant: "stage";
  value: keyof typeof COMPANY_STAGES;
  size?: "sm" | "md" | "lg";
}

interface LogTypeBadgeProps {
  variant: "logType";
  value: keyof typeof LOG_TYPES;
  size?: "sm" | "md" | "lg";
}

interface RoleBadgeProps {
  variant: "role";
  value: keyof typeof USER_ROLES;
  size?: "sm" | "md" | "lg";
}

interface AchievementBadgeProps {
  variant: "achievement";
  value: string;
  size?: "sm" | "md" | "lg";
}

type BadgeComponentProps = StageBadgeProps | LogTypeBadgeProps | RoleBadgeProps | AchievementBadgeProps;

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

export function StatusBadge({ variant, value, size = "md" }: BadgeComponentProps) {
  let colorClass = "";
  let bgClass = "";
  let label = value;

  if (variant === "stage" && value in COMPANY_STAGES) {
    const stage = COMPANY_STAGES[value as keyof typeof COMPANY_STAGES];
    colorClass = stage.color;
    bgClass = stage.bgColor;
    label = stage.label;
  } else if (variant === "logType" && value in LOG_TYPES) {
    const logType = LOG_TYPES[value as keyof typeof LOG_TYPES];
    colorClass = logType.color;
    bgClass = logType.bgColor;
    label = logType.label;
  } else if (variant === "role" && value in USER_ROLES) {
    const role = USER_ROLES[value as keyof typeof USER_ROLES];
    colorClass = role.color;
    bgClass = role.bgColor;
    label = role.label;
  } else {
    colorClass = "text-gray-600";
    bgClass = "bg-gray-100";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        colorClass,
        bgClass,
        sizeClasses[size]
      )}
    >
      {label}
    </span>
  );
}
