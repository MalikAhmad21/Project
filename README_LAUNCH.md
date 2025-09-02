

ADDITIONS:
- /checkout.html static checkout (Stripe + JazzCash)
- /api/jazzcash, /api/reviews endpoints
- Product images clickable -> zoom modal + auto slideshow
- Logo updated (vite.svg)


SUPABASE SETUP:
1. Create Supabase project.
2. In SQL editor run `supabase_schema.sql` to create tables.
3. Upload images to Supabase Storage and insert product/banner rows via SQL or Dashboard.
4. Set env vars from `.env.example` in your hosting provider.
