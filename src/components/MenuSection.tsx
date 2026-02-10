import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { Star, Plus, Check, X, Search } from 'lucide-react';
import type { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import defaultPizzaImage from '../assets/pizza_product_v2.jpg';

const categories = [
  { id: 'Promos', label: 'Rocker Promos' },
  { id: 'Bebidas', label: 'Bebidas' },
] as const;

export const MenuSection: React.FC<{ addToCart: (p: Product) => void }> = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Promos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // State for multi-pizza selection
  const [currentPizzaIndex, setCurrentPizzaIndex] = useState(0);
  const [pizzaBundles, setPizzaBundles] = useState<string[][]>([]);
  const [searchTerm, setSearchTerm] = useState('');


  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  const handleProductClick = (product: Product) => {
    // If product has ingredient options (like Promos), use modal
    if (product.ingredientOptions && product.ingredientOptions.length > 0) {
      setSelectedProduct(product);
      setCurrentPizzaIndex(0);
      // Initialize bundles based on pizzaCount (default to 1 if not specified)
      const count = product.pizzaCount || 1;
      setPizzaBundles(Array(count).fill([]));

      setSearchTerm('');
      setIsModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  const handleIngredientToggle = (ingredient: string) => {
    setPizzaBundles(prev => {
        const newBundles = [...prev];
        const currentIngredients = newBundles[currentPizzaIndex] || [];
        
        // Check if ingredient exists to remove it
        if (currentIngredients.includes(ingredient)) {
            newBundles[currentPizzaIndex] = currentIngredients.filter(i => i !== ingredient);
        } else {
            // Check limits
            const max = selectedProduct?.maxIngredients || 1; // Default to 1 if not specified
            if (currentIngredients.length < max) {
                 newBundles[currentPizzaIndex] = [...currentIngredients, ingredient];
            }
        }
        return newBundles;
    });
  };



  const handleModalAddToCart = () => {
    if (selectedProduct) {
      addToCart({ 
        ...selectedProduct, 
        pizzaBundles: pizzaBundles
      });
      setIsModalOpen(false);
      setSelectedProduct(null);
      setPizzaBundles([]);
    }
  };
  
  const allPizzasSelected = selectedProduct && pizzaBundles.every(bundle => bundle.length > 0);

  return (
    <section id="menu" className="py-20 px-4 bg-brand-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading text-center mb-4 text-white uppercase tracking-wider">
          Menú <span className="text-brand-yellow">Rocker</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto text-lg">
            ¡Sabor que te hará vibrar!
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 sticky top-[90px] z-40 py-4 bg-brand-dark/95 backdrop-blur-md">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-brand-yellow text-brand-dark shadow-[0_0_20px_rgba(255,199,44,0.4)]'
                  : 'bg-brand-card text-gray-400 hover:text-white hover:bg-neutral-800 border border-white/5'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => handleProductClick(product)} 
            />
          ))}
        </motion.div>
      </div>

      {/* Promo Selection Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0 }}
              dragElastic={{ top: 0, bottom: 0.2 }}
              onDragEnd={(_, { offset, velocity }) => {
                if (offset.y > 100 || velocity.y > 500) {
                  setIsModalOpen(false);
                }
              }}
              initial={isMobile ? { y: "100%" } : { scale: 0.95, opacity: 0 }} 
              animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }} 
              exit={isMobile ? { y: "100%" } : { scale: 0.95, opacity: 0 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-brand-card w-full max-w-4xl rounded-t-3xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[600px] relative"
              onClick={e => e.stopPropagation()}
            >
                 {/* Mobile Drag Handle */}
                 {isMobile && (
                   <div className="w-full h-6 absolute top-0 left-0 z-30 flex items-center justify-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                     <div className="w-12 h-1.5 bg-white/30 rounded-full" />
                   </div>
                 )}
                 {/* Product Image Side */}
                 <div className="md:w-5/12 relative bg-neutral-900 h-32 md:h-auto shrink-0">
                    <img 
                        src={selectedProduct.image || defaultPizzaImage} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent md:bg-gradient-to-r" />
                    <div className="absolute bottom-4 left-6 z-10">
                        <h3 className="text-2xl md:text-3xl font-heading text-white mb-1 uppercase italic tracking-wider">{selectedProduct.name}</h3>
                        <p className="text-brand-red font-bold text-lg md:text-xl">${selectedProduct.price.toLocaleString('es-CL')}</p>
                    </div>
                 </div>

                 {/* Config Side */}
                 <div className="md:w-7/12 p-4 md:p-8 flex flex-col bg-[#1a1a1a] flex-grow overflow-hidden">
                     <div className="flex justify-between items-start mb-4 md:mb-6 shrink-0">
                        <div>
                            <h4 className="text-white font-heading text-xl uppercase mb-1">PERSONALIZA TU PEDIDO</h4>
                            <p className="text-gray-400 text-sm">Configura tus {selectedProduct.pizzaCount} pizzas</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-colors"
                        >
                            <X size={18} />
                        </button>
                     </div>

                     {/* Pizza Tabs - Only show if more than 1 pizza */}
                     {(selectedProduct.pizzaCount || 1) > 1 && (
                         <div className="flex gap-2 mb-6">
                            {Array.from({length: selectedProduct.pizzaCount || 1}).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPizzaIndex(i)}
                                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border ${
                                        currentPizzaIndex === i 
                                        ? 'bg-brand-yellow border-brand-yellow text-brand-dark shadow-lg shadow-brand-yellow/20' 
                                        : 'bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                                    }`}
                                >
                                    Pizza {i + 1}
                                </button>
                            ))}
                         </div>
                     )}

                     <div className="flex justify-between items-center mb-4">
                        <h4 className="font-heading text-white uppercase text-sm tracking-wider">
                            {(selectedProduct.pizzaCount || 1) > 1 ? `INGREDIENTES PIZZA ${currentPizzaIndex + 1}` : 'ELIGE TUS INGREDIENTES'}
                        </h4>
                        <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white border border-white/10">
                            {pizzaBundles[currentPizzaIndex]?.length || 0}/{selectedProduct.maxIngredients || 3}
                        </span>
                     </div>
                     
                     {/* Ingredients List */}
                     <div className="flex-grow overflow-y-auto pr-2 space-y-2 mb-6 scrollbar-thin scrollbar-thumb-brand-yellow/20 scrollbar-track-transparent">
                            <div className="relative mb-4 sticky top-0 z-10">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="text"
                                    placeholder="Buscar ingredientes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-[#252525] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-yellow transition-all shadow-inner"
                                />
                            </div>
                        {selectedProduct.ingredientOptions?.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase())).map((option, idx) => {
                            const isSelected = pizzaBundles[currentPizzaIndex]?.includes(option);
                            // Disable if max reached and not selected
                            const currentCount = pizzaBundles[currentPizzaIndex]?.length || 0;
                            const max = selectedProduct.maxIngredients || 3;
                            const isDisabled = !isSelected && currentCount >= max;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => !isDisabled && handleIngredientToggle(option)}
                                    disabled={isDisabled}
                                    className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center group ${
                                        isSelected 
                                        ? 'bg-brand-yellow/10 border-brand-yellow text-white' 
                                        : isDisabled
                                            ? 'opacity-50 cursor-not-allowed bg-transparent border-white/5 text-gray-600'
                                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                                >
                                    <span className="font-medium">{option}</span>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                        isSelected 
                                        ? 'bg-brand-yellow border-brand-yellow' 
                                        : 'border-gray-600 group-hover:border-gray-400'
                                    }`}>
                                        {isSelected && <Check size={12} className="text-brand-dark" />}
                                    </div>
                                </button>
                            );
                        })}
                     </div>

                     {/* Footer Actions */}
                     <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                        <div className="text-sm">
                            <span className="text-gray-400">Total:</span>
                            <span className="text-white font-bold text-lg ml-2">${selectedProduct.price.toLocaleString('es-CL')}</span>
                        </div>

                        <button
                            onClick={handleModalAddToCart}
                            disabled={!allPizzasSelected}
                            className="bg-[#2a3040] hover:bg-[#343b4d] text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 shadow-lg"
                        >
                            Completa todas las pizzas
                        </button>
                     </div>
                 </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => (
  <div className="bg-brand-card rounded-2xl overflow-hidden border border-white/5 hover:border-brand-yellow/30 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col h-full">
    <div className="relative h-48 overflow-hidden bg-white/5">
        <img 
            src={product.image || defaultPizzaImage} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card/80 to-transparent z-10" />
        
      {product.popular && (
        <span className="absolute top-4 left-4 z-20 bg-brand-red text-white text-xs font-black px-3 py-1 rounded shadow-lg flex items-center gap-1">
          <Star size={12} fill="currentColor" /> POPULAR
        </span>
      )}
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-heading text-2xl text-white group-hover:text-brand-yellow transition-colors w-full">
          {product.name}
        </h3>
        <span className="font-heading text-xl text-brand-red whitespace-nowrap ml-2">
          ${product.price.toLocaleString('es-CL')}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow border-t border-white/5 pt-4 mt-2">
        {product.description}
      </p>
      
      <button
        onClick={onClick}
        className="w-full bg-brand-yellow text-brand-dark font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#e6b328] active:scale-95 transition-all shadow-lg shadow-brand-yellow/20 group-hover:shadow-brand-yellow/40"
      >
        <Plus size={20} />
        {product.category === 'Promos' ? 'ELEGIR PIZZAS' : 'AGREGAR'}
      </button>
    </div>
  </div>
);
