import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedNavigation = ({ userRole = 'student', className = "" }) => {
  const [quickActions, setQuickActions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    loadQuickActions();
  }, [userRole]);

  const loadQuickActions = () => {
    const roleBasedActions = {
      student: [
        { id: 1, label: 'Join Live Class', icon: 'Video', action: 'join-live', urgent: true },
        { id: 2, label: 'Submit Assignment', icon: 'Upload', action: 'submit-assignment', urgent: false },
        { id: 3, label: 'Download Materials', icon: 'Download', action: 'download-materials', urgent: false },
        { id: 4, label: 'Ask Question', icon: 'MessageCircle', action: 'ask-question', urgent: false }
      ],
      instructor: [
        { id: 1, label: 'Start Live Class', icon: 'Video', action: 'start-live', urgent: true },
        { id: 2, label: 'Upload Content', icon: 'Upload', action: 'upload-content', urgent: false },
        { id: 3, label: 'Grade Assignments', icon: 'CheckSquare', action: 'grade-assignments', urgent: false },
        { id: 4, label: 'View Analytics', icon: 'BarChart3', action: 'view-analytics', urgent: false }
      ],
      admin: [
        { id: 1, label: 'System Status', icon: 'Activity', action: 'system-status', urgent: true },
        { id: 2, label: 'Manage Users', icon: 'Users', action: 'manage-users', urgent: false },
        { id: 3, label: 'Content Review', icon: 'Eye', action: 'content-review', urgent: false },
        { id: 4, label: 'Reports', icon: 'FileText', action: 'reports', urgent: false }
      ]
    };

    setQuickActions(roleBasedActions?.[userRole] || roleBasedActions?.student);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'join-live':
        // Navigate to live class
        window.location.href = '/live-class';
        break;
      case 'submit-assignment':
        // Navigate to assignments
        window.location.href = '/assignments';
        break;
      case 'download-materials':
        // Open download manager
        console.log('Opening download manager');
        break;
      case 'ask-question':
        // Open Q&A section
        window.location.href = '/questions';
        break;
      case 'start-live':
        // Start instructor live session
        window.location.href = '/instructor/live';
        break;
      case 'upload-content':
        // Navigate to content upload
        window.location.href = '/instructor/upload';
        break;
      case 'grade-assignments':
        // Navigate to grading interface
        window.location.href = '/instructor/grading';
        break;
      case 'view-analytics':
        // Navigate to analytics dashboard
        window.location.href = '/instructor/analytics';
        break;
      case 'system-status':
        // Navigate to system monitoring
        window.location.href = '/admin/system';
        break;
      case 'manage-users':
        // Navigate to user management
        window.location.href = '/admin/users';
        break;
      case 'content-review':
        // Navigate to content moderation
        window.location.href = '/admin/content';
        break;
      case 'reports':
        // Navigate to reports
        window.location.href = '/admin/reports';
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const getRoleDisplayName = () => {
    const roleNames = {
      student: 'Student',
      instructor: 'Instructor',
      admin: 'Administrator'
    };
    return roleNames?.[userRole] || 'User';
  };

  const getRoleColor = () => {
    const roleColors = {
      student: 'text-primary',
      instructor: 'text-accent',
      admin: 'text-warning'
    };
    return roleColors?.[userRole] || 'text-primary';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      {/* Role Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getRoleColor()?.replace('text-', 'bg-')}`}></div>
          <span className="text-sm font-medium text-foreground">{getRoleDisplayName()} Dashboard</span>
        </div>
        <Icon name="User" size={16} className={getRoleColor()} />
      </div>
      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Quick Actions
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant={action?.urgent ? "default" : "outline"}
              size="sm"
              onClick={() => handleQuickAction(action?.action)}
              className={`justify-start h-auto p-3 ${action?.urgent ? 'ring-2 ring-primary/20' : ''}`}
            >
              <div className="flex items-center space-x-2 w-full">
                <Icon 
                  name={action?.icon} 
                  size={16} 
                  className={action?.urgent ? 'text-primary-foreground' : 'text-muted-foreground'} 
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium">{action?.label}</span>
                  {action?.urgent && (
                    <span className="text-xs opacity-75">Available now</span>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Role-Specific Information */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Current session</span>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedNavigation;