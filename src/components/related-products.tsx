import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/ProductTypes";
import { calculateDiscountedPrice } from "@/utils/calculateDiscountedPrice";

type RelatedProductsProps = {
  products: Product[];
  category: string;
};

export default function RelatedProducts({
  products,
  category,
}: RelatedProductsProps) {
  // Check if category is valid
  if (!category ) {
    return (
      <div className="max-w-screen-xl mx-auto pt-10 px-4">
        <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
          Related Products
        </h1>
        <p>Invalid category.</p>
      </div>
    );
  }

  // Filter products by category (with null/undefined checks)
  const productsByCategory = products.filter(
    (product) => product.category && product.category.title === category
  );

  console.log("All Products:", products);
  console.log("Category:", category);
  console.log("Filtered Products:", productsByCategory);

  if (productsByCategory.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto pt-10 px-4">
        <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
          Related Products
        </h1>
        <p>No related products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto pt-10 px-4">
      <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
        Related Products
      </h1>

      <div className="grid lg:grid-cols-4 grid-cols-1 gap-y-6 place-items-center md:place-items-start  md:grid-cols-2 pt-6">
        {productsByCategory.map((product: Product) => {
          const discountedPrice = calculateDiscountedPrice(
            product.price,
            product.discountPercentage
          );

          return (
            <Link
              href={`/shop/${product.name}`}
              className="flex flex-col gap-4 "
              key={product._id}
            >
              <div className="bg-[#F5F6F8] p-4 items-center flex justify-center w-[270px] h-[300px]  cursor-pointer overflow-hidden gap-3">
                <Image
                  src={product.image?.asset.url || product.name}
                  alt={product.name}
                  height={1000}
                  width={1000}
                  className="transition-transform hover:scale-105 duration-700  hover:rounded-md object-contain w-[154px] h-[158px] "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-josifen text-sm font-bold text-[#151875]">
                  {product.name}
                </h1>
                <div className="flex gap-3">
                  <span className="text-[#151875]">${product.price}</span>
                  <span className="text-[#FB2E86] line-through">
                    ${discountedPrice}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}