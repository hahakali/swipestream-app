export interface Video {
  id: string;
  src: string;
  poster: string;
  title: string;
  uploader: string;
  isPremium: boolean;
}

export const videos: Video[] = [
  {
    id: '1',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
    title: 'For Bigger Fun',
    uploader: 'Blender Foundation',
    isPremium: false,
  },
  {
    id: '2',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    title: 'Elephant\'s Dream (Premium)',
    uploader: 'Blender Foundation',
    isPremium: true,
  },
  {
    id: '3',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    title: 'For Bigger Blazes',
    uploader: 'Blender Foundation',
    isPremium: false,
  },
    {
    id: '4',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    title: 'For Bigger Escapes (Premium)',
    uploader: 'Google',
    isPremium: true,
  },
  {
    id: '5',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    title: 'For Bigger Joyrides',
    uploader: 'Google',
    isPremium: false,
  },
];
