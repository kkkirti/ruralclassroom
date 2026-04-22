import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatusBanner = ({ className = "" }) => {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [bandwidth, setBandwidth] = useState('unknown');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkConnection = () => {
      if (navigator.onLine) {
        // Simulate bandwidth detection
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
          const effectiveType = connection?.effectiveType;
          if (effectiveType === '4g') {
            setBandwidth('high');
            setConnectionStatus('excellent');
          } else if (effectiveType === '3g') {
            setBandwidth('medium');
            setConnectionStatus('good');
          } else {
            setBandwidth('low');
            setConnectionStatus('limited');
          }
        } else {
          setBandwidth('medium');
          setConnectionStatus('good');
        }
      } else {
        setConnectionStatus('offline');
        setBandwidth('none');
      }
    };

    checkConnection();
    
    const handleOnline = () => checkConnection();
    const handleOffline = () => {
      setConnectionStatus('offline');
      setBandwidth('none');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'excellent':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          icon: 'Wifi',
          message: 'Excellent connection - Full features available',
          showDismiss: true
        };
      case 'good':
        return {
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          icon: 'Wifi',
          message: 'Good connection - All features working',
          showDismiss: true
        };
      case 'limited':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          icon: 'Wifi',
          message: 'Limited bandwidth - Optimized mode active',
          showDismiss: false
        };
      case 'offline':
        return {
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/20',
          icon: 'WifiOff',
          message: 'No internet connection - Please check your network',
          showDismiss: false
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/50',
          borderColor: 'border-muted',
          icon: 'Loader',
          message: 'Checking connection status...',
          showDismiss: false
        };
    }
  };

  const statusConfig = getStatusConfig();

  if (!isVisible && statusConfig?.showDismiss) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex items-center justify-between p-3 rounded-lg border ${statusConfig?.bgColor} ${statusConfig?.borderColor}`}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Icon 
              name={statusConfig?.icon} 
              size={20} 
              className={`${statusConfig?.color} ${connectionStatus === 'checking' ? 'animate-spin' : ''}`} 
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className={`text-sm font-medium ${statusConfig?.color}`}>
              {statusConfig?.message}
            </p>
            {bandwidth !== 'unknown' && bandwidth !== 'none' && (
              <p className="text-xs text-muted-foreground mt-1">
                Bandwidth: {bandwidth?.charAt(0)?.toUpperCase() + bandwidth?.slice(1)}
              </p>
            )}
          </div>
        </div>
        
        {statusConfig?.showDismiss && (
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors duration-200"
            aria-label="Dismiss notification"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatusBanner;