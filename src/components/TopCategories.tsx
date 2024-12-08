import { products } from "@/data/products";
import Image from "next/image";

export default function TopCat() {
  return (
    <section className="max-w-screen-xl mx-auto pt-24 px-4">
      <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center  font-bold">
        Top Categories
      </h1>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 pt-10">
        {products.slice(0, 4).map((product) => (
          <div className="flex flex-col gap-3">
            <div className="bg-[#F5F6F8] p-10 cursor-pointer w-full h-full overflow-hidden rounded-full flex items-center hover:border-l-[#9877E7]  hover:border-l-8 transition-[transform,colors] duration-700">
              <Image
                src={product.images[0]}
                alt={product.name}
                height={1000}
                width={1000}
                className="transition-transform hover:scale-105 duration-700  hover:rounded-md object-contain "
              />
            </div>
            <h1 className="font-josifen font-bold text-center ">
              {product.name}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
}
