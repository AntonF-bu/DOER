import { TeamMember } from "@/types";

interface TeamMembersProps {
  members: TeamMember[];
}

export function TeamMembersList({ members }: TeamMembersProps) {
  if (members.length === 0) return null;

  return (
    <div>
      <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
        Team
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-secondary/30 rounded-lg p-3"
          >
            <div className="flex items-center gap-2">
              {/* Avatar initials */}
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-medium shrink-0">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-foreground truncate">{member.name}</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-muted-foreground truncate">
                    {member.role}
                  </p>
                  {member.is_founder && (
                    <span className="text-primary text-[10px] font-medium shrink-0">
                      Founder
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
