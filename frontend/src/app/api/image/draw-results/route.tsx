import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const winner = searchParams.get('winner') || 'Anonymous';
  const prize = searchParams.get('prize') || '0.1';

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
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '2px solid #ffd700',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              margin: '0 0 20px 0',
            }}
          >
            🏆
          </div>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              color: '#ffd700',
            }}
          >
            WINNER!
          </h1>
          <div
            style={{
              fontSize: '36px',
              margin: '20px 0',
              color: '#8A63D2',
            }}
          >
            {winner.slice(0, 6)}...{winner.slice(-4)}
          </div>
          <div
            style={{
              fontSize: '32px',
              margin: '10px 0',
              color: '#ffd700',
              fontWeight: 'bold',
            }}
          >
            Won {prize} ETH
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}