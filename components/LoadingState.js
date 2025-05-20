import { Spinner, TextContainer } from '@shopify/polaris';

export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '40px',
      minHeight: '200px'
    }}>
      <Spinner size="large" />
      <TextContainer>
        <p style={{ marginTop: '16px', textAlign: 'center' }}>{message}</p>
      </TextContainer>
    </div>
  );
} 