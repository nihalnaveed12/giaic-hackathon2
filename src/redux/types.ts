
export interface Products {
    _id: string;
    name: string;
    price: number;
    image: {
      asset: {
        url: string;
      };
    };
    category?: {
      title: string;
    };
  }
  
  export interface CartItem extends Products {
    stockLevel: number;
  }
  
  export interface CartState {
    items: CartItem[];
    total: number;
  }
  