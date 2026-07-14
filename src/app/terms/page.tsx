import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the Terms of Service for Arbuda Western Outfit to understand our store rules, order placement, and shipping policies.",
  alternates: {
    canonical: "/terms",
  }
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-slate-500 hover:text-[#b58b66] transition-colors mb-8 font-medium">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-8">Terms of Service</h1>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-4">
              Welcome to Arbuda Western Outfit. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Use of the Site</h3>
            <p className="text-slate-600 mb-4">
              Our site provides a curated collection of fashion items. By purchasing via our WhatsApp checkout integration, you agree to our direct payment and shipping procedures.
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Product Availability</h3>
            <p className="text-slate-600 mb-4">
              All orders are subject to acceptance and availability. If the goods ordered are not available, you will be notified and given the option to wait or cancel.
            </p>
            <p className="text-sm text-slate-400 mt-12 pt-8 border-t border-slate-100">Last updated: June 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
