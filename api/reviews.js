
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const product_id = req.query.product_id;
      const q = supabase.from('reviews').select('*').order('created_at', { ascending: false });
      const { data, error } = product_id ? await q.eq('product_id', product_id) : await q;
      if (error) return res.status(500).json({ error: error.message });
      return res.json(data || []);
    } else if (req.method === 'POST') {
      const { product_id, user_name, rating, comment } = req.body || {};
      if (!product_id || !user_name || !rating) return res.status(400).json({ error: 'Missing fields' });
      const { data, error } = await supabase.from('reviews').insert([{ product_id, user_name, rating, comment }]);
      if (error) return res.status(500).json({ error: error.message });
      return res.json({ ok: true, data });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
