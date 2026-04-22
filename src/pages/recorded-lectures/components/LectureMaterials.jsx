import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LectureMaterials = ({ materials, currentTime, onTimestampClick }) => {
  const [activeTab, setActiveTab] = useState('slides');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'slides', label: 'Slides', icon: 'Presentation', count: materials?.slides?.length || 0 },
    { id: 'notes', label: 'Notes', icon: 'FileText', count: materials?.notes?.length || 0 },
    { id: 'documents', label: 'Documents', icon: 'Download', count: materials?.documents?.length || 0 },
    { id: 'transcript', label: 'Transcript', icon: 'MessageSquare', count: 1 }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(1)) + ' ' + sizes?.[i];
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const isCurrentSlide = (slideTime) => {
    return currentTime >= slideTime && currentTime < slideTime + 30; // 30 second window
  };

  const filteredTranscript = materials?.transcript?.filter(item =>
    item?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  ) || [];

  const renderSlides = () => (
    <div className="space-y-4">
      {materials?.slides?.map((slide, index) => (
        <div
          key={slide?.id}
          className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
            isCurrentSlide(slide?.timestamp) 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onClick={() => onTimestampClick(slide?.timestamp)}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-12 bg-muted rounded border overflow-hidden">
                <img
                  src={slide?.thumbnail}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground truncate">
                  Slide {index + 1}: {slide?.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{formatTime(slide?.timestamp)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {slide?.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  {slide?.isOfflineAvailable && (
                    <div className="flex items-center space-x-1 text-xs text-success">
                      <Icon name="Download" size={12} />
                      <span>Offline</span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Icon name="ExternalLink" size={12} className="mr-1" />
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      )) || (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Presentation" size={32} className="mx-auto mb-2 opacity-50" />
          <p>No slides available</p>
        </div>
      )}
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-4">
      {materials?.notes?.map((note) => (
        <div
          key={note?.id}
          className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => onTimestampClick(note?.timestamp)}
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-medium text-foreground">{note?.title}</h4>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>{formatTime(note?.timestamp)}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{note?.content}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="User" size={12} />
              <span>{note?.author}</span>
            </div>
            {note?.isOfflineAvailable && (
              <div className="flex items-center space-x-1 text-xs text-success">
                <Icon name="Download" size={12} />
                <span>Offline</span>
              </div>
            )}
          </div>
        </div>
      )) || (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="FileText" size={32} className="mx-auto mb-2 opacity-50" />
          <p>No notes available</p>
        </div>
      )}
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-3">
      {materials?.documents?.map((doc) => (
        <div
          key={doc?.id}
          className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {doc?.name}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{doc?.type?.toUpperCase()}</span>
                  <span>•</span>
                  <span>{formatFileSize(doc?.size)}</span>
                  {doc?.isOfflineAvailable && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="Download" size={12} />
                        <span>Downloaded</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Icon name="Eye" size={14} className="mr-1" />
                View
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Download" size={14} className="mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>
      )) || (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Download" size={32} className="mx-auto mb-2 opacity-50" />
          <p>No documents available</p>
        </div>
      )}
    </div>
  );

  const renderTranscript = () => (
    <div className="space-y-4">
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search transcript..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {(searchQuery ? filteredTranscript : materials?.transcript)?.map((item) => (
          <div
            key={item?.id}
            className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => onTimestampClick(item?.timestamp)}
          >
            <div className="flex items-start justify-between mb-1">
              <span className="text-xs text-primary font-medium">
                {formatTime(item?.timestamp)}
              </span>
              {searchQuery && (
                <Icon name="Search" size={12} className="text-muted-foreground" />
              )}
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {item?.text}
            </p>
          </div>
        )) || (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="MessageSquare" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No transcript available</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'slides':
        return renderSlides();
      case 'notes':
        return renderNotes();
      case 'documents':
        return renderDocuments();
      case 'transcript':
        return renderTranscript();
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.count > 0 && (
                <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full text-xs">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default LectureMaterials;