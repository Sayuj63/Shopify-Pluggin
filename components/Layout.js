import { AppProvider, Frame, Navigation, TopBar } from '@shopify/polaris';
import { HomeMajor, AnalyticsMajor, SettingsMajor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';

export default function AppLayout({ children }) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const router = useRouter();

  const toggleNavigation = useCallback(() => {
    setIsNavigationOpen((isNavigationOpen) => !isNavigationOpen);
  }, []);

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Home',
            icon: HomeMajor,
            url: '/',
            selected: router.pathname === '/',
          },
          {
            label: 'Dashboard',
            icon: AnalyticsMajor,
            url: '/dashboard',
            selected: router.pathname === '/dashboard',
          },
          {
            label: 'Settings',
            icon: SettingsMajor,
            url: '/settings',
            selected: router.pathname === '/settings',
          },
        ]}
      />
    </Navigation>
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleNavigation}
    />
  );

  return (
    <AppProvider i18n={enTranslations}>
      <Frame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={isNavigationOpen}
        onNavigationDismiss={toggleNavigation}
      >
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      </Frame>
    </AppProvider>
  );
} 