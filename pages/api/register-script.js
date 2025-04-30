// Minimal ScriptTag registration endpoint (mocked)
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // In production, use access token and Shopify REST API to register ScriptTag
    // For demo, return mocked success
    res.status(200).json({ ok: true, scriptTagId: 'mocked-script-tag-id' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
