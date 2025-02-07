import { Product } from "@/types/ProductTypes";
import Image from "next/image";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import { calculateDiscountedPrice } from "@/utils/calculateDiscountedPrice";
import Link from "next/link";
import AddToCart from "./AddToCart";
import { Button } from "./ui/button";

interface LatestProductsProps {
  products: Product[];
}

export default function LatestProduct({ products }: LatestProductsProps) {
  return (
    <section className="max-w-screen-xl mx-auto py-36 px-4">
      <div className="flex flex-col gap-6">
        <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center  font-bold">
          Latest Products
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-10 ">
        {products.slice(0, 6).map((product) => {
          const discountedPrice = calculateDiscountedPrice(
            product.price,
            product.discountPercentage
          );
          return (
            <div className="group relative h-[360px] my-6" key={product._id}>
              <div className="bg-[#F6F7FB] group-relative cursor-pointer w-full h-full overflow-hidden flex justify-center items-center">
                <div className="absolute  bottom-4 left-[-80px] group-hover:left-4 transform transition-all duration-300 group-hover:flex flex-col gap-2 hidden">
                  <AddToCart
                    className="bg-[#EEEFFB] rounded-full w-[40px]"
                    product={product}
                  >
                    <ShoppingCart className="w-[40px]" />
                  </AddToCart>

                  <Button className="bg-[#EEEFFB] rounded-full w-[40px]">
                    <Heart className="w-[18px]" />
                  </Button>

                  <Button className="bg-[#EEEFFB] rounded-full w-[40px]">
                    <ZoomIn className="w-[16px]" />
                  </Button>
                </div>

                <Link href={`/shop/${product.name}`}>
                  <Image
                    src={product.image?.asset.url || "Image"}
                    alt={product.name}
                    height={1000}
                    width={1000}
                    className="transition-transform hover:scale-105 duration-700 hover:rounded-md object-contain w-[223px]"
                  />
                </Link>
              </div>

              <Link
                href={`/shop/${product.name}`}
                className="pt-3 flex justify-between"
              >
                <h4>{product.name}</h4>
                <div className="flex gap-3 font-josifen">
                  {product.discountPercentage ? (
                    <p>${discountedPrice}</p>
                  ) : (
                    <p>No Discount Available</p>
                  )}
                  <p className="text-pink-500 line-through">${product.price}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
