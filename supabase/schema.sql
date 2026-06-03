create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'Collector / Viewer'
    check (role in ('Artist', 'Collector / Viewer', 'Admin')),
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.artists (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  slug text not null unique,
  name text not null,
  state text not null,
  city text,
  region text,
  styles text[] not null default '{}',
  mediums text[] not null default '{}',
  bio text not null,
  story text,
  verified boolean not null default false,
  published boolean not null default false,
  approval_status text not null default 'pending_approval'
    check (approval_status in ('pending_approval', 'approved', 'rejected')),
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  rejection_reason text,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.artists
  add column if not exists approval_status text not null default 'pending_approval'
    check (approval_status in ('pending_approval', 'approved', 'rejected')),
  add column if not exists approved_by uuid references public.profiles(id) on delete set null,
  add column if not exists approved_at timestamptz,
  add column if not exists rejection_reason text,
  add column if not exists submitted_at timestamptz not null default now();

create table if not exists public.artworks (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete cascade,
  slug text not null unique,
  title text not null,
  category text not null check (category in ('Original', 'Print', 'Digital art', 'Handmade')),
  style text not null,
  state text not null,
  description text,
  cultural_context text,
  image_url text,
  price_inr integer,
  price_on_request boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete cascade,
  artwork_id uuid references public.artworks(id) on delete set null,
  body text not null,
  tags text[] not null default '{}',
  media_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, profile_id)
);

create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (artist_id, profile_id)
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  artwork_slug text,
  artist_slug text,
  request_title text not null,
  collector_name text not null,
  contact text not null,
  message text not null,
  budget_range text,
  timeline text,
  status text not null default 'New'
    check (status in ('New', 'Discussing', 'Accepted', 'Completed', 'Declined')),
  created_at timestamptz not null default now()
);

create table if not exists public.workshops (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete set null,
  title text not null,
  art_form text not null,
  format text not null check (format in ('Live', 'Recorded')),
  access text not null check (access in ('Free', 'Ticketed')),
  starts_at timestamptz,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.workshop_registrations (
  id uuid primary key default gen_random_uuid(),
  workshop_id uuid references public.workshops(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  contact text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  prize_details text,
  submission_deadline date,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.challenge_submissions (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid references public.challenges(id) on delete cascade,
  artist_id uuid references public.artists(id) on delete set null,
  artwork_id uuid references public.artworks(id) on delete set null,
  statement text,
  created_at timestamptz not null default now()
);

create table if not exists public.grants (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  grant_type text not null default 'Grant',
  prize_details text,
  deadline date,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.regional_art_forms (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  state text not null,
  medium text not null,
  cultural_context text not null,
  featured_artist_names text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  sponsor text not null,
  title text not null,
  copy text not null,
  placement text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  artist_id uuid references public.artists(id) on delete set null,
  artwork_id uuid references public.artworks(id) on delete set null,
  event_name text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.email),
    coalesce(new.raw_user_meta_data ->> 'role', 'Collector / Viewer')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- First admin setup options:
-- Option A: add NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com to .env.local so the
-- auth panel marks matching magic-link signups as Admin.
-- Option B: manually promote the first admin after signup:
-- update public.profiles
-- set role = 'Admin'
-- where id = (select id from auth.users where email = 'admin@example.com');

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.artists enable row level security;
alter table public.artworks enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.follows enable row level security;
alter table public.inquiries enable row level security;
alter table public.workshops enable row level security;
alter table public.workshop_registrations enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_submissions enable row level security;
alter table public.grants enable row level security;
alter table public.regional_art_forms enable row level security;
alter table public.ads enable row level security;
alter table public.analytics_events enable row level security;

drop policy if exists "Public artists are readable" on public.artists;
create policy "Public approved artists are readable" on public.artists
  for select using (approval_status = 'approved');

drop policy if exists "Public artworks are readable" on public.artworks;
create policy "Public approved artist artworks are readable" on public.artworks
  for select using (
    exists (
      select 1 from public.artists
      where artists.id = artworks.artist_id
      and artists.approval_status = 'approved'
    )
  );

drop policy if exists "Public posts are readable" on public.posts;
create policy "Public approved artist posts are readable" on public.posts
  for select using (
    exists (
      select 1 from public.artists
      where artists.id = posts.artist_id
      and artists.approval_status = 'approved'
    )
  );

drop policy if exists "Public workshops are readable" on public.workshops;
create policy "Public approved artist workshops are readable" on public.workshops
  for select using (
    artist_id is null or exists (
      select 1 from public.artists
      where artists.id = workshops.artist_id
      and artists.approval_status = 'approved'
    )
  );

create policy "Public challenges are readable" on public.challenges
  for select using (true);

create policy "Public grants are readable" on public.grants
  for select using (true);

create policy "Public regional art forms are readable" on public.regional_art_forms
  for select using (true);

create policy "Active ads are readable" on public.ads
  for select using (active = true);

create policy "Anyone can create an inquiry" on public.inquiries
  for insert with check (true);

create policy "Artists can read own inquiries" on public.inquiries
  for select using (
    exists (
      select 1 from public.artists
      where artists.slug = inquiries.artist_slug
      and artists.profile_id = auth.uid()
    )
    or exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'Admin'
    )
  );

create policy "Users can read own profile" on public.profiles
  for select using (id = auth.uid());

create policy "Users can update own profile" on public.profiles
  for update using (id = auth.uid());

create policy "Artists can create own pending application" on public.artists
  for insert with check (
    profile_id = auth.uid()
    and approval_status = 'pending_approval'
  );

create policy "Artists can edit own unapproved application" on public.artists
  for update using (
    profile_id = auth.uid()
    and approval_status in ('pending_approval', 'rejected')
  )
  with check (
    profile_id = auth.uid()
    and approval_status in ('pending_approval', 'rejected')
  );

create policy "Admins can read all artists" on public.artists
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'Admin'
    )
  );

create policy "Admins can update artist approval" on public.artists
  for update using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'Admin'
    )
  );

create policy "Authenticated users can comment" on public.comments
  for insert with check (profile_id = auth.uid());

create policy "Authenticated users can like" on public.likes
  for insert with check (profile_id = auth.uid());

create policy "Authenticated users can follow" on public.follows
  for insert with check (profile_id = auth.uid());
