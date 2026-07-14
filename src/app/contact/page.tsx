import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, MapPin, Mail, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Arbuda Western",
  description: "Have query about orders, customizations or size issues? Contact our team directly on WhatsApp or follow us on Instagram.",
  alternates: {
    canonical: "/contact",
  }
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-[#b58b66]">
          Contact Us
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
          We'd love to hear from you. Whether you have a question about our clothing, sizing, or an order, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
          <Link href="https://wa.me/919427673886" target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
            <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full cursor-pointer">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="p-4 bg-[#25D366]/10 rounded-full text-[#25D366] shrink-0">
                  <MessageCircle size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">WhatsApp Us</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    For the fastest response, send us a message on WhatsApp. We are available to help with your orders and sizing queries.
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-[#25D366] hover:text-[#1da851] transition-colors">
                    +91 94276 73886
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="https://www.instagram.com/arbuda_western_outfit_end_dres?igsh=bTAyZTJzazk5NHo1" target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
            <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full cursor-pointer">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="p-4 bg-gradient-to-tr from-yellow-400/20 via-pink-500/20 to-purple-600/20 rounded-full text-pink-500 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Follow on Instagram</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Join our community! DM us for direct support, stay updated with the latest drops, and get styling inspirations.
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
                    @arbuda_western_outfit_end_dres
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
      </div>
    </div>
  );
}
