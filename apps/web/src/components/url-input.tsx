'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UrlInput(): JSX.Element {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setError('')

    try {
      new URL(url)
    } catch {
      setError('Please enter a valid URL')
      return
    }

    // Encode the URL to make it safe for use in the path
    const encodedUrl = encodeURIComponent(url)
    router.push(`/chat/${encodedUrl}`)
  }

  return (
    <div className='bg-neutral-950 border border-neutral-700 w-[92vw] max-w-md mx-auto rounded-md p-4'>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g., https://example.com)"
            className="w-full border px-4 py-2 rounded bg-neutral-200 placeholder:text-neutral-400"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded">
            Start Chat
        </button>
        </form>
    </div>
  )
}