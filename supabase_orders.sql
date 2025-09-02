
-- Reviews table
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  product_id text not null,
  user_name text not null,
  rating int not null check (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone default now()
);
