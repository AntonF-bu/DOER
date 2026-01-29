"use client";

import { useState } from "react";

interface FollowButtonProps {
  companyId: string;
  initialFollowing?: boolean;
}

export function FollowButton({
  companyId,
  initialFollowing = false,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Optimistic update
    setIsFollowing(!isFollowing);
    // TODO: API call to follow/unfollow company
  };

  const label = isFollowing
    ? isHovered
      ? "Unfollow"
      : "Following"
    : "Follow";

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={
        isFollowing
          ? "bg-secondary text-foreground border border-border/50 rounded-lg px-4 py-1.5 text-sm font-medium transition-all hover:border-red-500/50 hover:text-red-400"
          : "bg-primary text-primary-foreground rounded-lg px-4 py-1.5 text-sm font-medium transition-all hover:bg-primary/90"
      }
    >
      {label}
    </button>
  );
}
