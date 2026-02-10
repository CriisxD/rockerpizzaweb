import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Bike } from 'lucide-react';
import { useState, useEffect } from 'react';
import heroBg from '../assets/hero_background_final.jpg';

const SLIDES = [
    {
        id: 1,
        image: heroBg,
        subtitle: 'ROCKER PIZZA',
        title1: 'PIZZAS',
        title2: 'ARTESANALES',
        desc: '¡Dale alegría a tu vida con nuestras irresistibles pizzas!\nAlfonso Carrasco 141, Los Ángeles.',
        buttonText: 'PEDIR AHORA',
        align: 'left'
    },
    {
        id: 2,
        image: '/src/assets/pizza_product_v2.jpg', // Using pizza product image as placeholder for new promo bg
        subtitle: 'PROMOCIÓN IMPERDIBLE',
        title1: '2 ROCKER',
        title2: "PIZZA'S",
        desc: 'Llévate 2 Pizzas Familiares con 3 ingredientes cada una.\n¡Por solo $17.990!',
        buttonText: 'VER PROMO',
        align: 'left',
        isPromo: true
    }
];

export const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 7000); // Increased to 7 seconds to let user read
        return () => clearInterval(timer);
    }, []);

    const slide = SLIDES[currentSlide];

    return (
    <>
        <section className="relative h-[60vh] min-h-[500px] w-full mt-[90px] overflow-hidden bg-black">
            <AnimatePresence>
                <motion.div
                    key={slide.id}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url('${slide.image}')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </motion.div>
            </AnimatePresence>
            
            <div className="relative z-10 h-full flex items-end pb-12 px-6 max-w-6xl mx-auto">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-lg"
                    >
                        <span className="inline-block bg-brand-red text-white text-sm font-black px-4 py-1 rounded-sm mb-6 shadow-[0_0_15px_rgba(230,28,36,0.5)] tracking-widest mt-12 md:mt-0 uppercase">
                            {slide.subtitle}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-heading leading-none mb-8 drop-shadow-xl py-2 mt-4">
                            {slide.title1} <br/>
                            <span className="text-brand-yellow text-6xl md:text-8xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] inline-block mt-2">{slide.title2}</span>
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 max-w-sm leading-relaxed font-bold whitespace-pre-line">
                            {slide.desc}
                        </p>
                        
                        <button
                            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-brand-yellow text-brand-dark px-8 py-3 rounded-full font-extrabold text-lg flex items-center gap-2 hover:scale-95 transition-transform shadow-[0_0_20px_rgba(255,199,44,0.4)]"
                        >
                            {slide.buttonText} <ArrowRight size={20} />
                        </button>

                        <div className="flex gap-4 mt-6 text-sm text-gray-200 font-medium">
                            <div className="flex items-center gap-1">
                                <Star size={14} className="text-brand-red fill-brand-red" /> Calidad Premium
                            </div>
                            <div className="flex items-center gap-1">
                                <Bike size={14} className="text-brand-red" /> Delivery Rápido
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slide Indicators - Moved lower since bar is outside */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
                {SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            currentSlide === idx ? 'bg-brand-yellow scale-125' : 'bg-white/30 hover:bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </section>

        {/* Marquee Bar - Now outside the hero section to sit below */}
        <div className="w-full bg-brand-yellow py-2 overflow-hidden flex items-center relative z-30">
             <motion.div 
                className="flex whitespace-nowrap gap-8"
                animate={{ x: [0, -1000] }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 20, 
                    ease: "linear"
                }}
             >
                {[...Array(20)].map((_, i) => (
                    <span key={i} className="text-brand-dark font-black italic tracking-widest text-lg md:text-xl">
                        ¡ORDENA AHORA! <span className="text-white mx-4">•</span>
                    </span>
                ))}
             </motion.div>
        </div>
    </>
    );
};
