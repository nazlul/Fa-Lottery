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
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Sunday Bonanza Lottery" />
        <meta property="og:description" content="Buy tickets, draw every Sunday 12am UTC on Base" />
        <meta property="og:image" content="https://sunday-bonanza.vercel.app/banner.png" />
        <meta property="og:url" content="https://sunday-bonanza.vercel.app" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sunday Bonanza Lottery" />
        <meta name="twitter:description" content="Buy tickets, draw every Sunday 12am UTC on Base" />
        <meta name="twitter:image" content="https://sunday-bonanza.vercel.app/banner.png" />

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
