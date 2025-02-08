import { Product } from "@/types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import { calculateDiscountedPrice } from "@/utils/calculateDiscountedPrice";
export default function ProductList({products} : {products : Product[]}) {
return (

    <div className="flex flex-col gap-10 py-10">
          {products.map((product) => {
              const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
            return (
            <Link href={`/shop/${product.name}`} className="flex md:flex-row flex-col md:items-start items-center gap-6" key={product._id}>
              <div className="bg-[#F5F6F8] p-4 items-center flex justify-center w-[270px]   cursor-pointer overflow-hidden gap-3">
                <Image
                  src={product.image?.asset.url || "Image"}
                  alt={product.name}
                  height={1000}
                  width={1000}
                  className="transition-transform hover:scale-105 duration-700  hover:rounded-md object-contain w-[154px] h-[158px] "
                />
              </div>

              <div className="flex flex-col gap-2 justify-center md:items-start items-center">

                <div className="flex gap-4">

                <h1 className="font-josifen text-[18px] font-bold text-[#151875]">
                  {product.name}
                </h1>
                <div className="flex w-[52px] items-center justify-center gap-1">
                  <div className="w-[12px] h-[12px] bg-[#00009D] rounded-full" />
                  <div className="w-[12px] h-[12px] bg-[#05E6B7] rounded-full" />
                  <div className="w-[12px] h-[12px] bg-[#F701A8] rounded-full"/>
                </div>
                </div>

                <div className="flex gap-6 ">

                
                <div className="flex gap-3">
                    <span className="text-[#151875]">${product.price}</span>
                    <span className="text-[#FB2E86] line-through">${discountedPrice}</span>
                </div>

               
     
                </div>

                <p className="text-[#A9ACC6] md:text-start text-center">{product.description}</p>

                <div className="flex gap-4">
                    <ShoppingCart />
                    <Heart />
                    <ZoomIn />
                </div>

              </div>
            </Link>
            )
        })}
        </div>
    )
}
