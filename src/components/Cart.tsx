import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Plus, Minus, Send, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  updateQuantity, 
  removeFromCart 
}) => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    address: '',
    paymentMethod: 'Efectivo',
    notes: ''
  });


  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let message = `*Hola! Quiero realizar un pedido en Rocker Pizza*\n\n`;
    message += `*Cliente:* ${deliveryInfo.name || 'Sin nombre'}\n`;
    message += `*Dirección:* ${deliveryInfo.address || 'Retiro en local'}\n`;
    message += `*Pago:* ${deliveryInfo.paymentMethod}\n`;
    
    if (deliveryInfo.notes) {
        message += `*Notas:* ${deliveryInfo.notes}\n`;
    }

    message += `\n*DETALLE DEL PEDIDO:*\n`;
    
    cartItems.forEach(item => {
      message += `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-CL')})\n`;
      
      if (item.pizzaBundles && item.pizzaBundles.length > 0) {
        item.pizzaBundles.forEach((bundle, idx) => {
             message += `  🍕 Pizza ${idx + 1}: ${bundle.join(', ')}\n`;
        });
      } else if (item.selectedIngredients && item.selectedIngredients.length > 0) {
          message += `  _Ingredientes: ${item.selectedIngredients.join(', ')}_\n`;
      }
    });

    message += `\n*TOTAL: $${total.toLocaleString('es-CL')}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/56989705094?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] touch-none"
          />
          
          <motion.div
            drag={isMobile ? "y" : false}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.2 }}
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 500) {
                onClose();
              }
            }}
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed z-[101] bg-[#111] border-white/10 shadow-2xl flex flex-col
              ${isMobile 
                ? 'bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl border-t' 
                : 'right-0 top-0 h-full w-full max-w-[400px] border-l'
              }`}
          >
             {/* Mobile Drag Handle */}
             {isMobile && (
               <div 
                 className="w-full h-10 shrink-0 flex items-center justify-center bg-transparent touch-none cursor-grab active:cursor-grabbing mt-2"
                 onPointerDown={(e) => dragControls.start(e)}
               >
                 <div className="w-12 h-1.5 bg-white/20 rounded-full" />
               </div>
             )}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#161616]">
              <h2 className="text-xl font-heading tracking-wide">TU PEDIDO</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-dark">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Trash2 className="opacity-50" />
                  </div>
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="bg-[#1a1a1a] p-4 rounded-xl flex justify-between items-center border border-white/5">
                      <div className="flex-1 pr-4">
                        <h4 className="font-bold text-sm mb-1 line-clamp-1">{item.name}</h4>
                        {/* Display size if selected */}
                        {item.selectedSize ? (
                            <p className="text-xs text-brand-yellow font-bold mb-1">
                                {item.selectedSize.name}
                            </p>
                        ) : (
                            // Legacy or other fields fallback if needed
                            item.pizzaBundles && item.pizzaBundles.length > 0 && (
                                <div className="text-xs text-gray-400 mb-1 space-y-1">
                                    {item.pizzaBundles.map((bundle, idx) => (
                                        <div key={idx}>
                                            <span className="text-brand-yellow font-bold">Pizza {idx + 1}:</span> {bundle.join(', ')}
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                        <p className="text-brand-red font-bold text-sm bg-brand-red/10 inline-block px-2 py-0.5 rounded">
                            ${item.price.toLocaleString('es-CL')}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-3 text-red-500 hover:text-red-400 p-2"
                        >
                          <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cartItems.length > 0 && (
                <div className="bg-[#1a1a1a] p-5 rounded-xl space-y-4 mt-6 border border-white/5">
                  <h3 className="font-heading text-sm text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">Datos de Entrega</h3>
                  <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-base focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-colors"
                        value={deliveryInfo.name}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, name: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Dirección (O dejar en blanco si retiras)"
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-base focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-colors"
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                    />
                    <select
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-base focus:border-brand-red outline-none transition-colors appearance-none"
                        value={deliveryInfo.paymentMethod}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, paymentMethod: e.target.value})}
                    >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Tarjeta">Tarjeta (Débito/Crédito)</option>
                    </select>
                    <textarea
                        placeholder="Notas adicionales (sin cebollín, etc.)"
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-base focus:border-brand-red focus:ring-1 focus:ring-brand-red outline-none transition-colors h-20 resize-none"
                        value={deliveryInfo.notes}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, notes: e.target.value})}
                    />
                 </div>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-[#0d0d0d]">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-400 font-medium">Total a Pagar</span>
                  <span className="text-3xl font-heading text-brand-red tracking-tight">${total.toLocaleString('es-CL')}</span>
                </div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#1faa52] text-white py-4 rounded-xl font-extrabold text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-900/20 transition-all hover:-translate-y-1"
                >
                  <Send size={24} />
                  ENVIAR A WHATSAPP
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
