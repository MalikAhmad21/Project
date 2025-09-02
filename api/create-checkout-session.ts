import { createClient } from '@supabase/supabase-js';
import { IncomingMessage, ServerResponse } from 'http';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Parse JSON body
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const data = JSON.parse(body);
      const { amount, items, customer } = data;

      // Create Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items:
          items && items.length > 0
            ? items.map((it: any) => ({
                price_data: {
                  currency: 'usd',
                  product_data: { name: `Item ${it.id}` },
                  unit_amount:
                    it.unit_amount ||
                    Math.round((amount || 0) * 100 / (items.length || 1)),
                },
                quantity: it.quantity || 1,
              }))
            : [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: { name: 'Order' },
                    unit_amount: Math.round((amount || 100) * 100),
                  },
                  quantity: 1,
                },
              ],
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      // Insert into Supabase
      await supabaseAdmin.from('orders').insert([
        {
          customer_name: customer?.name || null,
          customer_email: customer?.email || null,
          phone: customer?.phone || null,
          address: customer?.address || null,
          payment_method: 'card',
          status: 'pending',
          total_amount: Math.round(amount || session.amount_total || 0),
          items: JSON.stringify(items || []),
          stripe_session_id: session.id,
        },
      ]);

      // Send response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ sessionUrl: session.url }));
    } catch (err: any) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });
}
