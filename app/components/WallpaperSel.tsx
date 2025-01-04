import { FC, useState } from "react";
import wallpaper1 from "@/public/wallpaper-white.jpg";
import wallpaper2 from "@/public/wallpaper2.jpg";
import wallpaper3 from "@/public/wallpaper3.jpg";
import wallpaper4 from "@/public/wallpaper4.jpg";
import wallpaper5 from "@/public/wallpaper5.jpg";

interface WallpaperSelectorProps {
  onSelectWallpaper: (wallpaper: string) => void;
  closeWindow: () => void;
}

const wallpapers = [
  { id: 1, src: wallpaper1.src, alt: "White Wallpaper" },
  { id: 2, src: wallpaper2.src, alt: "Dark Wallpaper" },
  { id: 3, src: wallpaper3.src, alt: "Nature Wallpaper" },
  { id: 4, src: wallpaper4.src, alt: "Mountain Wallpaper" },
  { id: 5, src: wallpaper5.src, alt: "Beach Wallpaper" }
];

const Loader: FC = () => (
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
);

const WallpaperSelector: FC<WallpaperSelectorProps> = ({ onSelectWallpaper, closeWindow }) => {
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>(
    Object.fromEntries(wallpapers.map(w => [w.id, true]))
  );

  const handleImageLoad = (id: number) => {
    setLoadingStates(prev => ({
      ...prev,
      [id]: false
    }));
  };

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-gray-100/70 dark:bg-gray-800/80 shadow-lg rounded-lg w-[90%] sm:w-[60%] z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black dark:text-white">Select Wallpaper</h3>
        <button 
          onClick={closeWindow}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {wallpapers.map((wallpaper) => (
          <div
            key={wallpaper.id}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-md aspect-video"
            onClick={() => onSelectWallpaper(wallpaper.src)}
          >
            <img
              src={wallpaper.src}
              alt={wallpaper.alt}
              className={`w-full h-full object-cover rounded-lg transition-all duration-300 transform hover:scale-105 ${
                loadingStates[wallpaper.id] ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => handleImageLoad(wallpaper.id)}
            />
            {loadingStates[wallpaper.id] ? (
              <Loader />
            ) : (
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/50 to-transparent text-white text-center opacity-100">
                {wallpaper.alt}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WallpaperSelector;
