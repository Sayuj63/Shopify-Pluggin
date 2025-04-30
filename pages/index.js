import { useState } from 'react';
import { AppProvider, Page, Card, TextContainer } from '@shopify/polaris';
import PopupWidget from '../components/PopupWidget';
import '@shopify/polaris/build/esm/styles.css';

export default function Home() {
  const [showWidget, setShowWidget] = useState(true);
  return (
    <AppProvider>
      <Page title="Shopify Personalization Plug-in">
        <Card sectioned>
          <TextContainer>
            <h2>Welcome to the AI-Powered Shopify Personalization Plug-in MVP</h2>
            <p>Get started by connecting your Shopify store and configuring your upsell experience.</p>
          </TextContainer>
        </Card>
        {showWidget && (
          <PopupWidget sentiment="positive" onClose={() => setShowWidget(false)} />
        )}
      </Page>
    </AppProvider>
  );
}
