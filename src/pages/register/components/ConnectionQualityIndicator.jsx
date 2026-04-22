import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionQualityIndicator = ({ onQualityChange }) => {
  const [connectionQuality, setConnectionQuality] = useState('checking');
  const [bandwidth, setBandwidth] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const checkConnectionQuality = () => {
      if (!navigator.onLine) {
        setConnectionQuality('offline');
        setIsOnline(false);
        onQualityChange('offline');
        return;
      }

      setIsOnline(true);
      
      // Simulate bandwidth detection
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (connection) {
        const effectiveType = connection?.effectiveType;
        setBandwidth(connection?.downlink);
        
        switch (effectiveType) {
          case '4g': setConnectionQuality('excellent');
            break;
          case '3g': setConnectionQuality('good');
            break;
          case '2g': setConnectionQuality('poor');
            break;
          default:
            setConnectionQuality('fair');
        }
      } else {
        // Fallback quality detection
        setConnectionQuality('good');
      }
      
      onQualityChange(connectionQuality);
    };

    checkConnectionQuality();
    
    const handleOnline = () => {
      setIsOnline(true);
      checkConnectionQuality();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setConnectionQuality('offline');
      onQualityChange('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection quality periodically
    const qualityCheckInterval = setInterval(checkConnectionQuality, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(qualityCheckInterval);
    };
  }, [connectionQuality, onQualityChange]);

  const getQualityConfig = () => {
    switch (connectionQuality) {
      case 'offline':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          icon: 'WifiOff',
          label: 'Offline',
          description: 'Form data will be saved locally and submitted when connection is restored'
        };
      case 'poor':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'Wifi',
          label: 'Poor Connection',
          description: 'Form optimized for minimal data usage'
        };
      case 'fair':
        return {
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          icon: 'Wifi',
          label: 'Fair Connection',
          description: 'Registration form adapted for your connection speed'
        };
      case 'good':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'Wifi',
          label: 'Good Connection',
          description: 'All features available'
        };
      case 'excellent':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'Wifi',
          label: 'Excellent Connection',
          description: 'Optimal experience enabled'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'Loader',
          label: 'Checking...',
          description: 'Detecting connection quality'
        };
    }
  };

  const qualityConfig = getQualityConfig();

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${qualityConfig?.bgColor} mb-6`}>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name={qualityConfig?.icon} 
            size={20} 
            className={`${qualityConfig?.color} ${connectionQuality === 'checking' ? 'animate-spin' : ''}`} 
          />
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'animate-pulse' : ''}`} 
               style={{ backgroundColor: qualityConfig?.color?.includes('error') ? '#DC2626' : 
                                       qualityConfig?.color?.includes('warning') ? '#D97706' :
                                       qualityConfig?.color?.includes('success') ? '#059669' : '#64748B' }}>
          </div>
        </div>
        
        <div>
          <div className={`text-sm font-medium ${qualityConfig?.color}`}>
            {qualityConfig?.label}
          </div>
          <div className="text-xs text-muted-foreground">
            {qualityConfig?.description}
          </div>
        </div>
      </div>
      {bandwidth && (
        <div className="text-xs text-muted-foreground">
          {bandwidth?.toFixed(1)} Mbps
        </div>
      )}
    </div>
  );
};

export default ConnectionQualityIndicator;