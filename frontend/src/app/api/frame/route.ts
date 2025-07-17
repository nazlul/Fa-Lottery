import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Sunday Bonanza</title>
        <meta property="og:title" content="Sunday Bonanza Lottery" />
        <meta property="og:image" content="https://sunday-bonanza.vercel.app/banner.png" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://sunday-bonanza.vercel.app/banner.png" />
        <meta name="fc:frame:button:1" content="Buy 0.001 ETH Ticket" />
        <meta name="fc:frame:post_url" content="https://sunday-bonanza.vercel.app/api/buy" />
      </head>
      <body></body>
    </html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
