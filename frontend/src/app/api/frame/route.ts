import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({
    image: "https://sunday-bonanza.vercel.app/banner.png",
    buttons: [
      {
        label: "Buy Tickets",
        action: "link",
        target: "https://sunday-bonanza.vercel.app"
      }
    ]
  });
}
