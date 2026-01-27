export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: "founder" | "investor" | "talent" | "collaborator";
  is_verified: boolean;
  investor_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  one_liner: string | null;
  description: string | null;
  stage: "idea" | "building" | "launched" | "scaling";
  industry: string | null;
  location: string | null;
  website_url: string | null;
  logo_url: string | null;
  is_open_to_investors: boolean;
  execution_score: number;
  streak_days: number;
  created_at: string;
  updated_at: string;
  // Joined fields
  owner?: Profile;
  follower_count?: number;
  log_count?: number;
  recent_log?: Log;
}

export interface TeamMember {
  id: string;
  company_id: string;
  user_id: string | null;
  name: string;
  role: string;
  is_founder: boolean;
  created_at: string;
  user?: Profile;
}

export interface Log {
  id: string;
  company_id: string;
  author_id: string;
  type: "shipped" | "experiment" | "decision" | "pivot" | "failure";
  title: string;
  content: string | null;
  media_urls: string[] | null;
  is_feedback_request: boolean;
  feedback_options: FeedbackOption[] | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: Profile;
  company?: Company;
  comment_count?: number;
}

export interface FeedbackOption {
  id: string;
  text: string;
  votes: number;
}

export interface Comment {
  id: string;
  log_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: Profile;
}

export interface Follow {
  id: string;
  follower_id: string;
  company_id: string;
  created_at: string;
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  company_id: string;
  notes: string | null;
  created_at: string;
  company?: Company;
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  criteria: Record<string, unknown> | null;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  company_id: string | null;
  earned_at: string;
  badge?: Badge;
}

export interface ProfileView {
  id: string;
  viewer_id: string;
  company_id: string;
  viewed_at: string;
  viewer?: Profile;
}
