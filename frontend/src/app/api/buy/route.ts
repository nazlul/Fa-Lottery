import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function POST() {
  const PRIVATE_KEY = process.env.LOTTERY_SIGNER_KEY!;
  const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  
  const lotteryContract = new ethers.Contract(
    "0xYourLotteryAddress",
    ["function buyTicket() payable"],
    wallet
  );

  try {
    const tx = await lotteryContract.buyTicket({ value: ethers.parseEther("0.001") });
    await tx.wait();

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="https://sunday-bonanza.vercel.app/success.png" />
        </head>
        <body></body>
      </html>
    `;
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });

  } catch (err) {
    console.error(err);

    const errorHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:image" content="https://sunday-bonanza.vercel.app/error.png" />
        </head>
        <body></body>
      </html>
    `;
    return new NextResponse(errorHtml, {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}
