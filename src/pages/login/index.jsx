import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ConnectionStatusBanner from './components/ConnectionStatusBanner';
import AuthenticationGuard from './components/AuthenticationGuard';
import BandwidthOptimizer from './components/BandwidthOptimizer';
import Icon from '../../components/AppIcon';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [optimizationLevel, setOptimizationLevel] = useState('auto');
  const [authState, setAuthState] = useState('unauthenticated');

  // Mock user credentials for testing
  const mockCredentials = {
    student: {
      email: 'student@ruralclassroom.edu',
      password: 'student123',
      role: 'student'
    },
    instructor: {
      email: 'instructor@ruralclassroom.edu',
      password: 'instructor123',
      role: 'instructor'
    },
    admin: {
      email: 'admin@ruralclassroom.edu',
      password: 'admin123',
      role: 'admin'
    }
  };

  useEffect(() => {
    // Set page title
    document.title = 'Login - RuralClassroom';
    
    // Apply bandwidth-optimized styles
    document.body.style.backgroundColor = 'var(--color-background)';
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      // Simulate network delay based on optimization level
      const delay = optimizationLevel === 'ultra-low' ? 3000 : 
                   optimizationLevel === 'low' ? 2000 : 1000;
      
      await new Promise(resolve => setTimeout(resolve, delay));

      // Check credentials against mock data
      const user = Object.values(mockCredentials)?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (user) {
        // Successful authentication
        const userData = {
          id: Math.random()?.toString(36)?.substr(2, 9),
          email: user?.email,
          role: user?.role,
          name: user?.role === 'student' ? 'Student User' : 
                user?.role === 'instructor' ? 'Instructor User' : 'Admin User',
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        };

        // Store auth data
        const authData = {
          user: userData,
          timestamp: new Date()?.getTime()
        };
        
        localStorage.setItem('ruralClassroom_auth', JSON.stringify(authData));
        localStorage.setItem('ruralClassroom_userRole', userData?.role);

        // Redirect based on role
        setTimeout(() => {
          if (userData?.role === 'student') {
            window.location.href = '/student-dashboard';
          } else if (userData?.role === 'instructor') {
            window.location.href = '/instructor-dashboard';
          } else {
            window.location.href = '/student-dashboard';
          }
        }, 500);

      } else {
        // Invalid credentials
        setLoginError('Invalid email or password. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed due to network issues. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimizationChange = (level, bandwidth) => {
    setOptimizationLevel(level);
    
    // Apply optimization settings
    if (level === 'ultra-low') {
      document.body?.classList?.add('ultra-low-bandwidth');
    } else {
      document.body?.classList?.remove('ultra-low-bandwidth');
    }
  };

  const handleAuthStateChange = (state, role) => {
    setAuthState(state);
  };

  return (
    <AuthenticationGuard onAuthStateChange={handleAuthStateChange}>
      <div className="min-h-screen bg-background">
        {/* Connection Status */}
        <div className="sticky top-0 z-50 p-4">
          <ConnectionStatusBanner />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Bandwidth Optimizer */}
            <BandwidthOptimizer 
              onOptimizationChange={handleOptimizationChange}
              className="mb-6"
            />

            {/* Login Form */}
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={loginError}
            />

            {/* Additional Information */}
            <div className="mt-8 text-center">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-center mb-3">
                  <Icon name="Info" size={20} className="text-primary" />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Demo Credentials
                </h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <strong>Student:</strong> student@ruralclassroom.edu / student123
                  </div>
                  <div>
                    <strong>Instructor:</strong> instructor@ruralclassroom.edu / instructor123
                  </div>
                  <div>
                    <strong>Admin:</strong> admin@ruralclassroom.edu / admin123
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <a 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <span className="text-muted-foreground">•</span>
                <a 
                  href="/terms" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} RuralClassroom. Bridging education gaps.
              </p>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>
    </AuthenticationGuard>
  );
};

export default LoginPage;