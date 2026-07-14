import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Size Guide | Find Your Perfect Fit",
  description: "Consult the Arbuda Western Outfit size chart to find your perfect fit in bust, waist, and hip sizes. Includes UK and Indian sizing standards.",
  alternates: {
    canonical: "/size-guide",
  }
};

const sizeData = [
  { size: "XS", ind: "34", bust: "32", waist: "26", hip: "34" },
  { size: "S", ind: "36", bust: "34", waist: "28", hip: "36" },
  { size: "M", ind: "38", bust: "36", waist: "30", hip: "38" },
  { size: "L", ind: "40", bust: "38", waist: "32", hip: "40" },
  { size: "XL", ind: "42", bust: "40", waist: "34", hip: "42" },
  { size: "XXL", ind: "44", bust: "42", waist: "36", hip: "44" },
  { size: "XXXL", ind: "46", bust: "44", waist: "38", hip: "46" },
];

export default function SizeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-[#b58b66]">
          Size Guide
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed">
          Find your perfect fit with our comprehensive Indian women's clothing size chart. Use the measurements below to determine your ideal size.
        </p>
      </div>

      <Card className="border-none shadow-xl bg-white/60 backdrop-blur-md relative overflow-hidden">
        <CardContent className="p-8 md:p-12 relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="pb-4 font-serif text-lg font-bold text-slate-800">Size Label</th>
                  <th className="pb-4 font-serif text-lg font-bold text-slate-800">IND/UK Size</th>
                  <th className="pb-4 font-serif text-lg font-bold text-[#b58b66]">Bust (inches)</th>
                  <th className="pb-4 font-serif text-lg font-bold text-[#b58b66]">Waist (inches)</th>
                  <th className="pb-4 font-serif text-lg font-bold text-[#b58b66]">Hip (inches)</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors duration-200"
                  >
                    <td className="py-5 font-semibold text-slate-900">{row.size}</td>
                    <td className="py-5 font-medium text-slate-600">{row.ind}</td>
                    <td className="py-5 text-slate-700">{row.bust}"</td>
                    <td className="py-5 text-slate-700">{row.waist}"</td>
                    <td className="py-5 text-slate-700">{row.hip}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
