import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import * as React from "react"
import ClientLayout from './ClientLayout'

export const metadata = {
  title: "Sunday Bonanza Lottery",
  description: "Buy tickets, draw every Sunday 12am UTC on Base",
  openGraph: {
    title: "Sunday Bonanza Lottery",
    description: "Buy tickets, draw every Sunday 12am UTC on Base",
    url: "https://sunday-bonanza.vercel.app",
    images: ["https://sunday-bonanza.vercel.app/banner.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunday Bonanza Lottery",
    description: "Buy tickets, draw every Sunday 12am UTC on Base",
    images: ["https://sunday-bonanza.vercel.app/banner.png"]
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://sunday-bonanza.vercel.app/banner.png",
    "fc:frame:button:1": "Buy Tickets",
    "fc:frame:button:1:action": "post",
    "fc:frame:post_url": "https://sunday-bonanza.vercel.app/api/frame"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://sunday-bonanza.vercel.app/banner.png" />
        <meta property="fc:frame:button:1" content="Buy Tickets" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:post_url" content="https://sunday-bonanza.vercel.app/api/frame" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
