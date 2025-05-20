import { useState } from 'react';
import { Page, Card, FormLayout, TextField, Select, RangeSlider, ColorPicker, Button, Banner } from '@shopify/polaris';
import AppLayout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Settings() {
  const [settings, setSettings] = useState({
    widgetTitle: 'Recommended for You',
    position: 'bottom-right',
    triggerDelay: 5,
    backgroundColor: '#ffffff',
    textColor: '#000000',
    accentColor: '#008060',
    maxProducts: 3,
    showPrice: true,
    showAddToCart: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus({ type: 'success', message: 'Settings saved successfully!' });
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to save settings. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ErrorBoundary>
      <AppLayout>
        <Page
          title="Widget Settings"
          primaryAction={{
            content: 'Save',
            onAction: handleSave,
            loading: isSaving,
          }}
        >
          {saveStatus && (
            <Banner
              status={saveStatus.type}
              onDismiss={() => setSaveStatus(null)}
            >
              {saveStatus.message}
            </Banner>
          )}

          <Card>
            <Card.Section title="Appearance">
              <FormLayout>
                <TextField
                  label="Widget Title"
                  value={settings.widgetTitle}
                  onChange={value => handleChange('widgetTitle', value)}
                  autoComplete="off"
                />

                <Select
                  label="Position"
                  options={[
                    { label: 'Bottom Right', value: 'bottom-right' },
                    { label: 'Bottom Left', value: 'bottom-left' },
                    { label: 'Top Right', value: 'top-right' },
                    { label: 'Top Left', value: 'top-left' },
                  ]}
                  value={settings.position}
                  onChange={value => handleChange('position', value)}
                />

                <RangeSlider
                  label="Trigger Delay (seconds)"
                  value={settings.triggerDelay}
                  min={0}
                  max={30}
                  onChange={value => handleChange('triggerDelay', value)}
                  output
                />

                <div style={{ marginBottom: '16px' }}>
                  <ColorPicker
                    label="Background Color"
                    color={settings.backgroundColor}
                    onChange={value => handleChange('backgroundColor', value)}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <ColorPicker
                    label="Text Color"
                    color={settings.textColor}
                    onChange={value => handleChange('textColor', value)}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <ColorPicker
                    label="Accent Color"
                    color={settings.accentColor}
                    onChange={value => handleChange('accentColor', value)}
                  />
                </div>
              </FormLayout>
            </Card.Section>

            <Card.Section title="Content">
              <FormLayout>
                <RangeSlider
                  label="Maximum Products to Show"
                  value={settings.maxProducts}
                  min={1}
                  max={5}
                  onChange={value => handleChange('maxProducts', value)}
                  output
                />

                <Select
                  label="Show Price"
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  value={settings.showPrice}
                  onChange={value => handleChange('showPrice', value)}
                />

                <Select
                  label="Show Add to Cart Button"
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  value={settings.showAddToCart}
                  onChange={value => handleChange('showAddToCart', value)}
                />
              </FormLayout>
            </Card.Section>
          </Card>
        </Page>
      </AppLayout>
    </ErrorBoundary>
  );
} 