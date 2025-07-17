import Link from 'next/link';
import { FRAME_BASE_URL } from './lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sunday Bonanza - Farcaster Lottery',
  description: 'Weekly lottery on Farcaster with ETH prizes',
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${FRAME_BASE_URL}/api/image/lottery-info`,
    'fc:frame:button:1': 'Enter Lottery',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': `${FRAME_BASE_URL}/lottery`,
    'fc:frame:button:2': 'Buy Tickets',
    'fc:frame:button:2:action': 'post',
    'fc:frame:post_url': `${FRAME_BASE_URL}/api/frame`,
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#17101f] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8A63D2] to-[#b6b612] mb-8">
          Sunday Bonanza
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Weekly lottery on Farcaster with ETH prizes
        </p>
        <Link
          href="/lottery"
          className="bg-[#8A63D2] hover:bg-[#7b55c6] text-white px-8 py-4 rounded-lg font-medium text-lg transition-all hover:scale-105"
        >
          Enter Lottery
        </Link>
      </div>
    </div>
  );
}