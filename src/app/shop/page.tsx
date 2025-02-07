import { type Product } from "@/types/ProductTypes";
import { getAllProducts } from "@/lib/getAllProducts";

import Products from "@/components/ProductPage";

export const revalidate = 10

export default async function Shop() {
  // Fetch products on the server
  const products: Product[] = await getAllProducts();
  

  return (
    <div>
      {/* Pass products to the client component */}
      <Products products={products} />
    </div>
  );
}
