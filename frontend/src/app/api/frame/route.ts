import { NextResponse } from "next/server"

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="Sunday Bonanza Lottery" />
        <meta property="og:description" content="Buy tickets, draw every Sunday 12am UTC on Base" />
        <meta property="og:image" content="https://sunday-bonanza.vercel.app/banner.png" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://sunday-bonanza.vercel.app/banner.png" />
        <meta name="fc:frame:button:1" content="Buy Tickets" />
        <meta name="fc:frame:button:1:action" content="tx" />
        <meta name="fc:frame:button:1:target" content="https://sunday-bonanza.vercel.app/api/frame/buy" />
      </head>
      <body></body>
    </html>
  `

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html"
    }
  })
}
