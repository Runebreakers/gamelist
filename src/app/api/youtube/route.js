import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')
    
    const apiKey = process.env.YOUTUBE_API_KEY

    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      title + " official game trailer"
    )}&key=${apiKey}&maxResults=1&type=video`
  )

    const data = await res.json()

    return NextResponse.json(data)

}