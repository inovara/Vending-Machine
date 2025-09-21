import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';
import Spinner from './Spinner';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title }) => {
  const { t, isRTL } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
    };
    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const handleLoadedData = () => {
      setIsLoading(false);
    };
    const handleLoadStart = () => {
      setIsLoading(true);
    };
    const handleVolumeChange = () => {
      setIsMuted(video.muted);
    };
    const handleCanPlay = () => {
      setIsLoading(false);
    };
    const handleWaiting = () => {
      setIsLoading(true);
    };

    // Add all event listeners
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);

    // Set initial states
    setIsPlaying(!video.paused);
    setIsMuted(video.muted);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
    };
  }, [videoUrl, isOpen]);

  // Auto-play when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      const video = videoRef.current;
      
      // Set video to muted for autoplay (browser requirement)
      video.muted = true;
      setIsMuted(true);
      
      // Set initial playing state
      setIsPlaying(!video.paused);
      
      // Attempt to play the video
      const playVideo = async () => {
        try {
          await video.play();
          setIsPlaying(true);
        } catch {
          // Autoplay failed - user interaction required, continue silently
          setIsPlaying(false);
        }
      };
      
      // Small delay to ensure video is ready
      const timer = setTimeout(playVideo, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setProgress(0);
      setIsLoading(true);
      setIsMuted(false);
      
      // Pause and reset video when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  // Sync state with video element periodically to ensure consistency
  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const syncInterval = setInterval(() => {
      const video = videoRef.current;
      if (video) {
        setIsPlaying(!video.paused);
        setIsMuted(video.muted);
        if (video.duration) {
          setProgress((video.currentTime / video.duration) * 100);
        }
      }
    }, 100);

    return () => clearInterval(syncInterval);
  }, [isOpen]);

  // Handle click outside modal to close
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  // Handle touch events for better mobile experience
  const handleTouchStart = (event: React.TouchEvent) => {
    event.stopPropagation();
  };

  // Handle double tap to play/pause on mobile
  const handleVideoDoubleClick = () => {
    togglePlay();
  };

  // Handle video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {
          // Handle play error silently
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      videoRef.current.play().catch(() => {
        // Handle play error silently
      });
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = clickX / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  if (!isOpen || !videoUrl) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full h-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} sm:top-4 ${isRTL ? 'sm:left-4' : 'sm:right-4'} z-10 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30 touch-manipulation`}
          aria-label={t('videoModal.close')}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Video Container */}
        <div 
          className="relative w-full h-full bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl"
          onTouchStart={handleTouchStart}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls={false}
            preload="auto"
            playsInline
            muted
            poster=""
            webkit-playsinline="true"
            onDoubleClick={handleVideoDoubleClick}
            style={{ 
              maxHeight: 'calc(100vh - 4rem)', 
              maxWidth: '100%',
              touchAction: 'manipulation'
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            <track kind="captions" src="" srcLang="en" label="English" />
            {t('videoModal.notSupported')}
          </video>

          {/* Custom Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4 md:p-6">
            <div className={`flex items-center justify-between gap-2 sm:gap-3 md:gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30 touch-manipulation active:scale-95"
                aria-label={t('videoModal.playPause')}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                ) : (
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                )}
              </button>

              {/* Video Title */}
              {title && (
                <div className="flex-1 px-2 sm:px-3 md:px-4 min-w-0">
                  <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base truncate">
                    {title}
                  </h3>
                </div>
              )}

              {/* Control Buttons */}
              <div className={`flex items-center gap-1 sm:gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Restart Button */}
                <button
                  onClick={restartVideo}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30 touch-manipulation active:scale-95"
                  aria-label={t('videoModal.restart')}
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30 touch-manipulation active:scale-95"
                  aria-label={t('videoModal.muteUnmute')}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  )}
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30 touch-manipulation active:scale-95"
                  aria-label={t('videoModal.fullscreen')}
                >
                  <Maximize className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2 sm:mt-3 md:mt-4">
              <div 
                className="w-full h-2 sm:h-3 md:h-4 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-3 sm:hover:h-4 md:hover:h-5 transition-all duration-300 touch-manipulation"
                onClick={handleProgressClick}
                role="progressbar"
                aria-label="Video progress"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const syntheticEvent = {
                      clientX: 0,
                      currentTarget: e.currentTarget
                    } as React.MouseEvent<HTMLDivElement>;
                    handleProgressClick(syntheticEvent);
                  }
                }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full transition-all duration-300 relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Progress indicator dot */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg border-2 border-inovara-primary"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center transition-opacity duration-300">
              <Spinner
                size="2xl"
                color="white"
                showText={true}
                className="text-white"
              />
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default VideoModal;
