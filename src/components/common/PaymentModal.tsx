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
  const [step, setStep] = useState<"pay" | "verifying" | "success">("pay");
  const [copied, setCopied] = useState(false);
  const upiId = "6354845777-1@naviaxis";
  const name = "JAINIL HARSHADKUMAR SHARMA";

  // Clean the price string to get a valid numerical amount for UPI
  const cleanAmount = price.replace(/[^\d.]/g, "");

  const handleCopy = () => {

    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    setStep("verifying");
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleWhatsApp = () => {
    const message = `Payment Done! ✅\n\nProduct: ${productName}\nPrice: ${price}\nFrom: ${name}\n\nI have completed the payment of ${price} via UPI. Please confirm my order.`;
    window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setStep("pay");
    }
  }, [isOpen]);

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
            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
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
              {step === "pay" && (
                <div className="flex flex-col items-center">
                  <div className="w-full bg-slate-50 rounded-2xl p-4 mb-6 flex items-center justify-between border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Payable Amount</p>
                      <p className="text-2xl font-bold text-[#b58b66]">{price}</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <ShieldCheck className="w-6 h-6 text-[#b58b66]" />
                    </div>
                  </div>

                  <p className="text-sm font-medium text-slate-600 mb-4">Pay using any UPI app</p>
                  
                  {/* UPI Apps Icons */}
                  <div className="flex gap-4 mb-6">
                    <img src="https://www.vectorlogo.zone/logos/google_pay/google_pay-icon.svg" alt="GPay" className="w-8 h-8 grayscale opacity-70" />
                    <img src="https://www.vectorlogo.zone/logos/phonepe/phonepe-icon.svg" alt="PhonePe" className="w-8 h-8 grayscale opacity-70" />
                    <img src="https://www.vectorlogo.zone/logos/paytm/paytm-icon.svg" alt="Paytm" className="w-8 h-8 grayscale opacity-70" />
                    <div className="flex items-center gap-1">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#00d09c]">
                         <path d="M4 4H10V10H4V4ZM4 14H10V20H4V14ZM14 4H20V10H14V4ZM14 14H20V20H14V14Z" fill="currentColor" />
                       </svg>
                       <span className="text-sm font-bold text-[#4c2d82]">navi</span>
                    </div>
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

                  <div className="flex flex-col items-center mb-6">
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

                  <div className="w-full mb-6">
                    <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                      <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <p className="text-[11px] text-blue-700 leading-tight">
                        Scan the QR code above using any UPI app to pay. After payment, click "I have Paid" to confirm on WhatsApp.
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleConfirm}
                    className="w-full py-6 rounded-2xl bg-[#b58b66] hover:bg-[#a07a55] text-white font-bold text-lg shadow-xl shadow-[#b58b66]/20 transition-all active:scale-[0.98]"
                  >
                    I have Paid
                  </Button>
                </div>
              )}

              {step === "verifying" && (
                <div className="flex flex-col items-center py-12">
                  <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-[#b58b66] border-t-transparent animate-spin" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Verifying Payment</h4>
                  <p className="text-slate-500 text-center text-sm">Please wait while we process your request...</p>
                </div>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center py-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2 text-center">Payment Notified!</h4>
                  <p className="text-slate-500 text-center text-sm mb-8 px-4">
                    Thank you for your payment. Please send the payment screenshot on WhatsApp to finalize your delivery.
                  </p>
                  
                  <Button 
                    onClick={handleWhatsApp}
                    className="w-full py-6 rounded-2xl bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-lg shadow-xl shadow-green-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                    Send Receipt on WhatsApp
                  </Button>
                </div>
              )}
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
