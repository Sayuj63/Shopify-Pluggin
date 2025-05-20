import React from 'react';
import { Card, TextContainer, Button } from '@shopify/polaris';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card sectioned>
          <TextContainer>
            <h2>Something went wrong</h2>
            <p>We apologize for the inconvenience. Please try refreshing the page.</p>
            <div style={{ marginTop: '16px' }}>
              <Button primary onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </TextContainer>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 