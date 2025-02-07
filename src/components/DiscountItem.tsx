"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  _id: string;
  title: string;
  image?: {
    asset: {
      url: string;
    };
  };
  content?: string;
  category: {
    title: string;
  };
  _createdAt: string;
}

export default function Discount({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState(products[0]?.title || "");

  useEffect(() => {
    if (products.length > 0) {
      setActiveTab(products[0].title); // Default to the first product
    }
  }, [products]);

  return (
    <section className="max-w-screen-xl mx-auto pt-24">
      <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center font-bold">
        Discount Items
      </h1>
      <Tabs defaultValue={activeTab}>
        <TabsList className="flex gap-6 items-center justify-center pt-4 font-lato">
          {products.map((product) => (
            <TabsTrigger
              key={product._id}
              value={product.title}
              className="relative text-black hover:text-[#FB4997] font-medium bg-none 
             focus:ring-0 transition duration-300 
             before:content-[''] before:absolute before:w-0 before:h-[2px] before:bg-[#FB4997] 
             before:bottom-[-2px] before:left-0 before:transition-all before:duration-300 
             hover:before:w-full 
             data-[state=active]:text-[#FB4997] data-[state=active]:before:w-full data-[state=active]:shadow-none"
            >
              {product.category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {products.map((product) => (
          <TabsContent
            key={product._id}
            value={product.title}
            className="max-w-screen-xl mx-auto flex gap-5 items-center lg:flex-row px-4 flex-col"
          >
            <div className="flex flex-col gap-6 pt-6">
              <h1 className="text-[#151875] font-semibold text-[35px] font-josifen">
                {product.title}
              </h1>
              <h4 className="text-pink-500 font-josifen">
                {product.category.title}
              </h4>
              <p className="text-[#ACABC3]">{product.content}</p>
              <ul className="grid sm:grid-cols-2 grid-cols-1 gap-3 text-[#ACABC3]">
                <li className="flex items-center">
                  <span>Lorem ipsum dolor sit amet consectetur</span>
                </li>
                <li className="flex items-center">
                  <span>Lorem ipsum dolor sit amet consectetur</span>
                </li>
                <li className="flex items-center">
                  <span>Lorem ipsum dolor sit amet consectetur</span>
                </li>
                <li className="flex items-center">
                  <span>Lorem ipsum dolor sit amet consectetur</span>
                </li>
              </ul>
              <div>
                <Link
                  href={`/shop/${product.title}`}
                  className="bg-[#FB2E86] font-josifen text-white w-[157px] px-4 py-2 hover:bg-pink-500"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            {product.image?.asset.url ? (
              <Image
                src={product.image.asset.url}
                alt={product.title}
                width={1000}
                height={1000}
                loading="lazy"
                className="w-[558px]"
              />
            ) : (
              <div className="w-[558px] h-[558px] bg-gray-200 flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
