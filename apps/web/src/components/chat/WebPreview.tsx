'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'

export default function WebPreview({ params }: { params: { url: string} }) {
    const [decodedUrl, setDecodedUrl] = useState('')  
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const url = decodeURIComponent(params.url)
      new URL(url) // Validate URL
      setDecodedUrl(url)
      checkXFrameOptions(url)
    } catch {
      notFound()
    }
  }, [params.url])

  const checkXFrameOptions = async (url: string) => {
    try {
      const response = await fetch(`/api/checkiframe?url=${encodeURIComponent(url)}`)
      const data = await response.json()
      setCanEmbed(data.canEmbed)
    } catch (error) {
      console.error('Failed to check X-Frame-Options:', error)
      setCanEmbed(false)
    }
  }

  if (!decodedUrl) {
    return null 
  }

  return (
        <div className='w-full h-full'>
         {canEmbed === null ? (
            <div className="flex items-center justify-center h-full">
                <p className="text-center text-lg">
                  Getting Preview...
                </p>
              </div>            ) : canEmbed ? (
              <iframe
                src={decodedUrl}
                className="w-full h-full border-0"
                title="Website Content"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-center text-lg">
                  This website doesn't allow preview.
                </p>
              </div>
            )}
        </div>
  )
}

