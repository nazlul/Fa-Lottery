import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Web3Providers } from '../components/Web3Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Farcaster Lottery - Sunday Bonanza',
  description: 'Weekly lottery on Farcaster with ETH prizes',
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_FRAME_BASE_URL}/api/image/lottery-info`,
    'fc:frame:button:1': 'View Lottery',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': `${process.env.NEXT_PUBLIC_FRAME_BASE_URL}/lottery`,
    'fc:frame:button:2': 'Buy Tickets',
    'fc:frame:button:2:action': 'post',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_FRAME_BASE_URL}/api/frame`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Providers>
          {children}
        </Web3Providers>
      </body>
    </html>
  );
}