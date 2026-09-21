import React from 'react';
import { Wine, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="py-24 px-4 text-center max-w-lg mx-auto space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#3AA88C]/15 text-[#3AA88C] mx-auto flex items-center justify-center shadow-xs">
        <Wine className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E8582F]">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B3E6F]">
          Page Not Found
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          The page or product category you are looking for does not exist or has been moved. Explore our main beverage catalogue or return to the homepage.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-xl bg-[#1B3E6F] hover:bg-[#122B4E] text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <button
          onClick={() => onNavigate('/catalogue')}
          className="px-6 py-3 rounded-xl bg-[#3AA88C] hover:bg-[#2C856E] text-white font-bold text-xs transition-colors cursor-pointer"
        >
          View Full Catalogue
        </button>
      </div>
    </div>
  );
}
