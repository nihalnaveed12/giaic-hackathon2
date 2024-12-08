import { products } from "@/data/products";
import Image from "next/image";

import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import { Button } from "./ui/button";
export default function Featured() {
  return (
    <section className="max-w-screen-xl mx-auto pt-[42px] px-4">
      <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center  font-bold">
        Featured Products
      </h1>
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 py-10 ">
        {products.slice(0, 4).map((product) => (
          <div className="group relative mb-36 xl:mb-0" key={product.id}>
            <div className="bg-[#F6F7FB] group-relative  cursor-pointer w-full h-full overflow-hidden flex justify-center items-center ">
              <div
                className={`absolute top-2 left-2 group-hover:flex  gap-1 hidden`}
              >
                <ShoppingCart className="bg-[#EEEFFB] rounded-full w-[30px] p-1 hover:scale-105" />
                <Heart className="bg-[#EEEFFB] rounded-full w-[30px] p-1 hover:scale-105" />
                <ZoomIn className="bg-[#EEEFFB] rounded-full w-[30px] p-1 hover:scale-105" />
              </div>
              <Image
                src={product.images[0]}
                alt={product.name}
                height={1000}
                width={1000}
                className="transition-transform hover:scale-105 duration-700  hover:rounded-md object-contain w-[178px] "
              />

              <Button
                className={`bg-[#08D15F] font-josifen outline-none border-none text-white absolute bottom-3 hover:bg-green-400 group-hover:flex hidden`}
              >
                View Details
              </Button>
            </div>

            <div className="flex flex-col gap-2 items-center py-4 shadow-lg cursor-pointer group-hover:bg-[#2F1AC4] transition-[colors, transform] duration-300">
              <h1
                className={`font-lato font-bold text-[18px] text-[#F701A8] group-hover:text-white`}
              >
                {product.name}
              </h1>
              <div className="flex w-[52px] items-center justify-center gap-1">
                <div className="w-[14px] h-[4px] bg-[#00009D]" />
                <div className="w-[14px] h-[4px] bg-[#05E6B7]" />
                <div className="w-[14px] h-[4px] bg-[#F701A8]" />
              </div>
              <p className="text-[#151875] group-hover:text-white">
                {product.rating}
              </p>
              <p className="font-lato text-[14px] text-[#151875] group-hover:text-white ">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-36 flex w-[72px] items-center justify-center gap-1 max-w-screen-lg mx-auto">
        <div className="w-[20px] h-[4px] bg-[#F701A8]" />
        <div className="w-[16px] h-[4px] bg-[#ee9fd5]" />
        <div className="w-[14px] h-[4px] bg-[#ee9fd5]" />
        <div className="w-[12px] h-[4px] bg-[#ee9fd5]" />
      </div>
    </section>
  );
}
