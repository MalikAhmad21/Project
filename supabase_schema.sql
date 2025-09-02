
-- Featured banner table
create table if not exists public.featured_banner (
  id bigint generated always as identity primary key,
  image_url text not null,
  title text,
  subtitle text,
  created_at timestamp with time zone default now()
);

-- Products table (two images stored as URLs)
create table if not exists public.products (
  id bigint generated always as identity primary key,
  name text not null,
  slug text unique,
  price integer not null,
  currency text default 'USD',
  description text,
  image_main text,
  image_alt text,
  created_at timestamp with time zone default now()
);

-- Reviews table
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  product_id bigint references public.products(id) on delete cascade,
  user_name text not null,
  rating int not null check (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone default now()
);

-- Orders table (store items as json)
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  customer_name text,
  customer_email text,
  phone text,
  address text,
  payment_method text,
  status text default 'pending',
  total_amount integer not null default 0,
  items jsonb,
  stripe_session_id text,
  reference text,
  created_at timestamp with time zone default now()
);
