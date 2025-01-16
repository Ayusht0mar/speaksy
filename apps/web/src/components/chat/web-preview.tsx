'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

export default function WebPreview({ params }: { params: { url: string } }) {
  const [decodedUrl, setDecodedUrl] = useState('');
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);

  useEffect(() => {
    const validateAndCheck = async (): Promise<void> => {
      try {
        const url = decodeURIComponent(params.url);
        const validatedUrl = new URL(url); // Validate URL
        setDecodedUrl(validatedUrl.href);

        // Await the Promise returned by checkXFrameOptions
        await checkXFrameOptions(validatedUrl.href);
      } catch (error) {
        notFound();
      }
    };

    // Call the async function
    validateAndCheck().catch();
  }, [params.url]);

  interface CheckIframeResponse {
    canEmbed: boolean;
  }

  const checkXFrameOptions = async (url: string): Promise<void> => {
    try {
      const response = await fetch(`/api/checkiframe?url=${encodeURIComponent(url)}`);
      const data: CheckIframeResponse = await response.json();
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
        <p className="text-center text-lg">Getting Preview...</p>
      </div>
    );
  }

  if (canEmbed) {
    return (
      <iframe
        src={decodedUrl}
        className="w-full h-full border-0"
        title="Website Content"
        sandbox="allow-scripts allow-same-origin"
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-center text-lg">This website doesn&apos;t allow preview.</p>
    </div>
  );
}
