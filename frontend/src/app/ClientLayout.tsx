"use client"
import * as React from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { base } from 'wagmi/chains'

const config = getDefaultConfig({
  appName: 'Lottery App',
  projectId: 'e73ee6546e6d10f2e99727b741662df8',
  chains: [base],
  transports: {
    [base.id]: http('https://mainnet.base.org')
  }
})

const queryClient = new QueryClient()

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
