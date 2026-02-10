import { ShoppingCart, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo_rocker_v3.png';

interface NavbarProps {
  cartCount: number;
  toggleCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, toggleCart }) => {
  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 h-[90px] flex items-center justify-between px-4 transition-all duration-300">
      <div className="flex items-center gap-2">
        <div className="h-20 flex items-center justify-center">
             <img src={logo} alt="Rocker Pizza" className="h-full w-auto object-contain" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a href="https://instagram.com/rocker.pizza" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors text-white">
            <Instagram size={20} />
        </a>
        <button 
          onClick={toggleCart}
          className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors"
        >
          <ShoppingCart size={20} className="text-white" />
          {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-brand-yellow text-brand-dark text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black"
              >
              {cartCount}
            </motion.span>
          )}
        </button>
      </div>
    </nav>
    </>
  );
};
