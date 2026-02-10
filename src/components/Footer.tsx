import { Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-12 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-3xl font-heading mb-4">
            <span className="text-brand-yellow">ROCKER</span>
            <span className="text-brand-red"> PIZZA</span>
        </h3>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            ¡Dale alegría a tu vida con nuestras irresistibles pizzas!
        </p>
        
        <div className="flex justify-center gap-6 mb-8">
            <a href="https://instagram.com/rocker.pizza" target="_blank" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-red hover:-translate-y-1 transition-all">
              <Instagram size={24} />
            </a>
            <a href="https://wa.me/56989705094" target="_blank" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:-translate-y-1 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /></svg>
            </a>
        </div>
        
        <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Rocker Pizza. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
