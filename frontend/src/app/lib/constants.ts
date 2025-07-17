export const CONTRACT_ADDRESS = "0x92cE9853F943106EeeA5b29fC9b4888b1fA989bD";
export const FRAME_BASE_URL = process.env.NEXT_PUBLIC_FRAME_BASE_URL || 'http://localhost:3000';

export const SUPPORTED_CHAINS = {
  BASE: 8453,
} as const;

export const FRAME_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_FRAME_BASE_URL || '',
  VERSION: 'vNext',
} as const;