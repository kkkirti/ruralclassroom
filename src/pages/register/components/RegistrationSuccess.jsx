import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userRole, userEmail }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Auto-redirect after countdown
          handleContinue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    // Redirect based on user role
    if (userRole === 'student') {
      window.location.href = '/student-dashboard';
    } else {
      window.location.href = '/student-dashboard'; // Default to student dashboard for now
    }
  };

  const handleResendVerification = () => {
    // Simulate resending verification email
    console.log('Resending verification email to:', userEmail);
  };

  return (
    <div className="text-center space-y-6 py-8">
      {/* Success Icon */}
      <div className="flex items-center justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-foreground">Account Created Successfully!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Welcome to RuralClassroom! Your account has been created and you're ready to start your learning journey.
        </p>
      </div>

      {/* Account Details */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Mail" size={16} className="text-primary" />
          <span className="text-sm text-foreground">{userEmail}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Icon name="User" size={16} className="text-accent" />
          <span className="text-sm text-foreground capitalize">{userRole}</span>
        </div>
      </div>

      {/* Email Verification Notice */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div className="text-left">
            <h3 className="text-sm font-medium text-foreground mb-1">Email Verification</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a verification email to your address. Please check your inbox and click the verification link to activate all features.
            </p>
            <Button 
              variant="link" 
              size="sm" 
              onClick={handleResendVerification}
              className="p-0 h-auto mt-2"
            >
              Resend verification email
            </Button>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">What's Next?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
            <Icon name="BookOpen" size={20} className="text-primary" />
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Explore Courses</div>
              <div className="text-xs text-muted-foreground">Browse available subjects</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
            <Icon name="Download" size={20} className="text-accent" />
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Download Content</div>
              <div className="text-xs text-muted-foreground">Access offline materials</div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleContinue}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Dashboard {countdown > 0 && `(${countdown}s)`}
        </Button>
        
        <p className="text-xs text-muted-foreground">
          You'll be automatically redirected in {countdown} seconds
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;