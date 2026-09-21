import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  AlertCircle,
  Award,
  CheckCircle2,
  Search,
  Calendar,
  ChevronDown,
  X,
  Sparkles,
} from 'lucide-react';
import Logo from './Logo';

interface AgeGateModalProps {
  onVerified: () => void;
}

export const AGE_GATE_STORAGE_KEY = 'cyden_age_verified';
export const AGE_GATE_EXPIRY_DAYS = 30;

export default function AgeGateModal({ onVerified }: AgeGateModalProps) {
  const currentYear = new Date().getFullYear();
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUnderage, setIsUnderage] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate years list (currentYear down to currentYear - 105)
  const allYears: number[] = useMemo(() => {
    const list: number[] = [];
    for (let y = currentYear; y >= currentYear - 105; y--) {
      list.push(y);
    }
    return list;
  }, [currentYear]);

  // Filtered years based on typed query
  const filteredYears = useMemo(() => {
    const query = inputValue.trim();
    if (!query) return allYears;
    return allYears.filter((y) => y.toString().includes(query));
  }, [allYears, inputValue]);

  // Prevent background scrolling when gate is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live calculated age helper
  const parsedYear = useMemo(() => {
    const val = parseInt(inputValue.trim(), 10);
    if (!isNaN(val) && val >= currentYear - 110 && val <= currentYear) {
      return val;
    }
    return null;
  }, [inputValue, currentYear]);

  const liveAge = parsedYear !== null ? currentYear - parsedYear : null;

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    setInputValue(year.toString());
    setIsOpen(false);
    setErrorMsg(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    setInputValue(rawVal);
    setErrorMsg(null);
    setIsOpen(true);

    if (rawVal.length === 4) {
      const num = parseInt(rawVal, 10);
      if (num >= currentYear - 110 && num <= currentYear) {
        setSelectedYear(num);
      } else {
        setSelectedYear(null);
      }
    } else {
      setSelectedYear(null);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSelectedYear(null);
    setErrorMsg(null);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const executeVerification = (yearNum: number) => {
    const age = currentYear - yearNum;
    if (age >= 18) {
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

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) {
      setErrorMsg('Please enter or select your birth year to continue.');
      return;
    }

    const yearNum = parseInt(query, 10);
    if (isNaN(yearNum) || yearNum < currentYear - 110 || yearNum > currentYear) {
      setErrorMsg(`Please enter a valid 4-digit birth year between ${currentYear - 105} and ${currentYear}.`);
      return;
    }

    executeVerification(yearNum);
  };

  // Quick milestone year shortcuts
  const quickYears = [currentYear - 18, 2000, 1995, 1990, 1985];

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
                <h3 id="age-gate-title" className="text-lg font-bold text-[#1B3E6F]">
                  Age Verification Required
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  You must be <span className="font-semibold text-[#222222]">18 years or older</span> to enter this website. Please search, enter, or select your birth year.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Searchable / Enter / Select Year Combobox */}
              <div className="space-y-2" ref={containerRef}>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="birth-year-input"
                    className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider"
                  >
                    Year of Birth
                  </label>
                  <span className="text-[11px] text-neutral-500">
                    Search, type or select
                  </span>
                </div>

                <div className="relative">
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-neutral-400 pointer-events-none">
                      {inputValue ? (
                        <Search className="w-4 h-4 text-[#3AA88C]" />
                      ) : (
                        <Calendar className="w-4 h-4" />
                      )}
                    </div>

                    <input
                      ref={inputRef}
                      id="birth-year-input"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      value={inputValue}
                      onChange={handleInputChange}
                      onFocus={() => setIsOpen(true)}
                      placeholder="e.g. 1995 or 2000"
                      className="w-full pl-10 pr-16 py-3 bg-white border border-neutral-300 rounded-xl text-base font-semibold text-[#222222] placeholder:text-neutral-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#3AA88C] focus:border-transparent transition-all shadow-sm"
                      autoComplete="bday-year"
                    />

                    <div className="absolute right-2.5 flex items-center gap-1">
                      {inputValue && (
                        <button
                          type="button"
                          onClick={handleClear}
                          aria-label="Clear year input"
                          className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle years dropdown list"
                        className="p-1.5 rounded-md text-neutral-500 hover:text-[#1B3E6F] hover:bg-neutral-100 transition-colors cursor-pointer"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Dropdown Options List */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-full mt-1.5 z-20 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden max-h-56 flex flex-col"
                      >
                        <div className="px-3 py-1.5 bg-neutral-50 border-b border-neutral-100 text-[11px] font-medium text-neutral-500 flex items-center justify-between">
                          <span>
                            {inputValue ? `Filter results for "${inputValue}"` : 'Select birth year'}
                          </span>
                          <span>{filteredYears.length} available</span>
                        </div>

                        <div className="overflow-y-auto divide-y divide-neutral-50 flex-1">
                          {filteredYears.length > 0 ? (
                            filteredYears.map((year) => {
                              const age = currentYear - year;
                              const isSelected = selectedYear === year || inputValue === year.toString();
                              const isLegal = age >= 18;

                              return (
                                <button
                                  key={year}
                                  type="button"
                                  onClick={() => handleSelectYear(year)}
                                  className={`w-full px-3.5 py-2.5 text-left text-sm flex items-center justify-between transition-colors cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#3AA88C]/15 font-bold text-[#1B3E6F]'
                                      : 'hover:bg-neutral-50 text-neutral-800'
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="font-semibold text-base">{year}</span>
                                    <span className="text-xs text-neutral-400">({age} yrs)</span>
                                  </span>

                                  {isLegal ? (
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      18+ Eligible
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                                      Under 18
                                    </span>
                                  )}
                                </button>
                              );
                            })
                          ) : (
                            <div className="px-4 py-6 text-center text-xs text-neutral-500">
                              No years match "{inputValue}". You can still type your 4-digit birth year directly.
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Live validation feedback badge if valid year entered */}
                {liveAge !== null && (
                  <div className="flex items-center justify-between pt-0.5 px-1">
                    <span className="text-xs text-neutral-600">
                      Calculated Age: <strong className="text-[#1B3E6F]">{liveAge} years</strong>
                    </span>
                    {liveAge >= 18 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Legal drinking age
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                        <AlertCircle className="w-3 h-3 text-red-600" />
                        Under 18 years
                      </span>
                    )}
                  </div>
                )}

                {/* Quick Selection Chips */}
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 mb-1.5">
                    <Sparkles className="w-3 h-3 text-[#E8582F]" />
                    <span>Quick Select:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {quickYears.map((year) => {
                      const age = currentYear - year;
                      const isSelected = selectedYear === year || inputValue === year.toString();
                      return (
                        <button
                          key={year}
                          type="button"
                          onClick={() => handleSelectYear(year)}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1B3E6F] text-white border-[#1B3E6F] shadow-sm'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#3AA88C] hover:text-[#1B3E6F] hover:bg-neutral-50'
                          }`}
                        >
                          {year} <span className="text-[10px] opacity-70">({age}y)</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="text-[11px] text-neutral-500 pt-1">
                  Kenya Legal Drinking Age is 18 years (Alcoholic Drinks Control Act).
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
                  setInputValue('');
                  setSelectedYear(null);
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
