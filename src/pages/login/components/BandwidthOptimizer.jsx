import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const BandwidthOptimizer = ({ onOptimizationChange, className = "" }) => {
  const [optimizationLevel, setOptimizationLevel] = useState('auto');
  const [estimatedBandwidth, setEstimatedBandwidth] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const detectBandwidth = async () => {
    try {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (connection) {
        const downlink = connection?.downlink; // Mbps
        setEstimatedBandwidth(downlink);
        
        let level = 'auto';
        if (downlink < 0.5) {
          level = 'ultra-low';
        } else if (downlink < 1) {
          level = 'low';
        } else if (downlink < 2) {
          level = 'medium';
        } else {
          level = 'high';
        }
        
        setOptimizationLevel(level);
        
        if (onOptimizationChange) {
          onOptimizationChange(level, downlink);
        }
      } else {
        // Fallback bandwidth test
        performBandwidthTest();
      }
    } catch (error) {
      console.error('Bandwidth detection failed:', error);
      setOptimizationLevel('low'); // Safe fallback
    }
  };

  useEffect(() => {
    detectBandwidth();
    const interval = setInterval(detectBandwidth, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const performBandwidthTest = async () => {
    setIsOptimizing(true);
    
    try {
      const startTime = performance.now();
      const response = await fetch('/favicon.ico?' + Math.random(), {
        cache: 'no-cache'
      });
      const endTime = performance.now();
      
      if (response?.ok) {
        const duration = endTime - startTime;
        const bytes = parseInt(response?.headers?.get('content-length') || '1024');
        const bitsPerSecond = (bytes * 8) / (duration / 1000);
        const mbps = bitsPerSecond / (1024 * 1024);
        
        setEstimatedBandwidth(mbps);
        
        let level = 'medium';
        if (mbps < 0.1) {
          level = 'ultra-low';
        } else if (mbps < 0.5) {
          level = 'low';
        } else if (mbps < 2) {
          level = 'medium';
        } else {
          level = 'high';
        }
        
        setOptimizationLevel(level);
        
        if (onOptimizationChange) {
          onOptimizationChange(level, mbps);
        }
      }
    } catch (error) {
      console.error('Bandwidth test failed:', error);
      setOptimizationLevel('low');
    } finally {
      setIsOptimizing(false);
    }
  };

  const getOptimizationConfig = () => {
    switch (optimizationLevel) {
      case 'ultra-low':
        return {
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          icon: 'Zap',
          label: 'Ultra Low Bandwidth',
          description: 'Maximum compression active',
          features: ['Text-only mode', 'Minimal images', 'Audio compression']
        };
      case 'low':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'Zap',
          label: 'Low Bandwidth',
          description: 'High compression active',
          features: ['Compressed images', 'Reduced quality', 'Offline priority']
        };
      case 'medium':
        return {
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          icon: 'Zap',
          label: 'Medium Bandwidth',
          description: 'Balanced optimization',
          features: ['Standard quality', 'Smart caching', 'Progressive loading']
        };
      case 'high':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'Zap',
          label: 'High Bandwidth',
          description: 'Full features available',
          features: ['HD content', 'Real-time sync', 'Full interactivity']
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/50',
          icon: 'Loader',
          label: 'Auto Optimization',
          description: 'Detecting connection...',
          features: ['Adaptive quality', 'Smart loading']
        };
    }
  };

  const config = getOptimizationConfig();

  return (
    <div className={`${className}`}>
      <div className={`p-3 rounded-lg ${config?.bgColor} border border-border/50`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon 
              name={config?.icon} 
              size={16} 
              className={`${config?.color} ${isOptimizing ? 'animate-pulse' : ''}`} 
            />
            <span className={`text-sm font-medium ${config?.color}`}>
              {config?.label}
            </span>
          </div>
          
          {estimatedBandwidth > 0 && (
            <span className="text-xs text-muted-foreground">
              {estimatedBandwidth?.toFixed(1)} Mbps
            </span>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mb-2">
          {config?.description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {config?.features?.map((feature, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 bg-background/50 rounded text-xs text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
        
        {isOptimizing && (
          <div className="mt-2 flex items-center space-x-2">
            <Icon name="Loader" size={12} className="text-muted-foreground animate-spin" />
            <span className="text-xs text-muted-foreground">Testing connection...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BandwidthOptimizer;