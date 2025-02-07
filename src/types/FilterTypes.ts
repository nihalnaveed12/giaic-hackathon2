import { Product } from "./ProductTypes";
export interface FilterState {
    category: string;
    colors: string[];
    minPrice: number;
    maxPrice: number;
    inStock: boolean;
    onSale: boolean;
  }
  
  export interface ShopFiltersProps {
    products: Product[]; // Using your existing Product type
  }