import { useState } from 'react';
import { Page, Card, TextContainer, ResourceList, ResourceItem, Text, Badge } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { useEffect, useRef } from 'react';
import AppLayout from '../components/Layout';
import LoadingState from '../components/LoadingState';
import ErrorBoundary from '../components/ErrorBoundary';

// Chart component with responsive design
function Chart({ id, type, data, options }) {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({ width: 320, height: 180 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth - 40, 600);
      setDimensions({ width, height: width * 0.5625 });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

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
        const ctx = ref.current.getContext('2d');
        if (window.chartInstances && window.chartInstances[id]) {
          window.chartInstances[id].destroy();
        }
        window.chartInstances = window.chartInstances || {};
        window.chartInstances[id] = new window.Chart(ctx, { type, data, options });
      }
    }
  }, [type, data, options, dimensions]);

  return <canvas id={id} ref={ref} width={dimensions.width} height={dimensions.height} />;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock data with more metrics
  const metrics = {
    totalRevenue: '$12,450',
    averageOrderValue: '$72',
    conversionRate: '3.2%',
    totalOrders: 173,
    customerSatisfaction: '4.8/5',
  };

  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [62, 25, 13],
      backgroundColor: ['#36d399', '#ffe066', '#f87272'],
    }],
  };

  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Revenue',
      data: [1200, 1900, 1500, 2100, 1800, 2400, 2100],
      borderColor: '#008060',
      tension: 0.4,
    }],
  };

  const topProducts = [
    { id: '1', name: 'Premium Hoodie', orders: 45, revenue: '$2,205' },
    { id: '2', name: 'Fun Mug', orders: 38, revenue: '$570' },
    { id: '3', name: 'Comfort Bundle', orders: 32, revenue: '$1,248' },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <LoadingState message="Loading dashboard data..." />;
  }

  return (
    <ErrorBoundary>
      <AppLayout>
        <Page title="Analytics Dashboard">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card>
              <Card.Section>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {Object.entries(metrics).map(([key, value]) => (
                    <div key={key} style={{ textAlign: 'center' }}>
                      <Text variant="headingMd" as="h3">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Text>
                      <Text variant="headingLg" as="p">
                        {value}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card.Section>
            </Card>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px' }}>
                <Card title="Revenue Trend">
                  <Card.Section>
                    <Chart id="revenueChart" type="line" data={revenueData} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } }
                    }} />
                  </Card.Section>
                </Card>
              </div>

              <div style={{ flex: '1 1 300px' }}>
                <Card title="Customer Sentiment">
                  <Card.Section>
                    <Chart id="sentimentChart" type="doughnut" data={sentimentData} options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }} />
                  </Card.Section>
                </Card>
              </div>
            </div>

            <Card title="Top Performing Products">
              <Card.Section>
                <ResourceList
                  items={topProducts}
                  renderItem={(item) => (
                    <ResourceItem
                      id={item.id}
                      name={item.name}
                      accessibilityLabel={`View details for ${item.name}`}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text variant="bodyMd" fontWeight="bold">{item.name}</Text>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <Badge status="success">{item.orders} orders</Badge>
                          <Text variant="bodyMd">{item.revenue}</Text>
                        </div>
                      </div>
                    </ResourceItem>
                  )}
                />
              </Card.Section>
            </Card>
          </div>
        </Page>
      </AppLayout>
    </ErrorBoundary>
  );
}
