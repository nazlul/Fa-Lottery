import { FRAME_BASE_URL } from './../lib/constants';
import { generateFrameHTML } from './../lib/frame-utils';

export default function FramePage() {
  const frameHtml = generateFrameHTML(
    'Sunday Bonanza Lottery',
    'Weekly lottery on Farcaster with ETH prizes',
    `${FRAME_BASE_URL}/api/image/lottery-info`,
    [
      { label: 'View Lottery', action: 'link', target: `${FRAME_BASE_URL}/lottery` },
      { label: 'Buy Tickets', action: 'post' }
    ],
    `${FRAME_BASE_URL}/api/frame`
  );

  return (
    <div dangerouslySetInnerHTML={{ __html: frameHtml }} />
  );
}