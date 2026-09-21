import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, Check, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../services/products';

export default function CartToast() {
  const { lastAddedToast, dismissToast, setIsCartOpen, totalItems } = useCart();

  if (!lastAddedToast) return null;

  const { product, quantity } = lastAddedToast;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-5 right-5 z-40 max-w-sm w-full bg-[#1B3E6F] text-white p-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            ) : (
              <ShoppingBag className="w-4 h-4 text-[#1B3E6F]" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-[#3AA88C] font-bold">
              <Check className="w-3.5 h-3.5" />
              <span>Added to Cart ({quantity}x)</span>
            </div>
            <p className="text-xs font-bold text-white truncate">{product.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => {
              dismissToast();
              setIsCartOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#3AA88C] hover:bg-[#2C856E] text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <span>View ({totalItems})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={dismissToast}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
