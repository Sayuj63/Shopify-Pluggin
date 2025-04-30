import { AppProvider, Page, Card, TextContainer } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { useEffect, useRef } from 'react';

// Simple chart using Chart.js via CDN
function Chart({ id, type, data, options }) {
  const ref = useRef();
  useEffect(() => {
    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => renderChart();
      document.body.appendChild(script);
    } else {
      renderChart();
    }
    function renderChart() {
      if (ref.current && window.Chart) {
        new window.Chart(ref.current.getContext('2d'), { type, data, options });
      }
    }
  }, [type, data, options]);
  return <canvas id={id} ref={ref} width={320} height={180} />;
}

export default function Dashboard() {
  // Mock data
  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [62, 25, 13],
      backgroundColor: ['#36d399', '#ffe066', '#f87272'],
    }],
  };
  const aovData = {
    labels: ['Widget On', 'Widget Off'],
    datasets: [{
      label: 'AOV ($)',
      data: [72, 61],
      backgroundColor: ['#008060', '#d3d3d3'],
    }],
  };
  return (
    <AppProvider>
      <Page title="Analytics Dashboard">
        <Card sectioned>
          <TextContainer>
            <h2>Sentiment Distribution</h2>
            <Chart id="sentimentChart" type="doughnut" data={sentimentData} />
            <h2 style={{marginTop:32}}>AOV Lift (Widget On vs Off)</h2>
            <Chart id="aovChart" type="bar" data={aovData} options={{ plugins: { legend: { display: false } } }} />
          </TextContainer>
        </Card>
      </Page>
    </AppProvider>
  );
}
