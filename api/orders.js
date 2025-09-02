// /api/order.js
const { createClient } = require('@supabase/supabase-js');
const Stripe = require('stripe');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

module.exports = async (req, res) => {
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};
    const customer = body.customer || {};
    const items = body.items || [];
    const amount = body.amount || 0;
    const payment_method = body.payment_method || 'card';

    // --- Prepare order object for Supabase ---
    const orderData = {
      customer_name: customer.name || null,
      customer_email: customer.email || null,
      phone: customer.phone || null,
      address: customer.address || null,
      payment_method,
      status: payment_method === 'card' ? 'pending' : 'pending',
      total_amount: Math.round(amount),
      items: JSON.stringify(items),
      reference: null,
      stripe_session_id: null
    };

    if(payment_method === 'card'){
      // --- Stripe Checkout session ---
      const line_items = items.map(it => ({
        price_data: {
          currency: 'usd',
          product_data: { name: it.name || 'Product' },
          unit_amount: Math.round((it.price || 0) * 100),
        },
        quantity: it.qty || 1,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
        customer_email: customer.email || undefined,
      });

      orderData.stripe_session_id = session.id;

      // Save order in Supabase
      const { data, error } = await supabase.from('orders').insert([orderData]).select().single();
      if(error) return res.status(500).json({ error: error.message });

      return res.json({ ok:true, sessionUrl: session.url });

    } else if(payment_method === 'jazzcash'){
      // --- JazzCash / cash style ---
      const ref = 'JC-' + Math.random().toString(36).slice(2,9).toUpperCase();
      orderData.reference = ref;

      const { data, error } = await supabase.from('orders').insert([orderData]).select().single();
      if(error) return res.status(500).json({ error: error.message });

      return res.json({ ok:true, reference: ref });
    }

    res.status(400).json({ error: 'Invalid payment method' });

  } catch(err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
