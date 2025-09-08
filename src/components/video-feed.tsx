"use client";

import { useState } from 'react';
import { videos } from '@/lib/data';
import type { Video } from '@/lib/data';
import { useAuth } from '@/contexts/auth-context';
import { VideoPlayer } from './video-player';
import { SubscriptionModal } from './subscription-modal';

export default function VideoFeed() {
  const { isSubscribed } = useAuth();
  const [modalVideo, setModalVideo] = useState<Video | null>(null);

  const openSubscriptionModal = (video: Video) => {
    setModalVideo(video);
  };

  return (
    <>
      <main className="h-full w-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide">
        {videos.map((video) => (
          <VideoPlayer
            key={video.id}
            video={video}
            isSubscribed={isSubscribed}
            onUnlock={() => openSubscriptionModal(video)}
          />
        ))}
      </main>
      <SubscriptionModal
        video={modalVideo}
        isOpen={!!modalVideo}
        onClose={() => setModalVideo(null)}
      />
    </>
  );
}
