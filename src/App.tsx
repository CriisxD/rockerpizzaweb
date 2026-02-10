import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { Cart } from './components/Cart';
import { Marketing } from './components/Marketing';
import { Footer } from './components/Footer';
import type { Product, CartItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('sushi-yem-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('sushi-yem-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      // Find item with same ID AND same selected ingredients
      const existing = prev.find(item => 
        item.id === product.id && 
        JSON.stringify(item.selectedIngredients?.sort()) === JSON.stringify(product.selectedIngredients?.sort())
      );
      
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && JSON.stringify(item.selectedIngredients?.sort()) === JSON.stringify(product.selectedIngredients?.sort()))
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-sushi-black text-white font-sans selection:bg-sushi-red selection:text-white">
      <Navbar cartCount={cartCount} toggleCart={() => setIsCartOpen(!isCartOpen)} />
      
      <main>
        <Hero />
        <MenuSection addToCart={addToCart} />
        <Marketing />
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;
