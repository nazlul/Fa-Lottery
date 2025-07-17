import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sunday Bonanza Lottery",
  description: "Buy tickets, draw every Sunday 12am UTC on Base",
  openGraph: {
    title: "Sunday Bonanza Lottery",
    images: ["https://sunday-bonanza.vercel.app/banner.png"]
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://sunday-bonanza.vercel.app/banner.png",
    "fc:frame:button:1": "Buy 0.001 ETH Ticket",
    "fc:frame:button:1:action": "post",
    "fc:frame:post_url": "https://sunday-bonanza.vercel.app/api/frame"
  }
}

export default function FramePage() {
  return <></>
}
