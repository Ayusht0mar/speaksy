'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

export default function WebPreview({ params }: { params: { url: string } }) {
  const [decodedUrl, setDecodedUrl] = useState('');
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);

  useEffect(() => {
    const validateAndCheck = async (): Promise<void> => {
      try {
        const decoded = decodeURIComponent(params.url); 
        const validatedUrl = new URL(decoded);
        setDecodedUrl(validatedUrl.href);

        await checkXFrameOptions(validatedUrl.href);
      } catch (error) {
        notFound();
      }
    };

    void validateAndCheck(); // Properly handled async function
  }, [params.url]);

  interface CheckIframeResponse {
    canEmbed: boolean;
  }

  const checkXFrameOptions = async (url: string): Promise<void> => {
    try {
      const response = await fetch(`/api/checkiframe?url=${encodeURIComponent(url)}`);
      const data = (await response.json()) as CheckIframeResponse; // Explicit type
      setCanEmbed(data.canEmbed);
    } catch (error) {
      setCanEmbed(false);
    }
  };

  if (!decodedUrl) {
    return null; // Render nothing if URL is not decoded yet
  }

  if (canEmbed === null) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-lg text-white">Getting Preview...</p>
      </div>
    );
  }

  if (canEmbed) {
    return (
      <iframe
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        src={decodedUrl}
        title="Website Content"
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-center text-lg text-white">This website doesn&apos;t allow preview. <br /> But you can ask questions</p>
    </div>
  );
}
