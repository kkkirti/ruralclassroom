import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ConnectionStatusIndicator from '../../../components/ui/ConnectionStatusIndicator';
import OfflineContentManager from '../../../components/ui/OfflineContentManager';

const QuickAccessMenu = () => {
  const [isOfflineManagerOpen, setIsOfflineManagerOpen] = useState(false);
  const [bandwidthUsage] = useState({
    used: 2.4,
    limit: 5.0,
    resetDate: '2025-09-15'
  });

  const [quickActions] = useState([
    {
      id: 1,
      title: "Download Content",
      description: "Save lectures for offline viewing",
      icon: "Download",
      action: "download",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Bandwidth Monitor",
      description: "Track your data usage",
      icon: "Activity",
      action: "bandwidth",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 3,
      title: "Emergency Offline",
      description: "Access cached content",
      icon: "WifiOff",
      action: "offline",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 4,
      title: "Discussion Board",
      description: "Join course discussions",
      icon: "MessageSquare",
      action: "discussion",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      title: "New Assignment Posted",
      message: "AI & ML Assignment 3 due in 2 days",
      time: "5 min ago",
      type: "assignment",
      urgent: true
    },
    {
      id: 2,
      title: "Lecture Recording Available",
      message: "VLSI Design - Session 12 ready for download",
      time: "1 hour ago",
      type: "content",
      urgent: false
    },
    {
      id: 3,
      title: "System Maintenance",
      message: "Scheduled maintenance tonight 11 PM - 1 AM",
      time: "3 hours ago",
      type: "system",
      urgent: false
    }
  ]);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'download':
        setIsOfflineManagerOpen(true);
        break;
      case 'bandwidth': console.log('Opening bandwidth monitor');
        break;
      case 'offline': console.log('Activating emergency offline mode');
        break;
      case 'discussion': console.log('Opening discussion board');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const getBandwidthPercentage = () => {
    return (bandwidthUsage?.used / bandwidthUsage?.limit) * 100;
  };

  const getBandwidthColor = () => {
    const percentage = getBandwidthPercentage();
    if (percentage > 90) return 'text-error';
    if (percentage > 75) return 'text-warning';
    return 'text-success';
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment': return 'FileText';
      case 'content': return 'Video';
      case 'system': return 'Settings';
      default: return 'Bell';
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Connection Status</h3>
          <ConnectionStatusIndicator />
        </div>
        
        <div className="space-y-4">
          {/* Bandwidth Usage */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Data Usage</span>
              <span className={`text-sm font-semibold ${getBandwidthColor()}`}>
                {bandwidthUsage?.used} GB / {bandwidthUsage?.limit} GB
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  getBandwidthPercentage() > 90 ? 'bg-error' : 
                  getBandwidthPercentage() > 75 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${getBandwidthPercentage()}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              Resets on {new Date(bandwidthUsage.resetDate)?.toLocaleDateString('en-IN')}
            </p>
          </div>

          {/* Adaptive Streaming Info */}
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-primary" />
              <div className="text-sm">
                <p className="text-foreground font-medium">Smart Streaming Active</p>
                <p className="text-muted-foreground text-xs">
                  Quality automatically adjusted for your connection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="outline"
              onClick={() => handleQuickAction(action?.action)}
              className="h-auto p-4 justify-start"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${action?.bgColor}`}>
                  <Icon name={action?.icon} size={20} className={action?.color} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{action?.title}</p>
                  <p className="text-xs text-muted-foreground">{action?.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-primary-foreground bg-primary rounded-full">
              {notifications?.filter(n => n?.urgent)?.length}
            </span>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} />
          </Button>
        </div>

        <div className="space-y-3">
          {notifications?.map((notification) => (
            <div 
              key={notification?.id} 
              className={`p-3 rounded-lg border transition-colors duration-200 ${
                notification?.urgent 
                  ? 'bg-primary/5 border-primary/20' :'bg-muted/30 border-border hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  notification?.urgent ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={getNotificationIcon(notification?.type)} 
                    size={14} 
                    className={notification?.urgent ? 'text-primary' : 'text-muted-foreground'} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {notification?.title}
                    </p>
                    {notification?.urgent && (
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse ml-2"></div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {notification?.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification?.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="Bell" size={16} className="mr-2" />
            View All Notifications
          </Button>
        </div>
      </div>
      {/* Offline Content Manager Modal */}
      <OfflineContentManager 
        isOpen={isOfflineManagerOpen}
        onClose={() => setIsOfflineManagerOpen(false)}
      />
    </div>
  );
};

export default QuickAccessMenu;