export interface Product {
  _id: string;
    name: string;
    image: {
      asset: {
        url: string;
      };
    };
    price: number;
   
    discountPercentage: number
    isFeaturedProduct: boolean
    stockLevel: number
    description: string;
    category: {
      title: string;
    };
    color: string[];
    tags: string[];
    _createdAt: string;
   
}
  