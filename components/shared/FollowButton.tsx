"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck } from "lucide-react";

interface FollowButtonProps {
  companyId: string;
  initialFollowing?: boolean;
  size?: "sm" | "default";
}

export function FollowButton({ companyId, initialFollowing = false, size = "default" }: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    // Optimistic update
    setFollowing(!following);
    // TODO: API call to follow/unfollow
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <Button
      variant={following ? "secondary" : "default"}
      size={size === "sm" ? "sm" : "default"}
      onClick={handleFollow}
      disabled={loading}
      className="gap-1.5"
    >
      {following ? (
        <>
          <UserCheck className="h-4 w-4" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
}
