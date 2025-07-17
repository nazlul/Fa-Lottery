'use client';

import { useState, useEffect } from 'react';
import { FRAME_BASE_URL } from '../app/lib/config';

interface FrameImageProps {
  type: 'lottery-info' | 'ticket-purchased' | 'draw-results';
  params?: Record<string, string>;
  className?: string;
}

export default function FrameImage({ type, params = {}, className = '' }: FrameImageProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(params);
    const url = `${FRAME_BASE_URL}/api/image/${type}?${queryParams.toString()}`;
    setImageUrl(url);
    setLoading(false);
  }, [type, params]);

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-300 rounded-lg ${className}`}>
        <div className="w-full h-full bg-gray-400 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageUrl}
        alt="Frame Preview"
        className="w-full h-full object-cover rounded-lg"
        onLoad={() => setLoading(false)}
      />
      <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
        Frame Preview
      </div>
    </div>
  );
}