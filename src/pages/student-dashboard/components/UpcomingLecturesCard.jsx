import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingLecturesCard = () => {
  const [upcomingLectures] = useState([
    {
      id: 1,
      subject: "Advanced AI & Machine Learning",
      instructor: "Dr. Priya Sharma",
      scheduledTime: "2025-09-10T20:00:00",
      duration: "90 minutes",
      connectionRequired: "Low bandwidth optimized",
      isLive: false,
      participantCount: 45,
      maxParticipants: 60
    },
    {
      id: 2,
      subject: "VLSI Design Fundamentals",
      instructor: "Prof. Rajesh Kumar",
      scheduledTime: "2025-09-11T14:30:00",
      duration: "120 minutes",
      connectionRequired: "Audio-first delivery",
      isLive: true,
      participantCount: 32,
      maxParticipants: 50
    },
    {
      id: 3,
      subject: "Renewable Energy Systems",
      instructor: "Dr. Anita Verma",
      scheduledTime: "2025-09-11T16:00:00",
      duration: "75 minutes",
      connectionRequired: "Compressed video available",
      isLive: false,
      participantCount: 28,
      maxParticipants: 40
    }
  ]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return 'Tomorrow';
    } else {
      return date?.toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short' 
      });
    }
  };

  const handleJoinLecture = (lectureId) => {
    console.log(`Joining lecture ${lectureId}`);
    // Navigate to live lecture interface
  };

  const handleSetReminder = (lectureId) => {
    console.log(`Setting reminder for lecture ${lectureId}`);
    // Set notification reminder
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Upcoming Lectures</h2>
            <p className="text-sm text-muted-foreground">Join live sessions or set reminders</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {upcomingLectures?.map((lecture) => (
          <div key={lecture?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {lecture?.subject}
                  </h3>
                  {lecture?.isLive && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      <div className="w-1.5 h-1.5 bg-success rounded-full mr-1 animate-pulse"></div>
                      Live Now
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  by {lecture?.instructor}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{formatDate(lecture?.scheduledTime)} at {formatTime(lecture?.scheduledTime)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Timer" size={12} />
                    <span>{lecture?.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2 ml-4">
                {lecture?.isLive ? (
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => handleJoinLecture(lecture?.id)}
                    className="bg-success hover:bg-success/90"
                  >
                    <Icon name="Video" size={14} className="mr-1" />
                    Join Now
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSetReminder(lecture?.id)}
                  >
                    <Icon name="Bell" size={14} className="mr-1" />
                    Remind Me
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Users" size={12} />
                  <span>{lecture?.participantCount}/{lecture?.maxParticipants}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-success">
                  <Icon name="Wifi" size={12} />
                  <span>{lecture?.connectionRequired}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icon name="Bookmark" size={12} />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icon name="Share2" size={12} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>All lectures are optimized for low bandwidth connections. Audio quality is prioritized.</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingLecturesCard;