import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="text-center space-y-4 mb-8">
      {/* Logo and Brand */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name="GraduationCap" size={28} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">RuralClassroom</h1>
          <p className="text-sm text-muted-foreground">Remote Education Platform</p>
        </div>
      </div>

      {/* Registration Title */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Create Your Account</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Join thousands of students and educators bridging the education gap with optimized learning for rural areas.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Wifi" size={16} className="text-success" />
          <span>Low bandwidth optimized</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Download" size={16} className="text-accent" />
          <span>Offline content support</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={16} className="text-primary" />
          <span>Expert instructors</span>
        </div>
      </div>

      {/* Back to Login */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-muted-foreground">Already have an account?</span>
        <Button 
          variant="link" 
          size="sm" 
          onClick={handleBackToLogin}
          className="p-0 h-auto"
        >
          Sign in here
        </Button>
      </div>
    </div>
  );
};

export default RegistrationHeader;