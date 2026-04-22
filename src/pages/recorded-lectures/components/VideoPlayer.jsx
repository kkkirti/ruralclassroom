import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ lecture, onProgressUpdate, onBookmarkAdd }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isAudioOnly, setIsAudioOnly] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const qualityOptions = [
    { value: 'auto', label: 'Auto', bandwidth: 'Adaptive' },
    { value: '480p', label: '480p', bandwidth: '~500KB/s' },
    { value: '360p', label: '360p', bandwidth: '~300KB/s' },
    { value: '240p', label: '240p', bandwidth: '~150KB/s' },
    { value: 'audio', label: 'Audio Only', bandwidth: '~50KB/s' }
  ];

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video?.currentTime);
      onProgressUpdate?.(video?.currentTime, video?.duration);
    };

    const handleLoadedMetadata = () => {
      setDuration(video?.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onProgressUpdate?.(video?.duration, video?.duration);
    };

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('loadedmetadata', handleLoadedMetadata);
    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video?.removeEventListener('ended', handleEnded);
    };
  }, [onProgressUpdate]);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (video?.paused) {
      video?.play();
      setIsPlaying(true);
    } else {
      video?.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    video.currentTime = pos * video?.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
  };

  const toggleAudioOnly = () => {
    setIsAudioOnly(!isAudioOnly);
    if (!isAudioOnly) {
      setQuality('audio');
    } else {
      setQuality('auto');
    }
  };

  const addBookmark = () => {
    onBookmarkAdd?.({
      time: currentTime,
      title: `Bookmark at ${formatTime(currentTime)}`,
      timestamp: new Date()?.toISOString()
    });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-black rounded-lg overflow-hidden relative group">
      {/* Video Element */}
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${isAudioOnly ? 'opacity-0' : 'opacity-100'}`}
          src={lecture?.videoUrl}
          poster={lecture?.thumbnail}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        />
        
        {/* Audio Only Overlay */}
        {isAudioOnly && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <div className="text-center text-white">
              <Icon name="Headphones" size={64} className="mx-auto mb-4 opacity-60" />
              <h3 className="text-lg font-medium mb-2">{lecture?.title}</h3>
              <p className="text-sm opacity-80">Audio Only Mode</p>
              <div className="mt-4 px-4 py-2 bg-black/30 rounded-full text-xs">
                Saving ~80% bandwidth
              </div>
            </div>
          </div>
        )}

        {/* Play/Pause Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          {!isPlaying && (
            <div className="bg-black/50 rounded-full p-4 transition-opacity duration-200">
              <Icon name="Play" size={32} color="white" />
            </div>
          )}
        </div>

        {/* Quality Badge */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {quality === 'auto' ? 'Auto' : quality}
        </div>

        {/* Bandwidth Indicator */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Good Connection</span>
        </div>
      </div>
      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div 
              className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-white/80 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </Button>

              <div className="flex items-center space-x-2">
                <Icon name="Volume2" size={16} color="white" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/20 rounded-full"
                />
              </div>

              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={addBookmark}
                className="text-white hover:bg-white/20"
                title="Add Bookmark"
              >
                <Icon name="Bookmark" size={16} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAudioOnly}
                className={`text-white hover:bg-white/20 ${isAudioOnly ? 'bg-primary/50' : ''}`}
                title="Audio Only Mode"
              >
                <Icon name="Headphones" size={16} />
              </Button>

              {/* Speed Control */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 text-xs"
                >
                  {playbackRate}x
                </Button>
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col space-y-1">
                    {playbackSpeeds?.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changePlaybackRate(speed)}
                        className={`px-2 py-1 text-xs rounded ${
                          playbackRate === speed ? 'bg-primary text-white' : 'text-white/80 hover:bg-white/20'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quality Control */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 text-xs"
                >
                  <Icon name="Settings" size={16} />
                </Button>
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity min-w-32">
                  <div className="flex flex-col space-y-1">
                    {qualityOptions?.map((option) => (
                      <button
                        key={option?.value}
                        onClick={() => setQuality(option?.value)}
                        className={`px-2 py-1 text-xs rounded text-left ${
                          quality === option?.value ? 'bg-primary text-white' : 'text-white/80 hover:bg-white/20'
                        }`}
                      >
                        <div>{option?.label}</div>
                        <div className="text-xs opacity-60">{option?.bandwidth}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;