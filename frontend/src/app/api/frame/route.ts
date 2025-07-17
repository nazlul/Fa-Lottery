import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  return NextResponse.json({
    image: "https://sunday-bonanza.vercel.app/banner.png",
    buttons: [
      {
        label: "Open dApp",
        action: "link",
        target: "https://sunday-bonanza.vercel.app"
      }
    ]
  })
}
