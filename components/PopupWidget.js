import React, { useState, useEffect } from 'react';

// Mocked recommendation fetch
async function fetchRecommendations(sentiment = 'positive') {
  // In production, fetch from /api/recommend with session/sentiment
  if (sentiment === 'positive') {
    return {
      headline: 'Hey there! These picks are fire 🔥',
      products: [
        { id: 'prod1', name: 'Premium Hoodie', img: 'https://via.placeholder.com/60', price: '$49' },
        { id: 'prod2', name: 'Fun Mug', img: 'https://via.placeholder.com/60', price: '$15' }
      ]
    };
  } else {
    return {
      headline: 'Looks like you need a deal—save 10% now!',
      products: [
        { id: 'prod3', name: 'Comfort Bundle', img: 'https://via.placeholder.com/60', price: '$39' },
        { id: 'prod4', name: 'Discount Socks', img: 'https://via.placeholder.com/60', price: '$9' }
      ]
    };
  }
}

export default function PopupWidget({ sentiment = 'positive', onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchRecommendations(sentiment).then(setData);
  }, [sentiment]);

  if (!data) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 32, right: 32, background: '#fff', border: '1px solid #ccc', padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', zIndex: 9999, borderRadius: 12, minWidth: 280
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <b>{data.headline}</b>
        <button style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' }} onClick={onClose}>×</button>
      </div>
      <div style={{ marginTop: 10, display: 'flex', gap: 12 }}>
        {data.products.map(p => (
          <div key={p.id} style={{ textAlign: 'center' }}>
            <img src={p.img} alt={p.name} style={{ borderRadius: 8 }} />
            <div>{p.name}</div>
            <div>{p.price}</div>
            <button style={{ marginTop: 4, background: '#008060', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
