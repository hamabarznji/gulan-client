import React, { useState, useEffect, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [errorState, setErrorState] = useState<ErrorBoundaryState>({ hasError: false });

  useEffect(() => {
    const handleError = (error: Error, errorInfo: ErrorInfo): void => {
      // You can log the error to a service like Sentry or send it to your server
      console.error('Error:', error, errorInfo);
      setErrorState({ hasError: true });
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (errorState.hasError) {
    return (
      <div style={styles.errorContainer}>
        <h1 style={styles.errorText}>Something went wrong.</h1>
      </div>
    );
  }

  return <>{children}</>;
};

const styles = {
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  errorText: {
    fontSize: '2em',
    textAlign: 'center',
  },
};

export default ErrorBoundary;
