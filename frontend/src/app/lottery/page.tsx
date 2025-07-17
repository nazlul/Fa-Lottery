import LotteryGame from './../../components/LotteryGame';
import LotteryStats from '../../components/LotteryStats';
import FrameImage from '../../components/FrameImage';
import { Metadata } from 'next';
import { FRAME_BASE_URL } from './../lib/config';

export const metadata: Metadata = {
  title: 'Sunday Bonanza - Farcaster Lottery',
  description: 'Join the weekly lottery on Farcaster with ETH prizes',
  openGraph: {
    title: 'Sunday Bonanza - Farcaster Lottery',
    description: 'Join the weekly lottery on Farcaster with ETH prizes',
    images: [`${FRAME_BASE_URL}/api/image/lottery-info`],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${FRAME_BASE_URL}/api/image/lottery-info`,
    'fc:frame:button:1': 'Buy Tickets',
    'fc:frame:button:1:action': 'post',
    'fc:frame:button:2': 'View Stats',
    'fc:frame:button:2:action': 'link',
    'fc:frame:button:2:target': `${FRAME_BASE_URL}/lottery`,
    'fc:frame:post_url': `${FRAME_BASE_URL}/api/frame`,
  },
};

export default function LotteryPage() {
  return (
    <div className="min-h-screen bg-[#17101f]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-[#8A63D2] mb-4">
            Sunday Bonanza Lottery
          </h1>
          <p className="text-center text-gray-300 text-lg">
            Weekly lottery on Farcaster with ETH prizes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <LotteryGame />
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#8A63D2] mb-4">
                Lottery Statistics
              </h2>
              <LotteryStats />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-[#8A63D2] mb-4">
                Frame Preview
              </h2>
              <FrameImage
                type="lottery-info"
                className="w-full h-64"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-[#8A63D2]/20 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[#8A63D2] mb-4">
              How it Works
            </h3>
            <div className="text-gray-300 space-y-2">
              <p>• Buy tickets for 0.001 ETH each (max 100 per wallet)</p>
              <p>• Weekly draws every Sunday at 12:00 AM UTC</p>
              <p>• 5 winners selected automatically via Chainlink Keepers</p>
              <p>• Prizes distributed: 50%, 20%, 15%, 5%, 5%</p>
              <p>• 5% goes to house for operations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}