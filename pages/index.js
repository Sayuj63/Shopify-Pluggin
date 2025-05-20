import { useState, useEffect } from 'react';
import { Page, Card, TextContainer, Button, Banner } from '@shopify/polaris';
import PopupWidget from '../components/PopupWidget';
import AppLayout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingState from '../components/LoadingState';

export default function Home() {
  const [showWidget, setShowWidget] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return <LoadingState message="Loading..." />;
  }

  return (
    <ErrorBoundary>
      <AppLayout>
        <Page
          title="Shopify Personalization Plug-in"
          primaryAction={{
            content: 'Configure Widget',
            url: '/settings',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <Banner
                title="Welcome to your AI-Powered Personalization Dashboard"
                status="info"
              >
                <p>Get started by connecting your Shopify store and configuring your upsell experience.</p>
              </Banner>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px' }}>
                <Card title="Quick Stats">
                  <Card.Section>
                    <TextContainer>
                      <p>Your widget is currently active and showing personalized recommendations to your customers.</p>
                      <div style={{ marginTop: '16px' }}>
                        <Button primary url="/dashboard">View Analytics</Button>
                      </div>
                    </TextContainer>
                  </Card.Section>
                </Card>
              </div>

              <div style={{ flex: '1 1 300px' }}>
                <Card title="Widget Preview">
                  <Card.Section>
                    <div style={{ minHeight: '200px', position: 'relative' }}>
                      {showWidget && (
                        <PopupWidget sentiment="positive" onClose={() => setShowWidget(false)} />
                      )}
                      {!showWidget && (
                        <Button onClick={() => setShowWidget(true)}>Show Preview</Button>
                      )}
                    </div>
                  </Card.Section>
                </Card>
              </div>
            </div>

            <div>
              <Card title="Getting Started">
                <Card.Section>
                  <TextContainer>
                    <ol>
                      <li>Configure your widget appearance in Settings</li>
                      <li>Connect your Shopify store</li>
                      <li>Monitor performance in the Analytics Dashboard</li>
                      <li>Adjust recommendations based on customer behavior</li>
                    </ol>
                  </TextContainer>
                </Card.Section>
              </Card>
            </div>
          </div>
        </Page>
      </AppLayout>
    </ErrorBoundary>
  );
}
