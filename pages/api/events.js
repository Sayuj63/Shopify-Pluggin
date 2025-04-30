// Minimal event receiver (mocked for demo)
export default function handler(req, res) {
  if (req.method === 'POST') {
    // In production, persist to Firestore
    // For demo, just log and return success
    console.log('Received event:', req.body);
    res.status(200).json({ ok: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
