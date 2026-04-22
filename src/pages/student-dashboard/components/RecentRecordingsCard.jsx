import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentRecordingsCard = () => {
  const [recentRecordings] = useState([
    {
      id: 1,
      title: "Introduction to Neural Networks",
      instructor: "Dr. Priya Sharma",
      subject: "AI & Machine Learning",
      duration: "85 minutes",
      recordedDate: "2025-09-08",
      fileSize: "45.2 MB",
      downloadSize: "12.8 MB",
      quality: "Audio-optimized",
      viewCount: 156,
      isDownloaded: false,
      progress: 0,
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop"
    },
    {
      id: 2,
      title: "CMOS Technology Basics",
      instructor: "Prof. Rajesh Kumar",
      subject: "VLSI Design",
      duration: "92 minutes",
      recordedDate: "2025-09-07",
      fileSize: "38.7 MB",
      downloadSize: "10.5 MB",
      quality: "Compressed video",
      viewCount: 203,
      isDownloaded: true,
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop"
    },
    {
      id: 3,
      title: "Solar Panel Efficiency Analysis",
      instructor: "Dr. Anita Verma",
      subject: "Renewable Energy",
      duration: "78 minutes",
      recordedDate: "2025-09-06",
      fileSize: "42.1 MB",
      downloadSize: "11.9 MB",
      quality: "Audio-first",
      viewCount: 134,
      isDownloaded: false,
      progress: 25,
      thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=225&fit=crop"
    }
  ]);

  const [downloadingIds, setDownloadingIds] = useState([]);

  const handlePlayRecording = (recordingId) => {
    console.log(`Playing recording ${recordingId}`);
    window.location.href = '/recorded-lectures';
  };

  const handleDownloadRecording = (recordingId) => {
    setDownloadingIds(prev => [...prev, recordingId]);
    
    // Simulate download process
    setTimeout(() => {
      setDownloadingIds(prev => prev?.filter(id => id !== recordingId));
      console.log(`Downloaded recording ${recordingId}`);
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return 'bg-muted';
    if (progress < 30) return 'bg-error';
    if (progress < 70) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Video" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recent Recordings</h2>
            <p className="text-sm text-muted-foreground">Download for offline viewing</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="FolderOpen" size={16} className="mr-2" />
          Library
        </Button>
      </div>
      <div className="space-y-4">
        {recentRecordings?.map((recording) => (
          <div key={recording?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex items-start space-x-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-20 h-12 bg-muted rounded-md overflow-hidden relative">
                <img 
                  src={recording?.thumbnail} 
                  alt={recording?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Icon name="Play" size={16} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate mb-1">
                      {recording?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      {recording?.subject} • by {recording?.instructor}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={10} />
                        <span>{recording?.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={10} />
                        <span>{formatDate(recording?.recordedDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={10} />
                        <span>{recording?.viewCount} views</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {recording?.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{recording?.progress}% complete</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(recording?.progress)}`}
                        style={{ width: `${recording?.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* File Size and Quality Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="HardDrive" size={10} />
                      <span>Full: {recording?.fileSize}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Download" size={10} />
                      <span>Compressed: {recording?.downloadSize}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-primary">
                      <Icon name="Zap" size={10} />
                      <span>{recording?.quality}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePlayRecording(recording?.id)}
                    >
                      <Icon name="Play" size={14} className="mr-1" />
                      Play
                    </Button>
                    
                    {recording?.isDownloaded ? (
                      <Button variant="outline" size="sm" disabled>
                        <Icon name="CheckCircle" size={14} className="mr-1 text-success" />
                        Downloaded
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadRecording(recording?.id)}
                        disabled={downloadingIds?.includes(recording?.id)}
                      >
                        {downloadingIds?.includes(recording?.id) ? (
                          <>
                            <Icon name="Loader" size={14} className="mr-1 animate-spin" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Icon name="Download" size={14} className="mr-1" />
                            Download
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">Data Saving Tip</p>
            <p className="text-muted-foreground text-xs">
              Download compressed versions to save up to 70% data. Audio quality remains high for better learning experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentRecordingsCard;