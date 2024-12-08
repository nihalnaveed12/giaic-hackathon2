import { products } from "@/data/products";
import Image from "next/image";
import { Heart, ShoppingCart, ZoomIn } from "lucide-react";
export default function LatestProduct() {
  return (
    <section className="max-w-screen-xl mx-auto py-36 px-4">
      <div className="flex flex-col gap-6">
        <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center  font-bold">
          Latest Products
        </h1>
        <ul className="grid sm:grid-cols-4 grid-cols-2  place-items-center gap-16 font-lato justify-center">
          <li className="text-[#FB4997]">New Arrival</li>
          <li>Best Seller</li>
          <li>Featured</li>
          <li>Special Offer</li>
        </ul>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-10 ">
        {products.slice(0, 6).map((product) => (
          <div className="group relative h-[360px] my-6" key={product.id}>
            <div className="bg-[#F6F7FB] group-relative cursor-pointer w-full h-full overflow-hidden flex justify-center items-center ">
              <div
                className={`absolute bottom-4 left-2 group-hover:flex flex-col gap-2 hidden`}
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
                className="transition-transform hover:scale-105 duration-700  hover:rounded-md object-contain w-[223px] "
              />

            </div>
            <div className="pt-3 flex justify-between">
                <h4>{product.name}</h4>
                <div className="flex gap-2 font-josifen">
                    <p>${product.price}</p>
                    <p className="text-[#FB2448]">${product.price - 1000}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
