export const metadata = {
  title: "Sunday Bonanza Frame",
  description: "Weekly draw on Base",
  openGraph: {
    images: ["https://sunday-bonanza.vercel.app/banner.png"]
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://sunday-bonanza.vercel.app/banner.png",
    "fc:frame:button:1": "Buy Tickets",
    "fc:frame:button:1:action": "post",
    "fc:frame:post_url": "https://sunday-bonanza.vercel.app/api/frame"
  }
};

export default function FramePage() {
  return null; 
}
