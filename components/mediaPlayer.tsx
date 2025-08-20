import React, { useState, useRef, useEffect } from "react";

interface MediaPlayerProps {
  url: string;
  title: string;
  className?: string;
}

const MediaPlayer = ({ url, title, className = "" }: MediaPlayerProps) => {
  const [needsReload, setNeedsReload] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = /\.(mp4|webm|ogg)$/i.test(url.split("?")[0]);

  useEffect(() => {
    if (videoRef.current && needsReload) {
      videoRef.current.load();
      setNeedsReload(false);
    }
  }, [needsReload]);

  const handleError = () => {
    // SAS token might be causing issues - try reloading
    setNeedsReload(true);
  };

  if (!isVideo) {
    return (
      <img
        src={url}
        alt={title}
        className="w-full h-full object-cover rounded-lg"
      />
    );
  }

  // Extract clean extension without query params
  const extension =
    url.split(".")[url.split(".").length - 1]?.split("?")[0] || "mp4";

  return (
    <video
      ref={videoRef}
      controls
      className="w-full h-full rounded-lg"
      title={title}
      onError={handleError}
      playsInline
      preload="metadata"
    >
      <source
        src={url}
        type={`video/${extension}`}
        key={needsReload ? "reload" : url} // Force re-render on error
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default MediaPlayer;
