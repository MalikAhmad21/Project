
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY);

module.exports = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('featured_banner')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data && data[0] ? data[0] : null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
