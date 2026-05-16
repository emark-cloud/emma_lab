-- Account-gated features: saved plans + order history.
-- Run this in the Supabase project: SQL Editor → paste → Run.
-- Safe to re-run (idempotent).

-- ── Saved plans ───────────────────────────────────────────────
create table if not exists public.saved_plans (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  bundle_id  text        not null,
  created_at timestamptz not null default now(),
  primary key (user_id, bundle_id)
);

alter table public.saved_plans enable row level security;

drop policy if exists "saved_plans_select_own" on public.saved_plans;
create policy "saved_plans_select_own" on public.saved_plans
  for select using (auth.uid() = user_id);

drop policy if exists "saved_plans_insert_own" on public.saved_plans;
create policy "saved_plans_insert_own" on public.saved_plans
  for insert with check (auth.uid() = user_id);

drop policy if exists "saved_plans_delete_own" on public.saved_plans;
create policy "saved_plans_delete_own" on public.saved_plans
  for delete using (auth.uid() = user_id);

-- ── Orders ────────────────────────────────────────────────────
-- Written from the client on verified checkout until the payment
-- backend is rewritten. RLS keeps each user scoped to their own rows.
create table if not exists public.orders (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users (id) on delete cascade,
  reference  text,
  items      jsonb       not null,
  total      numeric     not null,
  currency   text        not null default 'NGN',
  status     text        not null default 'paid',
  created_at timestamptz not null default now()
);

create index if not exists orders_user_created_idx
  on public.orders (user_id, created_at desc);

alter table public.orders enable row level security;

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);
