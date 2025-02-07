import Image from "next/image";
import Link from "next/link";
import { calculateDiscountedPrice } from "@/utils/calculateDiscountedPrice";
import { Product } from "@/types/ProductTypes";
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className=" pt-16">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {products.map((product) => {
          const discountedPrice = calculateDiscountedPrice(
            product.price,
            product.discountPercentage
          );
          return (
            <Link
              href={`/shop/${product.name}`}
              className="flex flex-col gap-4 pb-12  items-center"
              key={product._id}
            >
              <div className="bg-[#F5F6F8] p-4 items-center flex justify-center w-[270px]   cursor-pointer overflow-hidden gap-3">
                <Image
                  src={product.image?.asset.url || product.name}
                  alt={product.name}
                  height={1000}
                  width={1000}
                  className="transition-transform hover:scale-105 duration-700  hover:rounded-md object-contain w-[154px] h-[158px] "
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <h1 className="font-josifen text-center text-[18px] font-bold text-[#151875]">
                  {product.name}
                </h1>
                <div className="flex w-[52px] items-center justify-center gap-1">
                  <div className="w-[12px] h-[12px] bg-[#00009D] rounded-full" />
                  <div className="w-[12px] h-[12px] bg-[#05E6B7] rounded-full" />
                  <div className="w-[12px] h-[12px] bg-[#F701A8] rounded-full" />
                </div>
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
