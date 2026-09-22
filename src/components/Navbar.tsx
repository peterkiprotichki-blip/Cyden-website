import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ExternalLink, ShoppingBag, Award, ChevronRight, CreditCard } from 'lucide-react';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';
import { COMPANY_INFO } from '../data/companyData';
import { THEBAR_STOREFRONT_URL } from '../services/thebar';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../services/products';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenOrderModal: () => void;
}

export default function Navbar({ currentRoute, onNavigate, onOpenOrderModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, grandTotal, setIsCartOpen, openWhatsAppOrder } = useCart();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Catalogue', path: '/catalogue' },
    { label: 'Branches', path: '/branches' },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="hidden sm:block bg-[#1B3E6F] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#F2A93B]/20 text-[#F2A93B] px-2 py-0.5 rounded-full text-[11px] font-bold">
              <Award className="w-3 h-3" />
              EABL Gold Distributor 2024
            </span>
            <span className="hidden sm:inline text-white/80">
              Serving 600+ Outlets • Open 7 Days Daily (Until 8:00 PM)
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-white/90">
            <a
              href={`tel:${COMPANY_INFO.contact.primaryPhoneRaw}`}
              className="hover:text-[#3AA88C] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#3AA88C]" />
              <span>{COMPANY_INFO.contact.primaryPhone}</span>
            </a>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline text-white/70">Main Depository: Rupa Godowns, Eldoret</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center text-left cursor-pointer focus:outline-none"
            aria-label="Cyden Distributors Home"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.path;
              return (
                <motion.button
                  key={link.path}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer relative ${
                    isActive
                      ? 'text-[#1B3E6F] bg-[#3AA88C]/15 font-bold shadow-xs'
                      : 'text-neutral-700 hover:text-[#1B3E6F] hover:bg-neutral-100/80'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#3AA88C] rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Shopping Cart & Direct Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#3AA88C] hover:bg-[#2C856E] text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-xs relative"
              title="Cyden Direct Cart & Checkout"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E8582F] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span>Cyden Direct Checkout</span>
              {totalItems > 0 && (
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[11px]">
                  {formatCurrency(grandTotal)}
                </span>
              )}
            </motion.button>

            {/* Direct B2B Wholesale Order */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenOrderModal}
              className="px-3.5 py-2.5 rounded-xl bg-[#1B3E6F] hover:bg-[#122B4E] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Order in Wholesale Crates / Commercial Delivery"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#3AA88C]" />
              <span>Wholesale / B2B</span>
            </motion.button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            {/* Mobile Cart Trigger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 sm:p-2 rounded-xl bg-[#3AA88C] hover:bg-[#2C856E] text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs relative"
              title="Cart"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="bg-[#E8582F] text-white text-[10px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center border border-white/40">
                  {totalItems}
                </span>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#1B3E6F] text-white font-bold'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppOrder();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Order via WhatsApp (B2B / Personal • GPS Pin)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#3AA88C] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cyden Direct Cart & Checkout ({totalItems} items • {formatCurrency(grandTotal)})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#1B3E6F] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <CreditCard className="w-4 h-4 text-[#3AA88C]" />
                <span>Wholesale & Commercial Orders (Cyden Direct)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
