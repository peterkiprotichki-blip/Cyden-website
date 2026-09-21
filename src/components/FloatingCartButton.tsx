import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../services/products';

export default function FloatingCartButton() {
  const { totalItems, grandTotal, setIsCartOpen, isCartOpen, isCheckoutOpen } = useCart();

  if (totalItems === 0 || isCartOpen || isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      <motion.button
        id="floating-cart-trigger"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-[#1B3E6F] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl border-2 border-[#3AA88C] flex items-center gap-3 cursor-pointer hover:bg-[#122B4E] transition-all group"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#3AA88C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 bg-[#E8582F] text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1B3E6F]">
            {totalItems}
          </span>
        </div>

        <div className="text-left leading-tight hidden sm:block">
          <span className="text-[10px] font-semibold text-neutral-300 block uppercase tracking-wider">
            Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </span>
          <span className="text-sm font-extrabold text-white">
            {formatCurrency(grandTotal)}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-[#3AA88C] group-hover:translate-x-0.5 transition-transform">
          <span className="hidden sm:inline">Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.button>
    </AnimatePresence>
  );
}
