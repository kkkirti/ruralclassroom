import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const OfflineContentManager = ({ isOpen = false, onClose, className = "" }) => {
  const [storageInfo, setStorageInfo] = useState({
    used: 0,
    available: 0,
    total: 0
  });
  const [downloadQueue, setDownloadQueue] = useState([]);
  const [cachedContent, setCachedContent] = useState([]);

  useEffect(() => {
    if (isOpen) {
      checkStorageInfo();
      loadCachedContent();
    }
  }, [isOpen]);

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

  const loadCachedContent = () => {
    // Simulate cached content data
    const mockCachedContent = [
      {
        id: 1,
        title: 'Introduction to Mathematics',
        type: 'video',
        size: 45.2,
        downloadDate: '2025-09-08',
        duration: '1h 15m'
      },
      {
        id: 2,
        title: 'Physics Fundamentals',
        type: 'video',
        size: 38.7,
        downloadDate: '2025-09-07',
        duration: '58m'
      },
      {
        id: 3,
        title: 'Chemistry Lab Notes',
        type: 'document',
        size: 2.1,
        downloadDate: '2025-09-06',
        duration: null
      }
    ];
    setCachedContent(mockCachedContent);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(1)) + ' ' + sizes?.[i];
  };

  const handleRemoveContent = (contentId) => {
    setCachedContent(prev => prev?.filter(item => item?.id !== contentId));
  };

  const handleClearAll = () => {
    setCachedContent([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/50">
      <div className={`bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Download" size={24} className="text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Offline Content</h2>
              <p className="text-sm text-muted-foreground">Manage downloaded lectures and materials</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Storage Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Storage Usage</span>
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
          <p className="text-xs text-muted-foreground mt-2">
            {formatBytes(storageInfo?.available)} available
          </p>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto max-h-96">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">Downloaded Content</h3>
              {cachedContent?.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearAll}
                  className="text-destructive hover:text-destructive"
                >
                  <Icon name="Trash2" size={14} className="mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            {cachedContent?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Download" size={48} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No offline content available</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Download lectures to access them without internet
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cachedContent?.map((item) => (
                  <div key={item?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Icon 
                          name={item?.type === 'video' ? 'Video' : 'FileText'} 
                          size={20} 
                          className="text-primary" 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item?.title}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{formatBytes(item?.size * 1024 * 1024)}</span>
                          {item?.duration && (
                            <>
                              <span>•</span>
                              <span>{item?.duration}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>Downloaded {item?.downloadDate}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveContent(item?.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Offline content syncs when connected
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button variant="default">
                <Icon name="Download" size={16} className="mr-2" />
                Download More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineContentManager;