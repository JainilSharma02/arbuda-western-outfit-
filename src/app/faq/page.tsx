"use client";

import Link from "next/link";
import { ChevronLeft, HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    { q: "How do I place an order?", a: "To place an order, simply click 'Buy' on any product. This will redirect you to a direct WhatsApp chat with our team where you can finalize payment and sharing shipping details." },
    { q: "Do you offer free shipping?", a: "Yes, we proudly offer free shipping inside our primary service areas." },
    { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for unworn and undamaged items." },
    { q: "Are these items authentic?", a: "Absolutely! 100% original authentic products crafted with love." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-[#b58b66] transition-colors mb-8 font-medium">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 mx-auto text-[#b58b66] mb-4 opacity-50" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-600">Everything you need to know about shopping with Arbuda.</p>
        </div>
        
        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <h3 className="text-xl font-bold text-slate-800 mb-3">{faq.q}</h3>
              <p className="text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
