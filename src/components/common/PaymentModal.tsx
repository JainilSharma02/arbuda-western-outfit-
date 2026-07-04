"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Copy, ExternalLink, Smartphone, ShieldCheck, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: string;
}

export default function PaymentModal({ isOpen, onClose, productName, price }: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const upiId = "6354845777-1@naviaxis";
  const name = "JAINIL HARSHADKUMAR SHARMA";

  // Hardcoded for testing
  const displayPrice = "₹1";
  const cleanAmount = "1";

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      // Automatically redirect to WhatsApp after 15 seconds to "notify" the seller
      // This simulates an automatic payment detection flow
      timer = setTimeout(() => {
        handleWhatsApp();
      }, 15000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleWhatsApp = () => {
    const message = `Payment Done! ✅\n\nProduct: ${productName}\nPrice: ${displayPrice} (Testing)\nFrom: ${name}\n\nI have completed the payment of ${displayPrice} via UPI. Please confirm my order.`;
    window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#faf9f6] rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden border-4 border-white"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between p-7 border-b border-slate-100 bg-white">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Secure Payment</h3>
                <p className="text-sm text-slate-500">Order: {productName}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex flex-col items-center">
                    <div className="w-full bg-white rounded-[2rem] p-5 mb-8 flex items-center justify-between border-2 border-slate-50 shadow-sm">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Total Payable</p>
                        <p className="text-3xl font-bold text-slate-900">{displayPrice}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl">
                        <ShieldCheck className="w-7 h-7 text-[#b58b66]" />
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 mb-8">
                      <div className="px-10 py-3 bg-[#b58b66] rounded-full shadow-lg shadow-[#b58b66]/20">
                        <span className="text-white font-bold text-xs tracking-[0.25em] uppercase">Scan to Pay</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Instant UPI Verification</p>
                    </div>

                  {/* QR Code */}
                  <div className="relative group mb-4">
                    <div className="w-64 h-64 bg-white rounded-2xl border-4 border-slate-100 p-4 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                      <Image 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${upiId}%26pn=${encodeURIComponent(name)}%26cu=INR%26am=${cleanAmount}%26tn=${encodeURIComponent(productName)}`}
                        alt="Payment QR Code"
                        width={250}
                        height={250}
                        className="relative z-10 rounded-lg"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center mb-10">
                    <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">{name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs font-medium text-slate-500">UPI ID : {upiId}</p>
                      <button 
                        onClick={handleCopy}
                        className={`p-1 rounded transition-colors ${copied ? 'text-green-500' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Copy UPI ID"
                      >
                        {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 15, ease: "linear" }}
                      className="h-full bg-[#b58b66]"
                    />
                  </div>
                  <div className="w-full py-4 flex items-center justify-center gap-3">
                    <div className="w-4 h-4 border-2 border-[#b58b66] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-bold text-slate-600 tracking-tight">Auto-verifying payment...</span>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed">
                    Complete the payment on your UPI app. <br />
                    We will automatically notify the seller via WhatsApp in 15s.
                  </p>
                </div>
            </div>

            {/* Footer */}


            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 grayscale opacity-40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">100% Secure Checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
