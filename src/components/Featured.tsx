"use client";

import type { Product } from "@/types/ProductTypes";
import Image from "next/image";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AddToCart from "./AddToCart";

interface FeaturedProductsProps {
  products: Product[];
}

export default function Featured({ products }: FeaturedProductsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const productss = products.filter((product) => product.isFeaturedProduct);

  return (
    <section className="max-w-screen-xl mx-auto pt-[42px] px-4">
      <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center font-bold mb-10">
        Featured Products
      </h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination, Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="featured-swiper"
      >
        {productss.map((product) => (
          <SwiperSlide key={product.name} className="pb-16">
            <div className="group block">
              <div className="bg-[#F6F7FB] cursor-pointer w-full aspect-square overflow-hidden flex justify-center items-center relative">
                <Image
                  src={product.image?.asset.url || "/placeholder.svg"}
                  alt={product.name}
                  width={178}
                  height={178}
                  className="transition-transform hover:scale-105 duration-700 hover:rounded-md w-[200px]  object-cover object-center"
                />
                <div className="absolute -left-36 top-3 flex  gap-2 transition-all duration-500 group-hover:left-3">
                  <AddToCart
                    className="bg-[#EEEFFB]  rounded-full w-[40px] hover:bg-white"
                    product={product}
                  >
                    <ShoppingCart className=" w-[40px]" />
                  </AddToCart>

                  <Button className="bg-[#EEEFFB] rounded-full w-[40px] hover:bg-white ">
                    <Heart className="w-[18px] " />
                  </Button>

                  <Button className="bg-[#EEEFFB] rounded-full w-[40px] hover:bg-white">
                    <ZoomIn className="w-[16px] " />
                  </Button>
                </div>

                <Button className="bg-[#08D15F] font-josifen outline-none duration-500 border-none text-white absolute -bottom-36 transition-all group-hover:bottom-3 hover:bg-green-400 ">
                  <Link href={`/shop/${product.name}`}>View Details</Link>
                </Button>
              </div>

              <div className="flex flex-col gap-4 items-center py-4 shadow-lg cursor-pointer group-hover:bg-[#2F1AC4] transition-[colors, transform] duration-300">
                <Link
                  href={`/shop/${product.name}`}
                  className="font-lato font-bold text-[18px] text-[#F701A8] group-hover:text-white"
                >
                  {product.name}
                </Link>
                <div className="flex w-[60px] items-center justify-center gap-1">
                  <div className="w-[20px] h-[4px] bg-[#00009D]" />
                  <div className="w-[20px] h-[4px] bg-[#05E6B7]" />
                  <div className="w-[20px] h-[4px] bg-[#F701A8]" />
                </div>

                <p className="font-lato text-[20px] text-[#151875] group-hover:text-white">
                  ${product.price}
                </p>
                <p className="hidden">{activeIndex}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination"></div>

      <style jsx global>{`
        .featured-swiper {
          padding-bottom: 50px !important;
        }
        .featured-swiper .swiper-button-next,
        .featured-swiper .swiper-button-prev {
          color: #f701a8;
          top: 45%;
        }
        .custom-pagination {
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
        }
        .custom-bullet {
          width: 16px;
          height: 4px;
          background-color: #ee9fd5;
          display: inline-block;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .custom-bullet-active {
          width: 20px;
          background-color: #f701a8;
        }
      `}</style>
    </section>
  );
}
