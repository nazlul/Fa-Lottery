import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { CONTRACT_ADDRESS } from './../../../lib/config';
import { ethers } from 'ethers';
import LotteryABI from '../../../../../abi/Lottery.json';

export async function GET(request: NextRequest) {
  try {
    const provider = new ethers.JsonRpcProvider('https://mainnet.base.org');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, LotteryABI.abi, provider);
    
    const [totalETH, nextDraw] = await Promise.all([
      contract.totalETH(),
      contract.nextDrawTime()
    ]);
    
    const potAmount = parseFloat(ethers.formatEther(totalETH)).toFixed(4);
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = Number(nextDraw) - now;
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const timeUntilDraw = `${days}d ${hours}h`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#17101f',
            color: '#8A63D2',
            fontFamily: 'system-ui',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '60px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(138, 99, 210, 0.3)',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                margin: '0 0 20px 0',
                background: 'linear-gradient(45deg, #8A63D2, #b6b612)',
                backgroundClip: 'text',
                color: 'transparent',
                textTransform: 'uppercase',
              }}
            >
              Sunday Bonanza
            </h1>
            <div
              style={{
                fontSize: '36px',
                margin: '20px 0',
                fontWeight: '600',
              }}
            >
              Prize Pool: {potAmount} ETH
            </div>
            <div
              style={{
                fontSize: '24px',
                margin: '10px 0',
                opacity: 0.8,
              }}
            >
              Next Draw: {timeUntilDraw}
            </div>
            <div
              style={{
                fontSize: '18px',
                margin: '20px 0 0 0',
                opacity: 0.7,
              }}
            >
              🥇 50% • 🥈 20% • 🥉 15% • 4th 5% • 5th 5%
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating lottery info image:', error);
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#17101f',
            color: '#8A63D2',
            fontSize: '48px',
            fontFamily: 'system-ui',
          }}
        >
          Sunday Bonanza Lottery
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}