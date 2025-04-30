// Minimal Shopify OAuth endpoint (for demo)
// NOTE: In production, use environment variables for secrets and secure session handling.

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY || 'YOUR_API_KEY';
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET || 'YOUR_API_SECRET';
const SCOPES = 'read_products,write_script_tags';
const SHOP = process.env.SHOPIFY_SHOP || 'your-store.myshopify.com';
const REDIRECT_URI = process.env.SHOPIFY_REDIRECT_URI || 'http://localhost:3000/api/auth';
const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method === 'GET' && req.query.shop) {
    // Step 1: Redirect to Shopify OAuth
    const nonce = crypto.randomBytes(16).toString('base64');
    const installUrl = `https://${req.query.shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&state=${nonce}`;
    res.redirect(installUrl);
  } else if (req.method === 'GET' && req.query.code) {
    // Step 2: Handle callback (mocked, just return success)
    // Normally exchange code for access token
    res.status(200).json({ ok: true, message: 'OAuth success (mocked)', shop: req.query.shop });
  } else {
    res.status(400).json({ error: 'Missing shop param or invalid method' });
  }
}
