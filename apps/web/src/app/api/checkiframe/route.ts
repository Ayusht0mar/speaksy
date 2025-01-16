import { NextResponse } from 'next/server'

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, { method: 'HEAD' })
    const xFrameOptions = response.headers.get('X-Frame-Options')
    const contentSecurityPolicy = response.headers.get('Content-Security-Policy')

    const canEmbed = !(xFrameOptions?.toLowerCase().includes('deny') || 
                       xFrameOptions?.toLowerCase().includes('sameorigin') ||
                       contentSecurityPolicy?.toLowerCase().includes('frame-ancestors'))

    return NextResponse.json({ canEmbed })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check URL' }, { status: 500 })
  }

}

