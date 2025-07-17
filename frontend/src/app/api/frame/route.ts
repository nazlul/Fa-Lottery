import { NextRequest, NextResponse } from 'next/server';
import { validateFrameRequest, createFrameResponse } from './../../lib/frame-utils';
import { FRAME_BASE_URL } from './../../lib/config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const frameMessage = await validateFrameRequest(body);
    
    if (!frameMessage) {
      return NextResponse.json({ error: 'Invalid frame message' }, { status: 400 });
    }

    const { buttonIndex, inputText } = body.untrustedData;
    
    switch (buttonIndex) {
      case 1:
        return createFrameResponse({
          image: `${FRAME_BASE_URL}/api/image/lottery-info`,
          buttons: [
            { label: 'Open Lottery App', action: 'link', target: `${FRAME_BASE_URL}/lottery` }
          ]
        });
        
      case 2:
        return createFrameResponse({
          image: `${FRAME_BASE_URL}/api/image/ticket-purchased`,
          buttons: [
            { label: 'Buy More', action: 'post' },
            { label: 'View App', action: 'link', target: `${FRAME_BASE_URL}/lottery` }
          ]
        });
        
      default:
        return createFrameResponse({
          image: `${FRAME_BASE_URL}/api/image/lottery-info`,
          buttons: [
            { label: 'View Lottery', action: 'link', target: `${FRAME_BASE_URL}/lottery` },
            { label: 'Buy Tickets', action: 'post' }
          ]
        });
    }
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return createFrameResponse({
    image: `${FRAME_BASE_URL}/api/image/lottery-info`,
    buttons: [
      { label: 'View Lottery', action: 'link', target: `${FRAME_BASE_URL}/lottery` },
      { label: 'Buy Tickets', action: 'post' }
    ]
  });
}