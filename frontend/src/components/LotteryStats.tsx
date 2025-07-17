'use client';

import { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS } from '../app/lib/config';
import { ethers } from 'ethers';
import LotteryABI from '../abi/Lottery.json';

interface LotteryStatsProps {
  className?: string;
}

export default function LotteryStats({ className = '' }: LotteryStatsProps) {
  const [stats, setStats] = useState({
    totalETH: '0',
    nextDrawTime: 0,
    ticketsCount: 0,
    lastDraw: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const provider = new ethers.JsonRpcProvider('https://mainnet.base.org');
        const contract = new ethers.Contract(CONTRACT_ADDRESS, LotteryABI.abi, provider);
        
        const [totalETH, nextDraw, tickets, lastDraw] = await Promise.all([
          contract.totalETH(),
          contract.nextDrawTime(),
          contract.tickets.length || 0,
          contract.lastDraw(),
        ]);
        
        setStats({
          totalETH: ethers.formatEther(totalETH),
          nextDrawTime: Number(nextDraw),
          ticketsCount: Number(tickets),
          lastDraw: Number(lastDraw),
        });
      } catch (error) {
        console.error('Error fetching lottery stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const formatTimeUntilDraw = () => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = stats.nextDrawTime - now;
    
    if (timeLeft <= 0) return 'Draw in progress...';
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const formatLastDraw = () => {
    if (stats.lastDraw === 0) return 'Never';
    const date = new Date(stats.lastDraw * 1000);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-300 h-16 rounded"></div>
          <div className="bg-gray-300 h-16 rounded"></div>
          <div className="bg-gray-300 h-16 rounded"></div>
          <div className="bg-gray-300 h-16 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <div className="bg-[#8A63D2]/20 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-[#8A63D2]">
          {parseFloat(stats.totalETH).toFixed(4)}
        </div>
        <div className="text-sm text-gray-600">ETH in Pot</div>
      </div>
      
      <div className="bg-[#8A63D2]/20 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-[#8A63D2]">
          {stats.ticketsCount}
        </div>
        <div className="text-sm text-gray-600">Total Tickets</div>
      </div>
      
      <div className="bg-[#8A63D2]/20 p-4 rounded-lg text-center">
        <div className="text-lg font-bold text-[#8A63D2]">
          {formatTimeUntilDraw()}
        </div>
        <div className="text-sm text-gray-600">Next Draw</div>
      </div>
      
      <div className="bg-[#8A63D2]/20 p-4 rounded-lg text-center">
        <div className="text-lg font-bold text-[#8A63D2]">
          {formatLastDraw()}
        </div>
        <div className="text-sm text-gray-600">Last Draw</div>
      </div>
    </div>
  );
}