import { TeamMember } from "@/types";
import { UserAvatar } from "@/components/shared/Avatar";
import { StatusBadge } from "@/components/shared/Badge";

interface TeamMembersProps {
  members: TeamMember[];
}

export function TeamMembersList({ members }: TeamMembersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {members.map((member) => (
        <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg border">
          <UserAvatar name={member.name} size="sm" />
          <div>
            <p className="text-sm font-medium">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </div>
          {member.is_founder && (
            <StatusBadge variant="role" value="founder" size="sm" />
          )}
        </div>
      ))}
    </div>
  );
}
