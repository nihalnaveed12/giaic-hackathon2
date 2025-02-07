export type OrderData = {
  user: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
    paymentMethod?: string
  };
  products: {
    product: {
      _type: 'reference';
      _ref: string; // Sanity product reference
    };
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: 'Pending' | 'Completed' | 'Cancelled'; // Status should have limited values
  createdAt: string; // ISO string format
  shippingRate: string | null;
  paymentMethod: string;
};

  