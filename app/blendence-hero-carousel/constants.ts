import { ProductSlide } from './types';

// Using high-quality Unsplash images that closely match the color palette and composition 
// of the user's request (Orange, Red, Green Juice/Smoothies) to demonstrate the morph effect.
// In a real scenario, these would be the exact URLs of the Blendence products.

export const SLIDES: ProductSlide[] = [
  {
    id: 1,
    title: "KidGrow",
    subtitle: "STAGES",
    description: "Packed with essential vitamins for growing bodies. A delicious blend of banana, orange, pear, and grapes to fuel their play.",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=2800&auto=format&fit=crop", // Orange theme
    themeColor: "text-orange-600",
    accentColor: "bg-orange-500",
    ingredients: ["Banana", "Orange", "Pear", "Grapes"]
  },
  {
    id: 2,
    title: "KidRise",
    subtitle: "STAGES",
    description: "The perfect morning kickstart. Apple, carrot, and lemon combine for a zesty immunity boost that tastes like sunshine.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=2800&auto=format&fit=crop", // Red/Gold theme
    themeColor: "text-red-600",
    accentColor: "bg-red-500",
    ingredients: ["Apple", "Carrot", "Lemon", "Banana"]
  },
  {
    id: 3,
    title: "TeenFocus",
    subtitle: "STAGES",
    description: "Stay sharp and focused. A green power blend of kale, spinach, and apple designed to support mental clarity.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=2800&auto=format&fit=crop", // Green theme
    themeColor: "text-emerald-600",
    accentColor: "bg-emerald-600",
    ingredients: ["Kale", "Spinach", "Apple", "Lemon"]
  }
];

export const AUTO_PLAY_INTERVAL = 6000; // ms