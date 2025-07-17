import { getFrameMessage } from 'frames.js';
import { FrameRequest, FrameResponse } from '../types';

export async function validateFrameRequest(body: FrameRequest) {
  try {
    const fixedBody = {
      ...body,
      untrustedData: {
        ...body.untrustedData,
        buttonIndex: body.untrustedData.buttonIndex as unknown as import('frames.js').ActionIndex,
      },
    };
    const frameMessage = await getFrameMessage(fixedBody);
    return frameMessage;
  } catch (error) {
    throw new Error('Invalid frame message');
  }
}

export function createFrameResponse(response: FrameResponse): Response {
  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function generateFrameHTML(
  title: string,
  description: string,
  image: string,
  buttons: Array<{ label: string; action?: string; target?: string }>,
  postUrl?: string
): string {
  const buttonTags = buttons.map((button, index) => {
    const action = button.action || 'post';
    const target = button.target ? `<meta property="fc:frame:button:${index + 1}:target" content="${button.target}" />` : '';
    return `
      <meta property="fc:frame:button:${index + 1}" content="${button.label}" />
      <meta property="fc:frame:button:${index + 1}:action" content="${action}" />
      ${target}
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${image}" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        ${buttonTags}
        ${postUrl ? `<meta property="fc:frame:post_url" content="${postUrl}" />` : ''}
      </head>
      <body>
        <h1>${title}</h1>
        <p>${description}</p>
        <img src="${image}" alt="${title}" />
      </body>
    </html>
  `;
}