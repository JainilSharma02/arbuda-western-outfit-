import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy for Arbuda Western Outfit to understand how we protect and process your shopping details.",
  alternates: {
    canonical: "/privacy",
  }
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-[#b58b66] transition-colors mb-8 font-medium">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-8">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-4">
              At Arbuda Western Outfit, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you use our website.
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Information We Collect</h3>
            <p className="text-slate-600 mb-4">
              We only collect information necessary to process your orders and improve your shopping experience, such as your name, shipping address, and contact details via WhatsApp.
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">How We Use Your Information</h3>
            <p className="text-slate-600 mb-4">
              Your information is used strictly for fulfilling your orders, providing customer support, and keeping you updated on exclusive collections.
            </p>
            <p className="text-sm text-slate-400 mt-12 pt-8 border-t border-slate-100">Last updated: June 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
