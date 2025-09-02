// Stripe webhook for checkout.session.completed
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const raw = req.rawBody || '';
  try {
    const event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Save order in Supabase (simple example)
      const order = {
        stripe_session_id: session.id,
        customer_email: session.customer_details?.email || null,
        total_amount: session.amount_total || 0,
        status: 'paid'
      };
      const { data, error } = await supabase.from('orders').insert([order]);
      if (error) console.error('supabase insert error', error);
    }
    res.status(200).send('ok');
  } catch (err) {
    console.error('webhook error', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
