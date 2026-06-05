-- ============================================================
-- AutoPrime - Schema do banco de dados (Supabase / PostgreSQL)
-- Execute este arquivo no SQL Editor do Supabase.
-- ============================================================

-- Extensão para UUIDs
create extension if not exists "pgcrypto";

-- ============================================================
-- Tabela: cars
-- ============================================================
create table if not exists public.cars (
  id           uuid primary key default gen_random_uuid(),
  marca        text not null,
  modelo       text not null,
  ano          int  not null,
  km           int  not null default 0,
  combustivel  text not null check (combustivel in ('Gasolina','Etanol','Flex','Diesel','Híbrido','Elétrico')),
  cambio       text not null check (cambio in ('Manual','Automático','CVT','Automatizado')),
  preco        numeric(12,2) not null default 0,
  imagem_url   text,
  descricao    text,
  badge        text check (badge in ('Baixa KM','Novo','Promoção','Destaque')),
  destaque     boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists cars_marca_idx       on public.cars (marca);
create index if not exists cars_ano_idx         on public.cars (ano);
create index if not exists cars_preco_idx       on public.cars (preco);
create index if not exists cars_destaque_idx    on public.cars (destaque);

-- Trigger para manter updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_cars_updated_at on public.cars;
create trigger trg_cars_updated_at
  before update on public.cars
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security
-- Leitura: pública
-- Escrita: somente usuários autenticados (admin via Supabase Auth)
-- ============================================================
alter table public.cars enable row level security;

drop policy if exists "cars_select_public"   on public.cars;
drop policy if exists "cars_insert_auth"     on public.cars;
drop policy if exists "cars_update_auth"     on public.cars;
drop policy if exists "cars_delete_auth"     on public.cars;

create policy "cars_select_public"
  on public.cars for select
  using (true);

create policy "cars_insert_auth"
  on public.cars for insert
  to authenticated
  with check (true);

create policy "cars_update_auth"
  on public.cars for update
  to authenticated
  using (true)
  with check (true);

create policy "cars_delete_auth"
  on public.cars for delete
  to authenticated
  using (true);

-- ============================================================
-- Dados de exemplo (carros mostrados no design)
-- ============================================================
insert into public.cars (marca, modelo, ano, km, combustivel, cambio, preco, imagem_url, descricao, badge, destaque)
values
  ('BMW',          'Série 3 320i',          2023, 15000, 'Gasolina', 'Automático', 285000, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', 'BMW 320i impecável, revisado em concessionária.', 'Baixa KM', true),
  ('Mercedes-Benz','Classe C 200',          2024,  5000, 'Gasolina', 'Automático', 320000, 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'Mercedes 0km, único dono.', 'Novo',     true),
  ('Audi',         'Q5 2.0 TFSI',           2022, 32000, 'Gasolina', 'Automático', 295000, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'Audi Q5 quattro com pacote esportivo.', 'Promoção', true),
  ('Volkswagen',   'T-Cross Highline',      2023, 18000, 'Flex',     'Automático', 145000, 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800', 'T-Cross top de linha.',     'Destaque', false),
  ('Jeep',         'Compass Limited',       2022, 28000, 'Flex',     'Automático', 175000, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', 'Jeep Compass Limited.',     null,       false),
  ('Toyota',       'Corolla XEi',           2023, 12000, 'Flex',     'CVT',        148000, 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800', 'Corolla XEi com baixa quilometragem.', 'Baixa KM', false)
on conflict do nothing;
