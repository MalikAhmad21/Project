const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

module.exports = async (req, res) => {
  if(req.method !== 'POST') return res.status(405).send('Method not allowed');
  try {
    const body = req.body || {};
    const customer = body.customer || {};
    const items = body.items || [];
    const amount = body.amount || 0;
    const ref = 'JC-' + Math.random().toString(36).slice(2,9).toUpperCase();
    const order = {
      customer_name: customer.name || null,
      customer_email: customer.email || null,
      phone: customer.phone || null,
      address: customer.address || null,
      payment_method: 'jazzcash',
      status: 'pending',
      total_amount: Math.round(amount),
      items: JSON.stringify(items),
      reference: ref
    };
    const { data, error } = await supabase.from('orders').insert([order]);
    if(error) { console.error('jazzcash insert err', error); return res.status(500).json({ error: error.message }); }
    res.json({ ok:true, ref });
  } catch (err) {
    console.error(err); res.status(500).json({ error: err.message });
  }
};