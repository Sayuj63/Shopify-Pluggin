// Enhanced snippet.js: loads React widget, simulates live-chat, runs sentiment analysis
(function() {
  // --- Event Tracking ---
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'page_view', url: window.location.href, ts: Date.now() })
  });

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('product-card')) {
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'product_click', ts: Date.now() })
      });
    }
    if (e.target.classList.contains('add-to-cart')) {
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'add_to_cart', ts: Date.now() })
      });
    }
  });

  // --- Live Chat Integration (Mock) ---
  // Simulate a chat widget by listening for custom events or polling DOM
  function mockChatListener() {
    // For demo, simulate a chat message every 10s
    setInterval(function() {
      var chatMsg = Math.random() > 0.5 ? 'I love this store!' : 'This is so slow and annoying.';
      var sentiment = analyzeSentiment(chatMsg);
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'chat_message', text: chatMsg, sentiment, ts: Date.now() })
      });
      window.__lastSentiment = sentiment;
    }, 10000);
  }

  // --- Simple Sentiment Analysis ---
  function analyzeSentiment(text) {
    var positive = ['love', 'great', 'awesome', 'good', 'amazing', 'happy', 'fast'];
    var negative = ['slow', 'bad', 'annoying', 'hate', 'frustrated', 'problem', 'sad'];
    var t = text.toLowerCase();
    if (positive.some(w => t.includes(w))) return 'positive';
    if (negative.some(w => t.includes(w))) return 'negative';
    return 'neutral';
  }

  // --- Dynamically Load React & Widget ---
  function loadReactWidget() {
    var reactCdn = 'https://unpkg.com/react@18/umd/react.production.min.js';
    var reactDomCdn = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
    var widgetCdn = 'https://cdn.jsdelivr.net/gh/Sayuj63/Sayuj63@main/components/PopupWidget.umd.js'; // Placeholder: should host a UMD build

    function injectScript(src, cb) {
      var s = document.createElement('script');
      s.src = src; s.onload = cb; document.body.appendChild(s);
    }
    injectScript(reactCdn, function() {
      injectScript(reactDomCdn, function() {
        // For demo, inline the widget below
        var container = document.createElement('div');
        container.id = 'shopify-upsell-widget';
        document.body.appendChild(container);
        window.React = React; window.ReactDOM = ReactDOM;
        var sentiment = window.__lastSentiment || 'positive';
        ReactDOM.render(
          React.createElement('div', {style: {position:'fixed',bottom:32,right:32,background:'#fff',border:'1px solid #ccc',padding:20,boxShadow:'0 2px 8px rgba(0,0,0,0.08)',zIndex:9999,borderRadius:12,minWidth:280}},
            React.createElement('div', {style:{display:'flex',justifyContent:'space-between',alignItems:'center'}},
              React.createElement('b',null,sentiment==='positive'?'Hey there! These picks are fire 🔥':'Looks like you need a deal—save 10% now!'),
              React.createElement('button',{style:{background:'none',border:'none',fontSize:18,cursor:'pointer'},onClick:function(){container.remove();}},'×')
            ),
            React.createElement('div',{style:{marginTop:10,display:'flex',gap:12}},
              (sentiment==='positive'?
                [{id:'prod1',name:'Premium Hoodie',img:'https://via.placeholder.com/60',price:'$49'},{id:'prod2',name:'Fun Mug',img:'https://via.placeholder.com/60',price:'$15'}]
                :
                [{id:'prod3',name:'Comfort Bundle',img:'https://via.placeholder.com/60',price:'$39'},{id:'prod4',name:'Discount Socks',img:'https://via.placeholder.com/60',price:'$9'}]
              ).map(function(p){
                return React.createElement('div',{key:p.id,style:{textAlign:'center'}},
                  React.createElement('img',{src:p.img,alt:p.name,style:{borderRadius:8}}),
                  React.createElement('div',null,p.name),
                  React.createElement('div',null,p.price),
                  React.createElement('button',{style:{marginTop:4,background:'#008060',color:'#fff',border:'none',borderRadius:4,padding:'4px 10px',cursor:'pointer'}},'Add to Cart')
                );
              })
            )
          ),
        container
        );
      });
    });
  }

  setTimeout(loadReactWidget, 2000);
  setTimeout(mockChatListener, 3000);
})();
