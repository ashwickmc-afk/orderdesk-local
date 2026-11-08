-- OrderDesk v0.6 Cloud schema. Run in the Supabase SQL Editor.
create table if not exists public.orderdesk_workspaces (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{"version":6,"settings":{"businessName":"My Business","theme":"light"},"orders":[],"entries":[]}'::jsonb,
  revision bigint not null default 0 check (revision >= 0),
  updated_at timestamptz not null default now()
);
create table if not exists public.orderdesk_backups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  revision bigint not null,
  data jsonb not null,
  description text not null default 'OrderDesk snapshot',
  created_at timestamptz not null default now()
);
alter table public.orderdesk_workspaces enable row level security;
alter table public.orderdesk_backups enable row level security;
drop policy if exists "Owners read own workspace" on public.orderdesk_workspaces;
create policy "Owners read own workspace" on public.orderdesk_workspaces for select to authenticated using (owner_id = (select auth.uid()));
drop policy if exists "Owners create own snapshots" on public.orderdesk_backups;
create policy "Owners create own snapshots" on public.orderdesk_backups for insert to authenticated with check (owner_id = (select auth.uid()));
drop policy if exists "Owners read own snapshots" on public.orderdesk_backups;
create policy "Owners read own snapshots" on public.orderdesk_backups for select to authenticated using (owner_id = (select auth.uid()));
drop policy if exists "Owners delete own snapshots" on public.orderdesk_backups;
create policy "Owners delete own snapshots" on public.orderdesk_backups for delete to authenticated using (owner_id = (select auth.uid()));
revoke all on public.orderdesk_workspaces from anon, authenticated;
revoke all on public.orderdesk_backups from anon, authenticated;
grant select on public.orderdesk_workspaces to authenticated;
grant select, insert, delete on public.orderdesk_backups to authenticated;

create or replace function public.orderdesk_save_workspace(p_data jsonb, p_expected_revision bigint)
returns bigint language plpgsql security definer set search_path = public
as $$
declare
  v_owner uuid := auth.uid();
  v_revision bigint;
begin
  if v_owner is null then raise exception 'AUTH_REQUIRED'; end if;
  if p_data is null or jsonb_typeof(p_data) <> 'object' then raise exception 'INVALID_WORKSPACE'; end if;
  select revision into v_revision from public.orderdesk_workspaces where owner_id = v_owner for update;
  if not found then
    if coalesce(p_expected_revision, 0) <> 0 then raise exception 'CONFLICT'; end if;
    insert into public.orderdesk_workspaces(owner_id,data,revision,updated_at)
    values(v_owner,p_data,1,now()) on conflict(owner_id) do nothing;
    if not found then raise exception 'CONFLICT'; end if;
    return 1;
  end if;
  if v_revision <> p_expected_revision then raise exception 'CONFLICT'; end if;
  update public.orderdesk_workspaces set data=p_data,revision=v_revision+1,updated_at=now() where owner_id=v_owner;
  return v_revision+1;
end;
$$;
revoke all on function public.orderdesk_save_workspace(jsonb,bigint) from public;
grant execute on function public.orderdesk_save_workspace(jsonb,bigint) to authenticated;
