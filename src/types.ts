  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Promos' | 'Pizzas' | 'Bebidas' | 'Picoteo';
  image?: string;
  popular?: boolean;
  selectedIngredients?: string[];
  pizzaBundles?: string[][];
  maxIngredients?: number;
  ingredientOptions?: string[];
  pizzaCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
