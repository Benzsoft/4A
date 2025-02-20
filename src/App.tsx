import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import { testSupabaseConnection } from './utils/supabaseTest';

// Test Supabase connection on app start
testSupabaseConnection().then(isConnected => {
  if (!isConnected) {
    console.error('Failed to connect to Supabase. Please check your credentials.');
  }
});

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <HelmetProvider>
          <AuthProvider>
            <AppRoutes />
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                }
              }}
            />
          </AuthProvider>
        </HelmetProvider>
      </Router>
    </ErrorBoundary>
  );
}