import { Header } from '@/components/header';
import VideoFeed from '@/components/video-feed';

export default function Home() {
  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-black">
      <Header />
      <VideoFeed />
    </div>
  );
}
