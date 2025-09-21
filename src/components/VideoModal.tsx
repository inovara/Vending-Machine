import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

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

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const handleLoadedData = () => setIsLoading(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoUrl]);

  // Auto-play when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      const video = videoRef.current;
      
      // Set video to muted for autoplay (browser requirement)
      video.muted = true;
      setIsMuted(true);
      
      // Attempt to play the video
      const playVideo = async () => {
        try {
          await video.play();
          setIsPlaying(true);
        } catch {
          // Autoplay failed - user interaction required, continue silently
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
      
      // Pause and reset video when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  // Handle click outside modal to close
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  // Handle video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
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
      videoRef.current.play();
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full h-full max-w-7xl max-h-[90vh] mx-4 ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30`}
          aria-label={t('videoModal.close')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Container */}
        <div className="relative w-full h-full bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls={false}
            preload="auto"
            playsInline
            muted
            poster=""
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          >
            <source src={videoUrl} type="video/mp4" />
            <track kind="captions" src="" srcLang="en" label="English" />
            {t('videoModal.notSupported')}
          </video>

          {/* Custom Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6">
            <div className={`flex items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                aria-label={t('videoModal.playPause')}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </button>

              {/* Video Title */}
              {title && (
                <div className="flex-1 px-2 sm:px-4">
                  <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                    {title}
                  </h3>
                </div>
              )}

              {/* Control Buttons */}
              <div className={`flex items-center gap-2 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Restart Button */}
                <button
                  onClick={restartVideo}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                  aria-label={t('videoModal.restart')}
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                  aria-label={t('videoModal.muteUnmute')}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30"
                  aria-label={t('videoModal.fullscreen')}
                >
                  <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 sm:mt-4">
              <div 
                className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all duration-300"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-gradient-to-r from-inovara-primary to-inovara-secondary rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity duration-300">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
              <div className="text-white text-sm font-medium">
                {t('videoModal.loading')}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default VideoModal;
