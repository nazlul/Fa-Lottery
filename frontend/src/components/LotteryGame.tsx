'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAccount, useWriteContract, usePublicClient } from 'wagmi';
import { base } from 'wagmi/chains';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CONTRACT_ADDRESS } from '../app/lib/config';
import LotteryABI from '../../abi/Lottery.json';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';
import FarcasterAuth from './FarcasterAuth';

export default function LotteryGame() {
  const [amount, setAmount] = useState(0.001);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [potETH, setPotETH] = useState('0');
  const [showInfo, setShowInfo] = useState(false);
  const [userTickets, setUserTickets] = useState(0);
  const [nextDrawTime, setNextDrawTime] = useState(0);
  const [farcasterUser, setFarcasterUser] = useState<any>(null);
  const infoRef = useRef(null);
  
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchLotteryData = async () => {
      const provider = new ethers.JsonRpcProvider('https://mainnet.base.org');
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LotteryABI.abi, provider);
      
      try {
        const [totalETH, nextDraw, userTicketCount] = await Promise.all([
          contract.totalETH(),
          contract.nextDrawTime(),
          address ? contract.ticketsCount(address) : 0
        ]);
        
        setPotETH(ethers.formatEther(totalETH));
        setNextDrawTime(Number(nextDraw));
        setUserTickets(Number(userTicketCount));
      } catch (error) {
        console.error('Error fetching lottery data:', error);
      }
    };

    fetchLotteryData();
    const interval = setInterval(fetchLotteryData, 10000); 
    
    return () => clearInterval(interval);
  }, [address]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (infoRef.current && !(infoRef.current as any).contains(event.target)) {
        setShowInfo(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBuy = async () => {
    if (!address) return;
    if (amount < 0.001) {
      setStatus('error');
      setMessage('Min is 0.001 ETH');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    setStatus('loading');
    setMessage('');
    
    try {
      const txHash = await writeContractAsync({
        account: address,
        chain: base,
        address: CONTRACT_ADDRESS,
        abi: LotteryABI.abi,
        functionName: 'buyTickets',
        value: BigInt(Math.floor(amount * 1e18))
      });
      
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      setStatus('success');
      setMessage('Transaction confirmed! Tickets purchased.');
      
      const provider = new ethers.JsonRpcProvider('https://mainnet.base.org');
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LotteryABI.abi, provider);
      const [totalETH, userTicketCount] = await Promise.all([
        contract.totalETH(),
        contract.ticketsCount(address)
      ]);
      setPotETH(ethers.formatEther(totalETH));
      setUserTickets(Number(userTicketCount));
      
    } catch (err: any) {
      setStatus('error');
      setMessage(err.shortMessage || 'Transaction failed.');
    }
    
    setTimeout(() => setMessage(''), 5000);
  };

  const formatTimeUntilDraw = () => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = nextDrawTime - now;
    
    if (timeLeft <= 0) return 'Draw in progress...';
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const ticketCount = Math.floor(amount / 0.001);

  return (
    <div className="flex flex-col items-center text-[#8A63D2] justify-center min-h-screen p-6 relative overflow-hidden bg-[#17101f]">
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button 
          onClick={() => setShowInfo(!showInfo)} 
          className="bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition-colors"
        >
          i
        </button>
      </div>

      <div className="absolute top-4 left-4 z-20">
        <FarcasterAuth onAuthSuccess={setFarcasterUser} />
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-4 bg-black/80 text-white backdrop-blur p-4 rounded-2xl shadow-lg w-80 text-left text-sm z-20"
          >
            <div className="mb-2 font-bold text-lg">Weekly Draw Info</div>
            <div className="mb-2">Every Sunday 12:00am UTC</div>
            <div className="mb-2">Next draw: {formatTimeUntilDraw()}</div>
            <div className="mb-2 font-bold">Prize Distribution:</div>
            <div>🥇 1st: 50% of pot</div>
            <div>🥈 2nd: 20% of pot</div>
            <div>🥉 3rd: 15% of pot</div>
            <div>4th: 5% of pot</div>
            <div>5th: 5% of pot</div>
            <div className="mt-3 text-xs text-gray-300">
              * 5% goes to house fees
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 backdrop-blur-md bg-gray-300/20 rounded-xl p-8 w-full max-w-xl text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <ConnectButton.Custom>
            {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
              return (
                <div
                  {...(!mounted && {
                    'aria-hidden': true,
                    style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
                  })}
                >
                  {(!account || !chain) ? (
                    <button
                      onClick={openConnectModal}
                      className="bg-[#8A63D2] hover:bg-[#7b55c6] hover:scale-105 text-white px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      Connect Wallet
                    </button>
                  ) : (
                    <button
                      onClick={openAccountModal}
                      className="bg-[#8A63D2] hover:bg-[#7b55c6] hover:scale-105 text-white px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      {account.displayName}
                    </button>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>

        <h1 className="text-4xl font-bold mb-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#8A63D2] to-[#b6b612]">
          Sunday Bonanza
        </h1>
        
        <p className="mb-6 text-xl text-[#8A63D2]">
          Prize Pool: <span className="font-mono font-bold">{parseFloat(potETH).toFixed(4)} ETH</span>
        </p>

        {address && (
          <div className="mb-4 p-3 bg-[#8A63D2]/20 rounded-lg">
            <p className="text-sm text-[#8A63D2]">
              Your tickets: <span className="font-bold">{userTickets}</span>
            </p>
          </div>
        )}

        <div className="mb-4 text-sm text-[#8A63D2]">
          Next draw: {formatTimeUntilDraw()}
        </div>

        <div className="mb-4 flex flex-wrap gap-3 justify-center">
          {[0.001, 0.005, 0.02, 0.025, 0.1].map(v => (
            <button
              key={v}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                amount === v 
                  ? 'bg-[#8A63D2] text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setAmount(v)}
            >
              {v} ETH
            </button>
          ))}
        </div>

        <div className="mb-6">
          <input
            type="number"
            min={0.001}
            step={0.001}
            value={amount}
            placeholder="Custom amount (ETH)"
            className="w-full border border-gray-300 p-3 rounded-lg text-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#8A63D2]"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div className="mt-2 text-sm text-[#8A63D2]">
            Tickets: {ticketCount} • Min: 0.001 ETH per ticket
          </div>
        </div>

        <button
          onClick={handleBuy}
          disabled={status === 'loading' || !address}
          className={`w-full px-6 py-4 rounded-lg font-medium text-lg transition-all ${
            status === 'loading' || !address
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-[#8A63D2] text-white hover:bg-[#7b55c6] hover:scale-105'
          }`}
        >
          {status === 'loading' ? 'Processing...' : `Buy ${ticketCount} Ticket${ticketCount > 1 ? 's' : ''}`}
        </button>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-4 px-4 py-3 rounded-lg border ${
                status === 'success' ? 'border-green-500 bg-green-100 text-green-700' :
                status === 'error' ? 'border-red-500 bg-red-100 text-red-700' :
                'border-gray-500 bg-gray-100 text-gray-700'
              } flex justify-between items-center`}
            >
              <span>{message}</span>
              <button 
                onClick={() => setMessage('')} 
                className="ml-4 text-xl leading-none hover:opacity-70"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}