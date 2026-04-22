import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedLectures = ({ currentLecture, onLectureSelect, className = "" }) => {
  const relatedLectures = [
    {
      id: 'rl-1',
      title: 'Advanced Neural Networks',
      instructor: 'Dr. Priya Sharma',
      duration: 3420, // 57 minutes
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop',
      subject: 'Artificial Intelligence',
      difficulty: 'Advanced',
      views: 1250,
      rating: 4.8,
      isNew: false,
      hasQuiz: true,
      isOfflineAvailable: true,
      completionRate: 0,
      fileSize: 52.3,
      uploadDate: '2025-09-05'
    },
    {
      id: 'rl-2',
      title: 'Deep Learning Fundamentals',
      instructor: 'Prof. Rajesh Kumar',
      duration: 2880, // 48 minutes
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
      subject: 'Artificial Intelligence',
      difficulty: 'Intermediate',
      views: 2100,
      rating: 4.9,
      isNew: true,
      hasQuiz: true,
      isOfflineAvailable: false,
      completionRate: 0,
      fileSize: 43.7,
      uploadDate: '2025-09-08'
    },
    {
      id: 'rl-3',
      title: 'Computer Vision Applications',
      instructor: 'Dr. Anita Desai',
      duration: 3600, // 60 minutes
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop',
      subject: 'Artificial Intelligence',
      difficulty: 'Advanced',
      views: 890,
      rating: 4.7,
      isNew: false,
      hasQuiz: false,
      isOfflineAvailable: true,
      completionRate: 25,
      fileSize: 58.9,
      uploadDate: '2025-09-03'
    },
    {
      id: 'rl-4',
      title: 'Machine Learning Algorithms',
      instructor: 'Prof. Suresh Patel',
      duration: 2700, // 45 minutes
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      subject: 'Artificial Intelligence',
      difficulty: 'Intermediate',
      views: 3200,
      rating: 4.6,
      isNew: false,
      hasQuiz: true,
      isOfflineAvailable: true,
      completionRate: 80,
      fileSize: 39.2,
      uploadDate: '2025-08-28'
    }
  ];

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatFileSize = (sizeMB) => {
    if (sizeMB >= 1024) {
      return `${(sizeMB / 1024)?.toFixed(1)}GB`;
    }
    return `${sizeMB}MB`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-success';
      case 'intermediate':
        return 'text-warning';
      case 'advanced':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProgressColor = (rate) => {
    if (rate === 0) return 'bg-muted';
    if (rate < 50) return 'bg-warning';
    if (rate < 100) return 'bg-primary';
    return 'bg-success';
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Related Lectures</h3>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="TrendingUp" size={12} />
            <span>Based on your interests</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {relatedLectures?.map((lecture) => (
            <div
              key={lecture?.id}
              className="group border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-200 cursor-pointer"
              onClick={() => onLectureSelect(lecture)}
            >
              <div className="flex space-x-4">
                {/* Thumbnail */}
                <div className="flex-shrink-0 relative">
                  <div className="w-24 h-16 bg-muted rounded overflow-hidden">
                    <img
                      src={lecture?.thumbnail}
                      alt={lecture?.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                    {formatDuration(lecture?.duration)}
                  </div>

                  {/* New Badge */}
                  {lecture?.isNew && (
                    <div className="absolute -top-1 -left-1 bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs font-medium">
                      New
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {lecture?.title}
                    </h4>
                    <div className="flex items-center space-x-1 ml-2">
                      {lecture?.hasQuiz && (
                        <Icon name="HelpCircle" size={12} className="text-primary" title="Has Quiz" />
                      )}
                      {lecture?.isOfflineAvailable && (
                        <Icon name="Download" size={12} className="text-success" title="Available Offline" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                    <Icon name="User" size={12} />
                    <span>{lecture?.instructor}</span>
                    <span>•</span>
                    <span className={getDifficultyColor(lecture?.difficulty)}>
                      {lecture?.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{lecture?.views?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-warning fill-current" />
                        <span>{lecture?.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="HardDrive" size={12} />
                        <span>{formatFileSize(lecture?.fileSize)}</span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Play" size={14} className="mr-1" />
                      Watch
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  {lecture?.completionRate > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{lecture?.completionRate}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all duration-300 ${getProgressColor(lecture?.completionRate)}`}
                          style={{ width: `${lecture?.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">
            <Icon name="MoreHorizontal" size={16} className="mr-2" />
            View More Related Lectures
          </Button>
        </div>

        {/* Recommendation Info */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Personalized Recommendations</p>
              <p>These lectures are suggested based on your current subject ({currentLecture?.subject}), viewing history, and learning progress. Completing related lectures helps build comprehensive understanding of the topic.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedLectures;