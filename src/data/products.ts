import type { Product } from '../types';

const ROCKER_INGREDIENTS = [
    'Salame',
    'Aceituna',
    'Carne',
    'Tomate',
    'Doble queso',
    'Pepperoni',
    'Maíz',
    'Camarón',
    'Pimentón',
    'Champiñon',
    'Choricillo',
    'Pollo crispy',
    'Pollo',
    'Piña',
    'Palmitos',
    'Tocino'
];

export const products: Product[] = [
  // PROMOS ROCKER
  {
    id: 'promo-1-3ing',
    name: '1 Pizza 3 Ingredientes',
    description: 'Arma tu Rocker con hasta 3 ingredientes a elección.',
    price: 9990,
    category: 'Promos',
    image: '/src/assets/pizza_product_v2.jpg',
    popular: true,
    pizzaCount: 1,
    maxIngredients: 3,
    pizzaBundles: [],
    ingredientOptions: ROCKER_INGREDIENTS
  },
  {
    id: 'promo-1-5ing',
    name: '1 Pizza 5 Ingredientes',
    description: 'Arma tu Rocker con hasta 5 ingredientes a elección.',
    price: 11990,
    category: 'Promos',
    image: '/src/assets/pizza_product_v2.jpg',
    pizzaCount: 1,
    maxIngredients: 5,
    pizzaBundles: [],
    ingredientOptions: ROCKER_INGREDIENTS
  },
  {
    id: 'promo-2rocker',
    name: '2 Rocker Pizza\'s',
    description: '2 Pizzas Familiares con 3 ingredientes cada una.',
    price: 17990,
    category: 'Promos',
    image: '/src/assets/pizza_product_v2.jpg',
    popular: true,
    pizzaCount: 2,
    maxIngredients: 3,
    pizzaBundles: [],
    ingredientOptions: ROCKER_INGREDIENTS
  },
  {
    id: 'promo-3rocker',
    name: '3 ROCKER PIZZA\'S',
    description: '3 Pizzas Familiares con 3 ingredientes cada una.',
    price: 25990,
    category: 'Promos',
    image: '/src/assets/pizza_product_v2.jpg',
    popular: true,
    pizzaCount: 3,
    maxIngredients: 3,
    pizzaBundles: [],
    ingredientOptions: ROCKER_INGREDIENTS
  },
  
  // BEBIDAS (Keeping these as they are standard)
  {
    id: 'bebida-1.5',
    name: 'Bebida 1.5L',
    description: 'Coca-Cola, Fanta, Sprite',
    price: 2500,
    category: 'Bebidas',
    image: '/src/assets/beverage.jpg'
  },
  {
    id: 'bebida-lata',
    name: 'Bebida Lata',
    description: 'Coca-Cola, Fanta, Sprite',
    price: 1500,
    category: 'Bebidas',
    image: '/src/assets/beverage.jpg'
  }
];
