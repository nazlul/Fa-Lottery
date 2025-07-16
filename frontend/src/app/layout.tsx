import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import * as React from "react"
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

export const metadata = {
  title: "Sunday Bonanza Lottery",
  description: "Buy tickets, draw every Sunday 12am UTC on Base",
  openGraph: {
    title: "Sunday Bonanza Lottery",
    description: "Buy tickets, draw every Sunday 12am UTC on Base",
    url: "https://sunday-bonanza.vercel.app",
    images: ["https://sunday-bonanza.vercel.app/banner.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunday Bonanza Lottery",
    description: "Buy tickets, draw every Sunday 12am UTC on Base",
    images: ["https://sunday-bonanza.vercel.app/banner.png"]
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://sunday-bonanza.vercel.app/banner.png",
    "fc:frame:button:1": "Buy Tickets",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://sunday-bonanza.vercel.app"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
