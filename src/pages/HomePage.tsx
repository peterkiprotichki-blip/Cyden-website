import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Award,
  ExternalLink,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Building2,
  Users,
  ChevronRight,
  Wine,
  Beer,
  GlassWater,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';
import { Product } from '../types';
import { getFeaturedProducts } from '../services/products';
import { COMPANY_INFO, BRANDS } from '../data/companyData';
import { THEBAR_STOREFRONT_URL } from '../services/thebar';
import ProductCard from '../components/ProductCard';
import AmbientBackground from '../components/AmbientBackground';
import HeroShowcaseCard from '../components/HeroShowcaseCard';
import {
  HeroAnimatedPatterns,
  HeritageGuillochePattern,
  AnimatedBannerRibbon,
  CardWatermarkPattern,
} from '../components/AnimatedPatterns';

interface HomePageProps {
  onNavigate: (route: string, filterCategory?: string) => void;
  onOpenOrderModal: (product?: Product) => void;
}

export default function HomePage({ onNavigate, onOpenOrderModal }: HomePageProps) {
  const [featuredDrinks, setFeaturedDrinks] = useState<Product[]>([]);
  const [activeTaglineIndex, setActiveTaglineIndex] = useState(0);

  useEffect(() => {
    const loadFeatured = () => {
      getFeaturedProducts().then((products) => {
        setFeaturedDrinks(products);
      });
    };
    loadFeatured();

    window.addEventListener('cyden:thebar-synced', loadFeatured);
    return () => window.removeEventListener('cyden:thebar-synced', loadFeatured);
  }, []);

  // Tagline rotator
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTaglineIndex((prev) => (prev + 1) % COMPANY_INFO.taglines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const categoryCards = [
    {
      name: 'Beer & Cider',
      slug: 'Beer',
      desc: 'Tusker, Guinness, White Cap — Kenya’s most cherished lagers and ciders.',
      count: 'Crates & Kegs',
      color: 'from-amber-500/20 to-amber-700/20 text-amber-900 border-amber-300',
      icon: Beer,
    },
    {
      name: 'Finest Gin',
      slug: 'Gin',
      desc: 'Gilbeys, Gordons, Tanqueray No. TEN — botanical elegance and juniper perfection.',
      count: 'Bottles & Cases',
      color: 'from-emerald-500/20 to-teal-700/20 text-emerald-950 border-emerald-300',
      icon: Sparkles,
    },
    {
      name: 'Vodka',
      slug: 'Vodka',
      desc: 'Smirnoff No. 21, Smirnoff Vanilla, Chrome — ultra-filtered smooth spirits.',
      count: 'Full Range Sizes',
      color: 'from-blue-500/20 to-sky-700/20 text-blue-950 border-blue-300',
      icon: GlassWater,
    },
    {
      name: 'Scotch Whisky',
      slug: 'Whisky',
      desc: 'Johnnie Walker Blue, Black & Red Label, Singleton 12YO — Scotland’s finest blends.',
      count: 'Premium & Prestige',
      color: 'from-orange-500/20 to-amber-800/20 text-orange-950 border-orange-300',
      icon: Wine,
    },
    {
      name: 'Rum & Liqueur',
      slug: 'Rum',
      desc: 'Captain Morgan Dark & Spiced, Baileys Irish Cream — indulgent depth.',
      count: 'Retail & Hospitality',
      color: 'from-rose-500/20 to-red-700/20 text-rose-950 border-rose-300',
      icon: Wine,
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16 overflow-hidden">
      {/* 1. HERO SECTION WITH LUXURIOUS AMBIENT LIGHTING */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#09182E] via-[#0D223F] to-[#081527] text-white pt-6 sm:pt-10 lg:pt-12 pb-10 sm:pb-12 lg:pb-14">
        {/* Soft, silky ambient glow without grid or box patterns */}
        <AmbientBackground variant="hero" />
        <HeroAnimatedPatterns />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              {/* Prestigious Gold Distributor Credential */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold tracking-wide backdrop-blur-md"
              >
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="flex-shrink-0"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                </motion.div>
                <span className="hidden sm:inline font-medium">EABL Gold Distributor 2024 • North Rift Kenya</span>
                <span className="sm:hidden font-medium">EABL Gold Distributor • Eldoret & Iten</span>
              </motion.div>

              {/* Dynamic Tagline Heading with Smooth AnimatePresence */}
              <div className="space-y-3">
                <div className="min-h-[3.25rem] sm:min-h-[4.5rem] lg:min-h-[5.5rem] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTaglineIndex}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="text-[#3AA88C] text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]"
                    >
                      {COMPANY_INFO.taglines[activeTaglineIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Subtle Interactive Category Progress Strip */}
                <div className="flex items-center gap-2">
                  {COMPANY_INFO.taglines.map((tagline, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTaglineIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeTaglineIndex === idx
                          ? 'w-8 bg-[#3AA88C]'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Switch to: ${tagline}`}
                      title={tagline}
                    />
                  ))}
                  <span className="text-[11px] text-white/40 pl-2 font-medium tracking-wide">
                    Official EABL Portfolio
                  </span>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-white text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight pt-1"
                >
                  Premier Beverage Distribution in North Rift
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="text-sm sm:text-base text-neutral-300/90 max-w-xl font-normal leading-relaxed"
                >
                  Direct wholesale supply and rapid delivery for over 600 licensed bars, lounges, hotels, private collections, and retail customers throughout Eldoret, Iten, and neighboring counties.
                </motion.p>
              </div>

              {/* Clean, Non-Boxy Key Metrics Ribbon */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex items-center gap-6 sm:gap-10 py-3 border-y border-white/10 max-w-xl"
              >
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F2A93B] tracking-tight">600+</div>
                  <div className="text-xs text-neutral-300 font-medium pt-0.5">Outlets Supplied</div>
                </div>
                <div className="h-9 w-px bg-white/15" />
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3AA88C] tracking-tight">2 Hubs</div>
                  <div className="text-xs text-neutral-300 font-medium pt-0.5">Eldoret & Iten</div>
                </div>
                <div className="h-9 w-px bg-white/15" />
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">2013</div>
                  <div className="text-xs text-neutral-300 font-medium pt-0.5">Excellence Since</div>
                </div>
              </motion.div>

              {/* Primary Call-to-Actions */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('/catalogue')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#3AA88C] hover:bg-[#2F8D75] text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Drinks Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenOrderModal()}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#E8582F] hover:bg-[#D04620] text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Wholesale & Bulk Orders</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('/contact-us')}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors border border-white/20 cursor-pointer flex items-center justify-center"
                >
                  Contact Hub
                </motion.button>
              </motion.div>

              {/* Clean Inline Trust Markers (No Boxed Clutter) */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3AA88C]" />
                  <span>Same-Day Fleet Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3AA88C]" />
                  <span>Lipa Na M-Pesa STK Push</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>100% Factory Sealed Genuine EABL</span>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase — Animated Changing Imagery with Portfolio Highlights */}
            <HeroShowcaseCard onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* 2. WHAT WE OFFER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-1 text-[#3AA88C] font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Comprehensive Beverage Logistics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B3E6F] tracking-tight">
            What We Offer
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Cyden Distributors bridges East African Breweries Limited with licensed bars, clubs, supermarkets, and hospitality providers through an unbroken, temperature-monitored supply chain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Beers & Ciders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all space-y-4 relative overflow-hidden group"
          >
            <CardWatermarkPattern color="#D97706" />
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl relative z-10">
              <Beer className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B3E6F]">Beers & Ciders</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We stock the entire EABL beer portfolio in standard 500ml bottles, crates of 25, draft kegs, and cans. From Kenya’s pride <strong>Tusker Lager & Tusker Cider</strong> to the deep richness of <strong>Guinness Foreign Extra Stout</strong> and crisp <strong>White Cap</strong>.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">Tusker Lager</span>
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">Tusker Cider</span>
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">Guinness Stout</span>
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">White Cap</span>
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">Balozi</span>
            </div>
            <button
              onClick={() => onNavigate('/catalogue', 'Beer')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8582F] hover:text-[#D04620] pt-2 cursor-pointer group"
            >
              <span>Explore Beer Catalogue</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Premium Spirits, Gins, Vodka & Whiskies */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all space-y-4 relative overflow-hidden group"
          >
            <CardWatermarkPattern color="#3AA88C" />
            <div className="w-12 h-12 rounded-2xl bg-[#3AA88C]/15 text-[#2C856E] flex items-center justify-center font-bold text-xl relative z-10">
              <Wine className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B3E6F]">Spirits, Gins, Vodka & Whiskies</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              As spirits consumption expands, Cyden supplies verified genuine inventory across world-class Scotch (<strong>Johnnie Walker, Singleton</strong>), classic dry gins (<strong>Gilbeys, Gordons, Tanqueray</strong>), smooth vodkas (<strong>Smirnoff</strong>), rums, and cream liqueurs (<strong>Baileys</strong>).
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">Johnnie Walker</span>
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">Gilbeys Dry Gin</span>
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">Smirnoff No. 21</span>
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">Captain Morgan</span>
              <span className="px-3 py-1 bg-neutral-100 rounded-full text-neutral-700">Tanqueray</span>
            </div>
            <button
              onClick={() => onNavigate('/catalogue', 'Gin')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3AA88C] hover:text-[#2C856E] pt-2 cursor-pointer group"
            >
              <span>Explore Spirits & Gin</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. MOST POPULAR DRINKS (FEATURED PRODUCTS) WITH STAGGER ANIMATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-[#E8582F] font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fast-Moving Outlet Favorites</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1B3E6F] tracking-tight">
              Most Popular Drinks
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Top requested beverages across our 600+ partner outlets in the North Rift region.
            </p>
          </div>

          <motion.button
            whileHover={{ x: 3 }}
            onClick={() => onNavigate('/catalogue')}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#1B3E6F] hover:text-[#3AA88C] transition-colors cursor-pointer"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDrinks.slice(0, 8).map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onRequestOrder={onOpenOrderModal}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* 4. TOP CATEGORIES CHIPS / CARDS */}
      <section className="bg-white py-10 sm:py-16 border-y border-neutral-200/80 relative overflow-hidden">
        <AmbientBackground variant="light" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3AA88C]">
              Browse By Department
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B3E6F]">
              Top Categories
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Quickly navigate our wholesale inventory by beverage family.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categoryCards.map((cat, index) => {
              const IconComp = cat.icon;
              return (
                <motion.button
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('/catalogue', cat.slug)}
                  className={`p-5 rounded-2xl border text-left bg-gradient-to-b ${cat.color} transition-shadow hover:shadow-lg cursor-pointer flex flex-col justify-between h-48 group`}
                >
                  <div>
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center mb-3 text-neutral-800"
                    >
                      <IconComp className="w-5 h-5 text-[#1B3E6F]" />
                    </motion.div>
                    <h3 className="font-bold text-base text-neutral-900 group-hover:text-[#1B3E6F] transition-colors">{cat.name}</h3>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{cat.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold">
                    <span className="text-neutral-500">{cat.count}</span>
                    <span className="text-[#1B3E6F] flex items-center group-hover:translate-x-1 transition-transform">
                      Explore &rarr;
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. EXCELLENCE IN DISTRIBUTION SINCE 2013 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1B3E6F] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-xl"
        >
          {/* Animated Heritage Guilloche / Stamp Motif */}
          <HeritageGuillochePattern />

          {/* Background subtle moving glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3AA88C]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3AA88C]/20 text-[#3AA88C] text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>Proven Industry Leadership</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Excellence in Distribution Since 2013
              </h2>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                {COMPANY_INFO.story}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="border-l-2 border-[#3AA88C] pl-3">
                  <div className="text-xl font-bold text-white">600+</div>
                  <div className="text-xs text-neutral-300">Active Outlets</div>
                </div>
                <div className="border-l-2 border-[#F2A93B] pl-3">
                  <div className="text-xl font-bold text-white">3 Counties</div>
                  <div className="text-xs text-neutral-300">Regional Coverage</div>
                </div>
                <div className="border-l-2 border-[#E8582F] pl-3">
                  <div className="text-xl font-bold text-white">Gold 2024</div>
                  <div className="text-xs text-neutral-300">EABL Top Honors</div>
                </div>
              </div>
              <div className="pt-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('/about-us')}
                  className="px-6 py-3 rounded-xl bg-white text-[#1B3E6F] font-bold text-sm hover:bg-neutral-100 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Learn More About Our Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-bold text-base text-[#F2A93B] uppercase tracking-wider text-xs">
                Our Core Commitments
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <motion.div whileHover={{ x: 3 }} className="p-3 bg-white/5 rounded-xl border border-white/5 transition-colors">
                  <strong className="block text-white mb-0.5">Reliable Stock Availability</strong>
                  <span className="text-neutral-300">Zero stockout policy on fast-moving brands like Tusker and Guinness.</span>
                </motion.div>
                <motion.div whileHover={{ x: 3 }} className="p-3 bg-white/5 rounded-xl border border-white/5 transition-colors">
                  <strong className="block text-white mb-0.5">Financial Partnerships</strong>
                  <span className="text-neutral-300">Collaborating with Absa Bank, Equity, KCB, and Solve Kenya for outlet trade support.</span>
                </motion.div>
                <motion.div whileHover={{ x: 3 }} className="p-3 bg-white/5 rounded-xl border border-white/5 transition-colors">
                  <strong className="block text-white mb-0.5">Rapid Fleet Delivery</strong>
                  <span className="text-neutral-300">Dedicated trucks delivering from Rupa Godowns and Sitet Building.</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. OUR PARTNERS & BRANDS STRIP WITH ANIMATED HOVER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            World-Class Beverage Brands
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3E6F]">
            Our Principal Brands & Portfolio
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Distributing Kenya’s most beloved spirits, beers, and premium imports by East African Breweries Limited.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {BRANDS.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs hover:border-[#3AA88C] hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-1.5 cursor-pointer"
            >
              <div className="text-lg font-black tracking-wider text-[#1B3E6F]">
                {brand.logoText}
              </div>
              <div className="text-[11px] font-semibold text-[#E8582F]">
                {brand.category}
              </div>
              <p className="text-[10px] text-neutral-500 line-clamp-1">
                {brand.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. GET IN TOUCH CTA BANNER WITH PULSING ACCENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#3AA88C] via-[#2C856E] to-[#1B3E6F] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
        >
          {/* Animated flowing liquid ribbon */}
          <AnimatedBannerRibbon />

          {/* Animated decorative light spot */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -right-20 -top-20 w-80 h-80 bg-white/20 rounded-full blur-2xl pointer-events-none"
          />

          <div className="space-y-2 text-left relative z-10">
            <span className="text-xs uppercase font-bold tracking-wider text-[#F2A93B]">
              Ready to stock your bar or retail store?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Get in Touch with Cyden Sales & Dispatch
            </h3>
            <p className="text-sm text-white/90 max-w-xl">
              Connect with our Eldoret main office or Iten sub-store today. We provide weekly route scheduling, credit facilities, and guaranteed authentic EABL stock.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('/contact-us')}
              className="px-6 py-3.5 rounded-xl bg-white text-[#1B3E6F] font-bold text-sm shadow-md hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Contact Sales Team
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenOrderModal()}
              className="px-6 py-3.5 rounded-xl bg-[#E8582F] hover:bg-[#D04620] text-white font-bold text-sm shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Request Wholesale Order</span>
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
