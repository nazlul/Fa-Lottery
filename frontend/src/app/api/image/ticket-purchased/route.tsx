import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tickets = searchParams.get('tickets') || '1';
  const amount = searchParams.get('amount') || '0.001';

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
            background: 'rgba(34, 197, 94, 0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '2px solid #22c55e',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              margin: '0 0 20px 0',
            }}
          >
            🎉
          </div>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              color: '#22c55e',
            }}
          >
            Tickets Purchased!
          </h1>
          <div
            style={{
              fontSize: '36px',
              margin: '20px 0',
              color: '#8A63D2',
            }}
          >
            {tickets} Ticket{tickets !== '1' ? 's' : ''} • {amount} ETH
          </div>
          <div
            style={{
              fontSize: '24px',
              margin: '10px 0',
              opacity: 0.8,
              color: '#8A63D2',
            }}
          >
            Good luck in the Sunday draw!
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