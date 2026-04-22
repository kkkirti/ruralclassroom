import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [studentData] = useState({
    name: "Priya Patel",
    studentId: "RC2025001",
    course: "Diploma in Electronics & Communication",
    semester: "5th Semester",
    college: "Rural Technical Institute, Rajkot",
    lastLogin: "2025-09-10T08:30:00"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatTime = () => {
    return currentTime?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = () => {
    return currentTime?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatLastLogin = () => {
    const lastLogin = new Date(studentData.lastLogin);
    const now = new Date();
    const diffHours = Math.floor((now - lastLogin) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor((now - lastLogin) / (1000 * 60));
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* Welcome Content */}
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            {/* Profile Avatar */}
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full text-primary-foreground text-xl font-semibold">
              {studentData?.name?.split(' ')?.map(n => n?.[0])?.join('')}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {getGreeting()}, {studentData?.name?.split(' ')?.[0]}!
              </h1>
              <p className="text-muted-foreground text-sm mb-2">
                Welcome back to your learning dashboard
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={12} />
                  <span>{studentData?.studentId}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>Last login: {formatLastLogin()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={14} className="text-primary" />
                <span className="text-muted-foreground">Course:</span>
                <span className="text-foreground font-medium">{studentData?.course}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-accent" />
                <span className="text-muted-foreground">Semester:</span>
                <span className="text-foreground font-medium">{studentData?.semester}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} className="text-success" />
                <span className="text-muted-foreground">College:</span>
                <span className="text-foreground font-medium">{studentData?.college}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time and Quick Actions */}
        <div className="mt-6 lg:mt-0 lg:ml-8 flex flex-col items-end space-y-4">
          {/* Current Time */}
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{formatTime()}</div>
            <div className="text-sm text-muted-foreground">{formatDate()}</div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Calendar" size={16} className="mr-2" />
              Schedule
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Video" size={16} className="mr-2" />
              Join Live Class
            </Button>
          </div>
        </div>
      </div>
      {/* Today's Highlights */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Today's Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <Icon name="Video" size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Live Lecture</p>
              <p className="text-xs text-muted-foreground">AI & ML at 8:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-lg">
              <Icon name="FileText" size={16} className="text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Assignment Due</p>
              <p className="text-xs text-muted-foreground">VLSI Project in 2 days</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg">
              <Icon name="Download" size={16} className="text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">New Content</p>
              <p className="text-xs text-muted-foreground">3 recordings available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;