import { NextResponse } from 'next/server'
import { ethers } from 'ethers'
import LotteryABI from '../../../../abi/Lottery.json'

export async function POST() {
  const provider = new ethers.JsonRpcProvider("https://mainnet.base.org")
  const contract = new ethers.Contract("0x92cE9853F943106EeeA5b29fC9b4888b1fA989bD", LotteryABI.abi, provider)
  const bal = await contract.totalETH()
  return NextResponse.json({ pot: ethers.formatEther(bal) })
}
