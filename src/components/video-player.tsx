"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Video } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Play, Pause, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  video: Video;
  isSubscribed: boolean;
  onUnlock: () => void;
}

export function VideoPlayer({ video, isSubscribed, onUnlock }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const isLocked = video.isPremium && !isSubscribed;

  const togglePlay = useCallback(() => {
    if (isLocked) return;
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play().catch(console.error);
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  }, [isLocked]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isLocked) {
            videoRef.current?.play().catch(() => {
              // Autoplay was prevented.
              setIsPlaying(false);
            });
            setIsPlaying(true);
          }
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isLocked]);

  return (
    <section
      ref={containerRef}
      className="relative h-full w-full snap-start flex items-center justify-center bg-black"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={isLocked ? '' : video.src}
        poster={video.poster}
        className={cn(
          'w-full h-full object-cover',
          isLocked && 'blur-md brightness-50'
        )}
        loop
        muted
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <div className="absolute bottom-6 left-6 text-white text-shadow p-2 rounded-lg bg-black/30">
        <h2 className="text-xl font-bold">{video.title}</h2>
        <p className="text-sm">by {video.uploader}</p>
      </div>

      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
          <Lock className="h-16 w-16 text-white mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Premium Content</h3>
          <p className="text-white/80 mb-6">Subscribe to unlock this exclusive video.</p>
          <Button onClick={(e) => { e.stopPropagation(); onUnlock(); }} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Lock className="mr-2 h-4 w-4" />
            Unlock Now
          </Button>
        </div>
      )}

      {!isLocked && (
        <div 
            className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            isPlaying && !showControls ? "opacity-0" : "opacity-100"
            )}
        >
            <button
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="p-4 bg-black/40 rounded-full text-white"
                onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                }}
            >
                {isPlaying ? <Pause size={48} /> : <Play size={48} />}
            </button>
        </div>
      )}
    </section>
  );
}
