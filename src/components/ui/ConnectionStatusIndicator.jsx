import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ConnectionStatusIndicator = ({ className = "" }) => {
  const [connectionStatus, setConnectionStatus] = useState('online');
  const [bandwidth, setBandwidth] = useState('high');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const updateConnectionStatus = () => {
      if (navigator.onLine) {
        // Simulate bandwidth detection
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
          const effectiveType = connection?.effectiveType;
          if (effectiveType === '4g') {
            setBandwidth('high');
          } else if (effectiveType === '3g') {
            setBandwidth('medium');
          } else {
            setBandwidth('low');
          }
        }
        setConnectionStatus('online');
      } else {
        setConnectionStatus('offline');
        setBandwidth('none');
      }
    };

    updateConnectionStatus();
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);

    return () => {
      window.removeEventListener('online', updateConnectionStatus);
      window.removeEventListener('offline', updateConnectionStatus);
    };
  }, []);

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'offline':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          icon: 'WifiOff',
          label: 'Offline',
          description: 'No internet connection'
        };
      case 'online':
        switch (bandwidth) {
          case 'high':
            return {
              color: 'text-success',
              bgColor: 'bg-success/10',
              icon: 'Wifi',
              label: 'Online',
              description: 'High speed connection'
            };
          case 'medium':
            return {
              color: 'text-warning',
              bgColor: 'bg-warning/10',
              icon: 'Wifi',
              label: 'Online',
              description: 'Medium speed connection'
            };
          case 'low':
            return {
              color: 'text-warning',
              bgColor: 'bg-warning/10',
              icon: 'Wifi',
              label: 'Online',
              description: 'Low speed connection'
            };
          default:
            return {
              color: 'text-success',
              bgColor: 'bg-success/10',
              icon: 'Wifi',
              label: 'Online',
              description: 'Connected'
            };
        }
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'Loader',
          label: 'Checking...',
          description: 'Checking connection'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`relative ${className}`}>
      {/* Mobile/Compact View */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${statusConfig?.bgColor} ${statusConfig?.color}`}
        >
          <div className={`w-2 h-2 rounded-full ${connectionStatus === 'online' ? 'animate-pulse' : ''}`} 
               style={{ backgroundColor: 'currentColor' }}></div>
          <Icon name={statusConfig?.icon} size={12} />
        </button>
        
        {isExpanded && (
          <div className="absolute top-full right-0 mt-1 p-3 bg-popover border border-border rounded-lg shadow-lg z-200 min-w-48">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={statusConfig?.icon} size={16} className={statusConfig?.color} />
              <span className={`text-sm font-medium ${statusConfig?.color}`}>{statusConfig?.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">{statusConfig?.description}</p>
            {connectionStatus === 'online' && (
              <div className="mt-2 text-xs text-muted-foreground">
                <div>Quality: {bandwidth?.charAt(0)?.toUpperCase() + bandwidth?.slice(1)}</div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Desktop/Expanded View */}
      <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200"
           style={{ backgroundColor: statusConfig?.bgColor?.replace('bg-', '')?.replace('/10', '') + '1a', color: statusConfig?.color?.replace('text-', '') }}>
        <div className={`w-2 h-2 rounded-full ${connectionStatus === 'online' ? 'animate-pulse' : ''}`} 
             style={{ backgroundColor: 'currentColor' }}></div>
        <Icon name={statusConfig?.icon} size={14} />
        <span>{statusConfig?.label}</span>
        {connectionStatus === 'online' && bandwidth !== 'high' && (
          <span className="text-xs opacity-75">({bandwidth})</span>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatusIndicator;