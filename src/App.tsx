import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthLayout } from './components/layout/AuthLayout';

// App.tsx
import {SignUp} from "./components/auth/SignUp";
import {SignIn} from "./components/auth/SignIn";

import { Dashboard } from './components/dashboard/Dashboard';
import { LoadingSpinner } from './components/common/LoadingSpinner';



type AuthView = 'signin' | 'signup';

function App() {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('signin');

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner size={32} className="text-blue-600" />
      </div>
    );
  }

  // User is authenticated, show dashboard
  if (user) {
    return <Dashboard />;
  }

  // User is not authenticated, show auth forms
  return (
    <AuthLayout>
      {authView === 'signin' && (
        <SignIn onSwitchToSignUp={() => setAuthView('signup')} />
      )}
      {authView === 'signup' && (
        <SignUp
          onSwitchToSignIn={() => setAuthView('signin')}
        />
      )}
    </AuthLayout>
  );
}

export default App;