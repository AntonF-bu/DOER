-- DOER Platform Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Users (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  role text default 'founder', -- 'founder', 'investor', 'talent', 'collaborator'
  is_verified boolean default false,
  investor_verified boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Companies
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  slug text unique not null,
  one_liner text,
  description text,
  stage text default 'idea', -- 'idea', 'building', 'launched', 'scaling'
  industry text,
  location text,
  website_url text,
  logo_url text,
  is_open_to_investors boolean default false,
  execution_score integer default 0,
  streak_days integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Team Members
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  role text not null,
  is_founder boolean default false,
  created_at timestamp with time zone default now()
);

-- Progress Logs
create table public.logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  type text not null, -- 'shipped', 'experiment', 'decision', 'pivot', 'failure'
  title text not null,
  content text,
  media_urls text[],
  is_feedback_request boolean default false,
  feedback_options jsonb, -- for polls: [{id, text, votes}]
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Comments
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  log_id uuid references public.logs(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Follows (users following companies)
create table public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid references public.profiles(id) on delete cascade not null,
  company_id uuid references public.companies(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  unique(follower_id, company_id)
);

-- Watchlist
create table public.watchlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  company_id uuid references public.companies(id) on delete cascade not null,
  notes text,
  created_at timestamp with time zone default now(),
  unique(user_id, company_id)
);

-- Badges
create table public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  criteria jsonb -- conditions to earn
);

-- User Badges (earned)
create table public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  company_id uuid references public.companies(id) on delete cascade,
  earned_at timestamp with time zone default now(),
  unique(user_id, badge_id, company_id)
);

-- Feedback Votes
create table public.feedback_votes (
  id uuid primary key default gen_random_uuid(),
  log_id uuid references public.logs(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  option_id text not null,
  created_at timestamp with time zone default now(),
  unique(log_id, user_id)
);

-- Profile Views (for investor visibility)
create table public.profile_views (
  id uuid primary key default gen_random_uuid(),
  viewer_id uuid references public.profiles(id) on delete cascade not null,
  company_id uuid references public.companies(id) on delete cascade not null,
  viewed_at timestamp with time zone default now()
);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Profiles: public read, own write
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Companies: public read, owner write
alter table public.companies enable row level security;

create policy "Companies are viewable by everyone"
  on public.companies for select using (true);

create policy "Owners can insert companies"
  on public.companies for insert with check (auth.uid() = owner_id);

create policy "Owners can update own companies"
  on public.companies for update using (auth.uid() = owner_id);

-- Team Members: public read, company owner write
alter table public.team_members enable row level security;

create policy "Team members are viewable by everyone"
  on public.team_members for select using (true);

create policy "Company owners can manage team members"
  on public.team_members for insert with check (
    auth.uid() in (
      select owner_id from public.companies where id = company_id
    )
  );

-- Logs: public read, team write
alter table public.logs enable row level security;

create policy "Logs are viewable by everyone"
  on public.logs for select using (true);

create policy "Team members can insert logs"
  on public.logs for insert with check (auth.uid() = author_id);

create policy "Authors can update own logs"
  on public.logs for update using (auth.uid() = author_id);

-- Comments: public read, authenticated write
alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.comments for select using (true);

create policy "Authenticated users can insert comments"
  on public.comments for insert with check (auth.uid() = author_id);

-- Follows: public read, own write
alter table public.follows enable row level security;

create policy "Follows are viewable by everyone"
  on public.follows for select using (true);

create policy "Users can manage own follows"
  on public.follows for insert with check (auth.uid() = follower_id);

create policy "Users can remove own follows"
  on public.follows for delete using (auth.uid() = follower_id);

-- Watchlist: private to user
alter table public.watchlist enable row level security;

create policy "Users can view own watchlist"
  on public.watchlist for select using (auth.uid() = user_id);

create policy "Users can manage own watchlist"
  on public.watchlist for insert with check (auth.uid() = user_id);

create policy "Users can remove from own watchlist"
  on public.watchlist for delete using (auth.uid() = user_id);

-- Badges: public read
alter table public.badges enable row level security;

create policy "Badges are viewable by everyone"
  on public.badges for select using (true);

-- User Badges: public read
alter table public.user_badges enable row level security;

create policy "User badges are viewable by everyone"
  on public.user_badges for select using (true);

-- Feedback Votes: public read, authenticated write
alter table public.feedback_votes enable row level security;

create policy "Feedback votes are viewable by everyone"
  on public.feedback_votes for select using (true);

create policy "Authenticated users can vote"
  on public.feedback_votes for insert with check (auth.uid() = user_id);

-- Profile Views: company owner can view, authenticated can insert
alter table public.profile_views enable row level security;

create policy "Company owners can view profile views"
  on public.profile_views for select using (
    auth.uid() in (
      select owner_id from public.companies where id = company_id
    )
  );

create policy "Authenticated users can log views"
  on public.profile_views for insert with check (auth.uid() = viewer_id);

-- ============================================
-- Functions & Triggers
-- ============================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger set_companies_updated_at
  before update on public.companies
  for each row execute procedure public.handle_updated_at();

create trigger set_logs_updated_at
  before update on public.logs
  for each row execute procedure public.handle_updated_at();
