'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
console.log('Project ID:', process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID);
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not defined');
}

export const config = getDefaultConfig({
  appName: 'Farcaster Lottery',
  projectId: projectId || '',
  chains: [base],
  ssr: true,
});

export const CONTRACT_ADDRESS = "0x92cE9853F943106EeeA5b29fC9b4888b1fA989bD";