import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, connectionQuality }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    collegeName: '',
    course: '',
    yearOfStudy: '',
    subjectExpertise: '',
    teachingExperience: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'educator', label: 'Educator' }
  ];

  const courseOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electronics', label: 'Electronics Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'ai-ml', label: 'AI & Machine Learning' },
    { value: 'vlsi', label: 'VLSI Design' },
    { value: 'renewable-energy', label: 'Renewable Energy' }
  ];

  const yearOptions = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' }
  ];

  const experienceOptions = [
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (Object.values(formData)?.some(value => value !== '' && value !== false)) {
        localStorage.setItem('registrationFormData', JSON.stringify(formData));
        setAutoSaveStatus('Draft saved');
        setTimeout(() => setAutoSaveStatus(''), 2000);
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData]);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('registrationFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[a-z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password) && /[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Calculate password strength
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
    
    if (!formData?.password) newErrors.password = 'Password is required';
    else if (formData?.password?.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!formData?.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData?.password !== formData?.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (!formData?.role) newErrors.role = 'Please select your role';
    
    // Role-specific validation
    if (formData?.role === 'student') {
      if (!formData?.collegeName?.trim()) newErrors.collegeName = 'College name is required';
      if (!formData?.course) newErrors.course = 'Course selection is required';
      if (!formData?.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required';
    }
    
    if (formData?.role === 'educator') {
      if (!formData?.subjectExpertise?.trim()) newErrors.subjectExpertise = 'Subject expertise is required';
      if (!formData?.teachingExperience) newErrors.teachingExperience = 'Teaching experience is required';
    }
    
    if (!formData?.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      // Clear saved form data on successful submission
      localStorage.removeItem('registrationFormData');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Auto-save status */}
      {autoSaveStatus && (
        <div className="flex items-center space-x-2 text-sm text-success">
          <Icon name="Check" size={16} />
          <span>{autoSaveStatus}</span>
        </div>
      )}
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll use this for account verification and important updates"
          required
        />

        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          
          {formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-medium ${passwordStrength >= 75 ? 'text-success' : passwordStrength >= 50 ? 'text-accent' : passwordStrength >= 25 ? 'text-warning' : 'text-error'}`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />

        <Select
          label="I am a"
          placeholder="Select your role"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          required
        />
      </div>
      {/* Role-specific fields */}
      {formData?.role === 'student' && (
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground">Student Information</h3>
          
          <Input
            label="College Name"
            type="text"
            placeholder="Enter your college name"
            value={formData?.collegeName}
            onChange={(e) => handleInputChange('collegeName', e?.target?.value)}
            error={errors?.collegeName}
            required
          />

          <Select
            label="Course"
            placeholder="Select your course"
            options={courseOptions}
            value={formData?.course}
            onChange={(value) => handleInputChange('course', value)}
            error={errors?.course}
            searchable
            required
          />

          <Select
            label="Year of Study"
            placeholder="Select your current year"
            options={yearOptions}
            value={formData?.yearOfStudy}
            onChange={(value) => handleInputChange('yearOfStudy', value)}
            error={errors?.yearOfStudy}
            required
          />
        </div>
      )}
      {formData?.role === 'educator' && (
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground">Educator Information</h3>
          
          <Input
            label="Subject Expertise"
            type="text"
            placeholder="e.g., AI & Machine Learning, VLSI Design, Renewable Energy"
            value={formData?.subjectExpertise}
            onChange={(e) => handleInputChange('subjectExpertise', e?.target?.value)}
            error={errors?.subjectExpertise}
            description="Specify your primary teaching subjects"
            required
          />

          <Select
            label="Teaching Experience"
            placeholder="Select your experience level"
            options={experienceOptions}
            value={formData?.teachingExperience}
            onChange={(value) => handleInputChange('teachingExperience', value)}
            error={errors?.teachingExperience}
            required
          />
        </div>
      )}
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.termsAccepted}
          onChange={(e) => handleInputChange('termsAccepted', e?.target?.checked)}
          error={errors?.termsAccepted}
          required
        />
        
        <div className="text-sm text-muted-foreground">
          <p>By creating an account, you agree to our compressed data usage policies designed for low-bandwidth environments.</p>
        </div>
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isSubmitting}
        disabled={connectionQuality === 'offline'}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>
      {connectionQuality === 'offline' && (
        <div className="flex items-center space-x-2 text-sm text-warning bg-warning/10 p-3 rounded-lg">
          <Icon name="WifiOff" size={16} />
          <span>You're offline. Form data is saved and will be submitted when connection is restored.</span>
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;