import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, AlertCircle, Award, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

interface AgeGateModalProps {
  onVerified: () => void;
}

export const AGE_GATE_STORAGE_KEY = 'cyden_age_verified';
export const AGE_GATE_EXPIRY_DAYS = 30;

export default function AgeGateModal({ onVerified }: AgeGateModalProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUnderage, setIsUnderage] = useState<boolean>(false);

  // Generate dropdown of years: from currentYear down to currentYear - 100
  const years: number[] = [];
  for (let y = currentYear; y >= currentYear - 100; y--) {
    years.push(y);
  }

  // Prevent background scrolling when gate is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedYear) {
      setErrorMsg('Please select your birth year to continue.');
      return;
    }

    const yearNum = parseInt(selectedYear, 10);
    const age = currentYear - yearNum;

    if (age >= 18) {
      // Save verification state with timestamp
      const data = {
        verified: true,
        timestamp: Date.now(),
        expiresAt: Date.now() + AGE_GATE_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
      };
      try {
        localStorage.setItem(AGE_GATE_STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        console.warn('LocalStorage unavailable:', err);
      }
      document.body.style.overflow = 'auto';
      onVerified();
    } else {
      setIsUnderage(true);
      setErrorMsg(
        'Access Denied: You must be at least 18 years old to access Cyden Distributors. Excessive alcohol consumption is harmful to health.'
      );
    }
  };

  return (
    <motion.div
      id="cyden-age-gate-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-md bg-[#F8F7F4] text-[#222222] rounded-2xl shadow-2xl border border-[#3AA88C]/30 overflow-hidden"
      >
        {/* Top Header Banner */}
        <div className="bg-[#1B3E6F] text-white px-6 py-5 text-center relative flex flex-col items-center">
          <div className="mb-2">
            <Logo size="lg" variant="dark" showSubtitle={false} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#F2A93B] mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>EABL Gold Distributor 2024</span>
          </div>
          <p className="text-xs text-white/80 mt-0.5">Eldoret & Iten, Kenya</p>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {!isUnderage ? (
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#3AA88C]/10 text-[#3AA88C] mb-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1B3E6F]">Age Verification Required</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  You must be <span className="font-semibold text-[#222222]">18 years or older</span> to enter this website. Please confirm your year of birth to view our beverage catalogue.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="birth-year-select" className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                  Year of Birth
                </label>
                <select
                  id="birth-year-select"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setErrorMsg(null);
                  }}
                  className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-base font-medium text-[#222222] focus:outline-none focus:ring-2 focus:ring-[#3AA88C] focus:border-transparent transition-all shadow-sm"
                  required
                >
                  <option value="" disabled>Select your birth year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500">
                  Kenya Legal Drinking Age is 18 years.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="age-gate-submit-btn"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#E8582F] hover:bg-[#D04620] text-white font-bold text-sm tracking-wide transition-colors duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enter Catalogue</span>
                </button>
              </div>

              <div className="border-t border-neutral-200 pt-4 text-center">
                <p className="text-[11px] text-neutral-500 italic">
                  By entering this site, you agree to our terms of use and certify that you are of legal drinking age in Kenya.
                </p>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1B3E6F]">Access Restricted</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Sorry, you must be 18 years or older to view the Cyden Distributors catalogue. In compliance with Kenyan laws and responsible beverage distribution standards, access is denied.
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 text-left">
                <strong>Responsible Drinking:</strong> Cyden Distributors promotes responsible alcohol sales. Alcohol must not be sold to or consumed by minors.
              </div>
              <div className="pt-2">
                <a
                  href="https://www.drinkaware.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-semibold text-[#1B3E6F] underline hover:text-[#3AA88C]"
                >
                  Learn more about responsible drinking resources &rarr;
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsUnderage(false);
                  setSelectedYear('');
                  setErrorMsg(null);
                }}
                className="mt-3 text-xs text-neutral-500 hover:text-neutral-800 underline cursor-pointer"
              >
                Entered the wrong year? Try again
              </button>
            </div>
          )}
        </div>

        {/* Footer Responsible Drinking Stripe */}
        <div className="bg-[#3AA88C]/10 border-t border-[#3AA88C]/20 px-6 py-2.5 text-center text-[11px] font-medium text-[#2C856E]">
          Drink Responsibly • Strictly Not for Sale to Persons Under 18
        </div>
      </motion.div>
    </motion.div>
  );
}
