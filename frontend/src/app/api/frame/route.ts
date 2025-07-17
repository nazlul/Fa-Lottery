import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    type: "frame",
    version: "vNext",
    image: "https://sunday-bonanza.vercel.app/banner.png",
    title: "Sunday Bonanza Lottery",
    description: "Buy tickets, draw every Sunday 12am UTC on Base",
    buttons: [
      {
        label: "Buy 0.001 ETH",
        action: { type: "post", url: "https://sunday-bonanza.vercel.app/api/buy?amount=0.001" }
      },
      {
        label: "Check Pot",
        action: { type: "post", url: "https://sunday-bonanza.vercel.app/api/pot" }
      }
    ]
  })
}
