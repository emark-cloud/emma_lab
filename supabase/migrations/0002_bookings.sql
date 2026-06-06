-- Bookings, patients, catalog, and staff console foundation.
-- Run after 0001_account_features.sql.
-- Supabase: SQL Editor → paste → Run. Safe to re-run (idempotent).

create extension if not exists "pgcrypto";

-- ── updated_at trigger helper ──────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── Catalog: tests ─────────────────────────────────────────────
-- Canonical test list. `lims_test_code` is filled in once we have
-- Healthray's catalog mapping; until then the column stays null and
-- the staff handoff is manual.
create table if not exists public.test (
  code           text          primary key,
  name           text          not null,
  specimen_type  text,
  department     text,
  price          numeric(10,2),
  lims_test_code text,
  active         boolean       not null default true,
  created_at     timestamptz   not null default now(),
  updated_at     timestamptz   not null default now()
);

drop trigger if exists test_set_updated_at on public.test;
create trigger test_set_updated_at before update on public.test
  for each row execute function public.set_updated_at();

alter table public.test enable row level security;
drop policy if exists "test_public_read" on public.test;
create policy "test_public_read" on public.test for select using (true);

-- ── Catalog: bundles ───────────────────────────────────────────
create table if not exists public.bundle (
  slug        text          primary key,
  name        text          not null,
  category    text          not null,
  price       numeric(10,2) not null,
  description text,
  featured    boolean       not null default false,
  active      boolean       not null default true,
  created_at  timestamptz   not null default now(),
  updated_at  timestamptz   not null default now()
);

drop trigger if exists bundle_set_updated_at on public.bundle;
create trigger bundle_set_updated_at before update on public.bundle
  for each row execute function public.set_updated_at();

alter table public.bundle enable row level security;
drop policy if exists "bundle_public_read" on public.bundle;
create policy "bundle_public_read" on public.bundle for select using (true);

-- ── Junction: bundle → tests ───────────────────────────────────
create table if not exists public.bundle_test (
  bundle_slug text not null references public.bundle (slug) on delete cascade,
  test_code   text not null references public.test (code)   on delete restrict,
  primary key (bundle_slug, test_code)
);

alter table public.bundle_test enable row level security;
drop policy if exists "bundle_test_public_read" on public.bundle_test;
create policy "bundle_test_public_read" on public.bundle_test for select using (true);

-- ── Patients ───────────────────────────────────────────────────
-- Created on first booking. `lims_patient_id` ties to Healthray once
-- a patient record is created over there. No RLS policies — only the
-- service_role (server-side) reads this table.
create table if not exists public.patient (
  id              uuid        primary key default gen_random_uuid(),
  full_name       text        not null,
  phone           text        not null,
  email           text,
  dob             date,
  sex             text        check (sex in ('male','female','other')),
  address         text,
  lims_patient_id text,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists patient_phone_idx on public.patient (phone);
create index if not exists patient_email_idx on public.patient (lower(email));

drop trigger if exists patient_set_updated_at on public.patient;
create trigger patient_set_updated_at before update on public.patient
  for each row execute function public.set_updated_at();

alter table public.patient enable row level security;

-- ── Bookings ───────────────────────────────────────────────────
-- `reference` is the short human code (e.g. EL-7K9X2) shown on the
-- receipt and used by the front desk. `lims_*` columns track the
-- handoff into Healthray.
create table if not exists public.booking (
  id               uuid          primary key default gen_random_uuid(),
  reference        text          not null unique,
  patient_id       uuid          not null references public.patient (id) on delete restrict,
  status           text          not null default 'pending_payment'
    check (status in (
      'pending_payment','booked','checked_in',
      'samples_collected','in_lab','reported','delivered',
      'cancelled','no_show'
    )),
  scheduled_for    timestamptz,
  location         text,
  channel          text          not null default 'web'
    check (channel in ('web','walk_in')),
  amount           numeric(10,2) not null,
  currency         text          not null default 'NGN',
  payment_provider text,
  payment_ref      text,
  payment_status   text          check (payment_status in ('pending','success','failed','refunded')),
  paid_at          timestamptz,
  lims_order_id    text,
  lims_sync_status text          not null default 'pending'
    check (lims_sync_status in ('pending','pushed','failed','manual')),
  lims_synced_at   timestamptz,
  notes            text,
  created_at       timestamptz   not null default now(),
  updated_at       timestamptz   not null default now()
);

create index if not exists booking_patient_idx          on public.booking (patient_id);
create index if not exists booking_status_scheduled_idx on public.booking (status, scheduled_for);
create index if not exists booking_payment_ref_idx      on public.booking (payment_ref);
create index if not exists booking_created_idx          on public.booking (created_at desc);

drop trigger if exists booking_set_updated_at on public.booking;
create trigger booking_set_updated_at before update on public.booking
  for each row execute function public.set_updated_at();

alter table public.booking enable row level security;

-- ── Booking items ──────────────────────────────────────────────
-- One row per line in the cart. Either a bundle or an individual test;
-- bundles are exploded into their constituent tests at lab time via
-- bundle_test, but we keep the booked unit here for receipts.
create table if not exists public.booking_item (
  id            uuid          primary key default gen_random_uuid(),
  booking_id    uuid          not null references public.booking (id) on delete cascade,
  bundle_slug   text          references public.bundle (slug) on delete restrict,
  test_code     text          references public.test   (code) on delete restrict,
  qty           int           not null default 1 check (qty > 0),
  unit_price    numeric(10,2) not null,
  name_snapshot text          not null,
  created_at    timestamptz   not null default now(),
  check (bundle_slug is not null or test_code is not null)
);

create index if not exists booking_item_booking_idx on public.booking_item (booking_id);

alter table public.booking_item enable row level security;

-- ── Staff users ────────────────────────────────────────────────
-- One row per lab staff member. PK matches auth.users so we can gate
-- /staff/* on `select 1 from staff_user where id = auth.uid()`.
create table if not exists public.staff_user (
  id         uuid        primary key references auth.users (id) on delete cascade,
  email      text        not null unique,
  full_name  text,
  role       text        not null
    check (role in ('reception','phlebotomist','lab_tech','admin')),
  active     boolean     not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists staff_user_set_updated_at on public.staff_user;
create trigger staff_user_set_updated_at before update on public.staff_user
  for each row execute function public.set_updated_at();

alter table public.staff_user enable row level security;
drop policy if exists "staff_user_select_self" on public.staff_user;
create policy "staff_user_select_self" on public.staff_user
  for select using (auth.uid() = id);

-- ── Audit log ──────────────────────────────────────────────────
-- Append-only trail of who-did-what for bookings, patients, and LIMS
-- syncs. `entity_id` is text to keep the table polymorphic.
create table if not exists public.audit_log (
  id          bigserial   primary key,
  actor_type  text        not null check (actor_type in ('staff','patient','system')),
  actor_id    uuid,
  entity_type text        not null,
  entity_id   text        not null,
  action      text        not null,
  from_value  text,
  to_value    text,
  metadata    jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists audit_log_entity_idx
  on public.audit_log (entity_type, entity_id, created_at desc);

alter table public.audit_log enable row level security;
