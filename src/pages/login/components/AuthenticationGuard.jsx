import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AuthenticationGuard = ({ children, onAuthStateChange }) => {
  const [authState, setAuthState] = useState('checking');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = () => {
    // Simulate authentication check
    const savedAuth = localStorage.getItem('ruralClassroom_auth');
    const savedRole = localStorage.getItem('ruralClassroom_userRole');
    
    if (savedAuth && savedRole) {
      try {
        const authData = JSON.parse(savedAuth);
        const currentTime = new Date()?.getTime();
        
        // Check if token is still valid (24 hours)
        if (authData?.timestamp && (currentTime - authData?.timestamp) < 24 * 60 * 60 * 1000) {
          setUserRole(savedRole);
          setAuthState('authenticated');
          
          // Redirect to appropriate dashboard
          if (onAuthStateChange) {
            onAuthStateChange('authenticated', savedRole);
          }
          
          // Auto redirect based on role
          setTimeout(() => {
            if (savedRole === 'student') {
              window.location.href = '/student-dashboard';
            } else if (savedRole === 'instructor') {
              window.location.href = '/instructor-dashboard';
            } else {
              window.location.href = '/student-dashboard';
            }
          }, 1000);
          
          return;
        } else {
          // Token expired, clear storage
          localStorage.removeItem('ruralClassroom_auth');
          localStorage.removeItem('ruralClassroom_userRole');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('ruralClassroom_auth');
        localStorage.removeItem('ruralClassroom_userRole');
      }
    }
    
    setAuthState('unauthenticated');
    if (onAuthStateChange) {
      onAuthStateChange('unauthenticated', null);
    }
  };

  const handleSuccessfulAuth = (userData) => {
    const authData = {
      user: userData,
      timestamp: new Date()?.getTime()
    };
    
    localStorage.setItem('ruralClassroom_auth', JSON.stringify(authData));
    localStorage.setItem('ruralClassroom_userRole', userData?.role || 'student');
    
    setUserRole(userData?.role || 'student');
    setAuthState('authenticated');
    
    if (onAuthStateChange) {
      onAuthStateChange('authenticated', userData?.role || 'student');
    }
  };

  if (authState === 'checking') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader" size={32} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (authState === 'authenticated') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground mb-4">Redirecting to your dashboard...</p>
          <div className="w-48 h-2 bg-muted rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Clone children and pass auth handler
  return React.cloneElement(children, {
    onAuthSuccess: handleSuccessfulAuth
  });
};

export default AuthenticationGuard;