import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import RegistrationHeader from './components/RegistrationHeader';
import ConnectionQualityIndicator from './components/ConnectionQualityIndicator';
import RegistrationForm from './components/RegistrationForm';
import RegistrationSuccess from './components/RegistrationSuccess';

const Register = () => {
  const [connectionQuality, setConnectionQuality] = useState('checking');
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form' or 'success'
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleQualityChange = (quality) => {
    setConnectionQuality(quality);
  };

  const handleRegistrationSubmit = async (formData) => {
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      setRegisteredUser({
        email: formData?.email,
        role: formData?.role,
        fullName: formData?.fullName
      });
      
      setRegistrationStep('success');
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => {}} />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {registrationStep === 'form' ? (
              <>
                <RegistrationHeader />
                
                <div className="bg-card border border-border rounded-lg shadow-sm p-6 lg:p-8">
                  <ConnectionQualityIndicator onQualityChange={handleQualityChange} />
                  
                  <RegistrationForm 
                    onSubmit={handleRegistrationSubmit}
                    connectionQuality={connectionQuality}
                  />
                </div>
                
                {/* Additional Information */}
                <div className="mt-8 text-center">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-foreground mb-2">
                      Optimized for Rural Connectivity
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      This platform is designed to work efficiently on slow internet connections. 
                      Your form data is automatically saved to prevent loss during connection interruptions.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-card border border-border rounded-lg shadow-sm p-6 lg:p-8">
                <RegistrationSuccess 
                  userRole={registeredUser?.role}
                  userEmail={registeredUser?.email}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} RuralClassroom. Bridging education gaps with technology.
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;