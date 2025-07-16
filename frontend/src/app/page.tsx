"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LotteryABI from "../../abi/Lottery.json";
import { ethers } from "ethers";
import { motion, AnimatePresence } from "framer-motion";

const CONTRACT_ADDRESS = "0xB89B940A8Ba01E0E141b947b59aadcCaB83a4E6D";

export default function Home() {
  const [amount, setAmount] = useState<number>(0.001);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [potETH, setPotETH] = useState<string>("0");
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const infoRef = useRef(null);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
    const contract = new ethers.Contract(CONTRACT_ADDRESS, LotteryABI.abi, provider);
    contract.totalETH().then((bal: bigint) => {
      setPotETH(ethers.formatEther(bal));
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setShowInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [infoRef]);

  const handleBuy = async () => {
    if (!address) return;
    if (amount < 0.001) {
      setStatus("error");
      setMessage("Min is 0.001 ETH");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const tx = await writeContractAsync({
        account: address,
        chain: base,
        address: CONTRACT_ADDRESS,
        abi: LotteryABI.abi,
        functionName: "buyTickets",
        value: BigInt(Math.floor(amount * 1e18))
      });
      const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
      await provider.waitForTransaction(tx);
      setStatus("success");
      setMessage("Transaction confirmed.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.shortMessage || "Transaction failed.");
    }
    setTimeout(() => setMessage(""), 5000);
  };


  return (
    <div className="flex flex-col items-center text-black justify-center min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-pink-300 via-blue-300 to-green-300 animate-gradient bg-[400%]">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-4 right-4 z-20">
        <button onClick={() => setShowInfo(!showInfo)} className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center">i</button>
      </div>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-4 bg-white/50 backdrop-blur p-4 rounded-2xl shadow-md w-80 text-left text-sm z-20"
          >
            <div className="mb-2 font-bold">Weekly Draw</div>
            <div>Every Sunday 12:00am UTC</div>
            <div className="mt-2 font-bold">Payouts:</div>
            <div>1st: 50%</div>
            <div>2nd: 20%</div>
            <div>3rd: 15%</div>
            <div>4th: 5%</div>
            <div>5th: 5%</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 backdrop-blur-md bg-gray-300/20 rounded-xl p-8 w-full max-w-xl text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <ConnectButton />
        </div>
        <h1 className="text-4xl font-bold mb-6 uppercase text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-blue-500 to-green-500 animate-gradient">Sunday Bonanza</h1>
        <p className="mb-4 text-xl">Pot: <span className="font-mono">{parseFloat(potETH).toFixed(4)} ETH</span></p>
        <div className="mb-4 flex flex-wrap gap-3 justify-center">
          {[0.001, 0.005, 0.02, 0.025, 0.1].map(v => (
            <button
              key={v}
              className={`px-4 py-2 rounded ${amount === v ? "bg-green-500" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => setAmount(v)}
            >{v} ETH</button>
          ))}
        </div>
        <div className="mb-2">
          <input
            type="number"
            min={0.001}
            step={0.001}
            placeholder="Custom (ETH)"
            className="border p-2 rounded"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="mb-6 text-xs text-gray-700">Min 0.001 ETH</div>
        <button
          onClick={handleBuy}
          disabled={status === "loading"}
          className="mt-4 px-6 py-3 bg-purple-600 text-white rounded"
        >
          {status === "loading" ? "Processing..." : `Buy Tickets`}
        </button>
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-4 px-4 py-2 rounded border ${
                status === "success" ? "border-green-500 bg-green-100 text-green-700" :
                status === "error" ? "border-red-500 bg-red-100 text-red-700" :
                "border-gray-500 bg-gray-100 text-gray-700"
              } flex justify-between items-center`}
            >
              <span>{message}</span>
              <button onClick={() => setMessage("")} className="ml-4 text-xl leading-none">&times;</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx global>{`
        .animate-gradient {
          background-size: 100% 200%;
          animation: gradientAnimation 6s ease infinite;
        }
        @keyframes gradientAnimation {
          0%,100% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
        }
      `}</style>
    </div>
  );
}
