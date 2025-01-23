'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function isValidUrl(url: string): boolean {
  try {
    const _ = new URL(url); // Avoid side effects from 'new'
    return true;
  } catch {
    return false;
  }
}

export default function UrlInput(): JSX.Element {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (error) setError('');

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    const encodedUrl = encodeURIComponent(url);
    router.push(`/chat/${encodedUrl}`);
  };

  return (
    <div className="bg-neutral-950 border border-neutral-700 w-[92vw] max-w-md mx-auto rounded-md p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            aria-invalid={Boolean(error)}
            className={`w-full border px-4 py-2 rounded bg-neutral-200 placeholder:text-neutral-400 ${
              error ? 'border-red-500' : 'border-neutral-400'
            }`}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="Enter URL (e.g., https://example.com)"
            type="text"
            value={url}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {error}
            </p>
          )}
        </div>
        <button
          className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
          type="submit"
        >
          Start Chat
        </button>
      </form>
    </div>
  );
}
