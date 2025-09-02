import { supabase } from './supabaseClient';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  image_main?: string;
  image_alt?: string;
  slug?: string;
}

export interface Banner {
  id: number;
  image_url: string;
  title?: string;
  subtitle?: string;
  created_at?: string;
}

// 👇 Order types
export interface OrderItem {
  productId: number;
  name: string;
  size?: string;
  qty: number;
  price: number;
}

export interface Order {
  id?: number;
  customer_name: string;
  customer_email?: string;
  phone?: string;
  address?: string;
  payment_method: string;
  status: string;
  total_amount: number;
  items: OrderItem[];
  created_at?: string;
}

// ------------------ PRODUCTS ------------------
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id,name,description,price,currency,image_main,image_alt,slug')
    .order('id', { ascending: true });

  if (error) throw error;
  return data || [];
}

// ------------------ BANNER ------------------
export async function fetchBanner(): Promise<Banner | null> {
  const { data, error } = await supabase
    .from('featured_banner')
    .select('id,image_url,title,subtitle,created_at')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

// ------------------ PLACE ORDER ------------------
// ------------------ PLACE ORDER VIA API ------------------
export async function placeOrder(order: Order): Promise<any> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error("Failed to place order");
  }

  return await res.json(); // 👈 Ye tumhara { ok: true, data } return karega
}

