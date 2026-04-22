import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DownloadManager = ({ lecture, isOpen, onClose }) => {
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    available: 0,
    total: 0
  });
  const [downloadOptions, setDownloadOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [downloadProgress, setDownloadProgress] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkStorageInfo();
      loadDownloadOptions();
    }
  }, [isOpen, lecture]);

  const checkStorageInfo = async () => {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage?.estimate();
        setStorageInfo({
          used: estimate?.usage || 0,
          available: (estimate?.quota || 0) - (estimate?.usage || 0),
          total: estimate?.quota || 0
        });
      }
    } catch (error) {
      console.error('Storage estimation failed:', error);
    }
  };

  const loadDownloadOptions = () => {
    const options = [
      {
        id: 'video_480p',
        type: 'video',
        label: '480p Video',
        description: 'Standard quality video',
        size: 45.2 * 1024 * 1024, // 45.2 MB
        bandwidth: '~500KB/s',
        isRecommended: true,
        icon: 'Video'
      },
      {
        id: 'video_360p',
        type: 'video',
        label: '360p Video',
        description: 'Lower quality, smaller file',
        size: 28.7 * 1024 * 1024, // 28.7 MB
        bandwidth: '~300KB/s',
        isRecommended: false,
        icon: 'Video'
      },
      {
        id: 'video_240p',
        type: 'video',
        label: '240p Video',
        description: 'Minimal quality for slow connections',
        size: 15.3 * 1024 * 1024, // 15.3 MB
        bandwidth: '~150KB/s',
        isRecommended: false,
        icon: 'Video'
      },
      {
        id: 'audio_only',
        type: 'audio',
        label: 'Audio Only',
        description: 'Audio track only, perfect for revision',
        size: 8.5 * 1024 * 1024, // 8.5 MB
        bandwidth: '~50KB/s',
        isRecommended: true,
        icon: 'Headphones'
      },
      {
        id: 'slides',
        type: 'document',
        label: 'Lecture Slides',
        description: 'PDF slides with notes',
        size: 2.1 * 1024 * 1024, // 2.1 MB
        bandwidth: 'Instant',
        isRecommended: true,
        icon: 'Presentation'
      },
      {
        id: 'transcript',
        type: 'document',
        label: 'Transcript',
        description: 'Full text transcript',
        size: 0.3 * 1024 * 1024, // 0.3 MB
        bandwidth: 'Instant',
        isRecommended: true,
        icon: 'FileText'
      },
      {
        id: 'notes',
        type: 'document',
        label: 'Study Notes',
        description: 'Supplementary study materials',
        size: 1.8 * 1024 * 1024, // 1.8 MB
        bandwidth: 'Instant',
        isRecommended: false,
        icon: 'BookOpen'
      }
    ];

    setDownloadOptions(options);
    
    // Pre-select recommended options
    const recommended = new Set(
      options.filter(opt => opt.isRecommended).map(opt => opt.id)
    );
    setSelectedOptions(recommended);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(1)) + ' ' + sizes?.[i];
  };

  const getTotalSize = () => {
    return downloadOptions?.filter(option => selectedOptions?.has(option?.id))?.reduce((total, option) => total + option?.size, 0);
  };

  const getEstimatedTime = () => {
    const totalSize = getTotalSize();
    const avgSpeed = 200 * 1024; // 200 KB/s average
    const timeInSeconds = totalSize / avgSpeed;
    const minutes = Math.ceil(timeInSeconds / 60);
    return minutes;
  };

  const toggleOption = (optionId) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected?.has(optionId)) {
      newSelected?.delete(optionId);
    } else {
      newSelected?.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const startDownload = async () => {
    if (selectedOptions?.size === 0) return;

    setIsDownloading(true);
    const selectedItems = downloadOptions?.filter(opt => selectedOptions?.has(opt?.id));

    for (const item of selectedItems) {
      setDownloadProgress(prev => ({ ...prev, [item?.id]: 0 }));
      
      // Simulate download progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setDownloadProgress(prev => ({ ...prev, [item?.id]: progress }));
      }
    }

    setIsDownloading(false);
    
    // Show success message
    setTimeout(() => {
      setDownloadProgress({});
    }, 2000);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'text-primary';
      case 'audio':
        return 'text-accent';
      case 'document':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeBgColor = (type) => {
    switch (type) {
      case 'video':
        return 'bg-primary/10';
      case 'audio':
        return 'bg-accent/10';
      case 'document':
        return 'bg-warning/10';
      default:
        return 'bg-muted';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Download" size={24} className="text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Download Content</h2>
              <p className="text-sm text-muted-foreground">{lecture?.title}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Storage Info */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Device Storage</span>
            <span className="text-sm text-muted-foreground">
              {formatBytes(storageInfo?.used)} / {formatBytes(storageInfo?.total)}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${storageInfo?.total > 0 ? (storageInfo?.used / storageInfo?.total) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{formatBytes(storageInfo?.available)} available</span>
            <span>Selected: {formatBytes(getTotalSize())}</span>
          </div>
        </div>

        {/* Download Options */}
        <div className="flex-1 overflow-y-auto max-h-96">
          <div className="p-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Select Content to Download</h3>
            
            <div className="space-y-3">
              {downloadOptions?.map((option) => (
                <div
                  key={option?.id}
                  className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                    selectedOptions?.has(option?.id)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => toggleOption(option?.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeBgColor(option?.type)}`}>
                        <Icon name={option?.icon} size={20} className={getTypeColor(option?.type)} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-foreground">{option?.label}</h4>
                          {option?.isRecommended && (
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{formatBytes(option?.size)}</span>
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            selectedOptions?.has(option?.id)
                              ? 'border-primary bg-primary' :'border-muted-foreground'
                          }`}>
                            {selectedOptions?.has(option?.id) && (
                              <Icon name="Check" size={12} color="white" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2">{option?.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Bandwidth: {option?.bandwidth}
                        </span>
                        
                        {downloadProgress?.[option?.id] !== undefined && (
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-muted rounded-full h-1">
                              <div 
                                className="bg-primary h-1 rounded-full transition-all duration-200"
                                style={{ width: `${downloadProgress?.[option?.id]}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {downloadProgress?.[option?.id]}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">
              <div className="text-foreground font-medium">
                {selectedOptions?.size} items selected
              </div>
              <div className="text-muted-foreground text-xs">
                Total size: {formatBytes(getTotalSize())} • Est. time: ~{getEstimatedTime()} min
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {getTotalSize() > storageInfo?.available && (
                <div className="flex items-center space-x-1 text-xs text-destructive">
                  <Icon name="AlertTriangle" size={12} />
                  <span>Not enough space</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onClose} disabled={isDownloading}>
              Cancel
            </Button>
            
            <Button
              variant="default"
              onClick={startDownload}
              disabled={selectedOptions?.size === 0 || isDownloading || getTotalSize() > storageInfo?.available}
              loading={isDownloading}
            >
              <Icon name="Download" size={16} className="mr-2" />
              {isDownloading ? 'Downloading...' : 'Start Download'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadManager;