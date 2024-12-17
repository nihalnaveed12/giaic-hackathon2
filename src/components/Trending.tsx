import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
export default function Trending() {
  return (
    <section className="max-w-screen-xl mx-auto pt-24 px-4">
      <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center  font-bold">
        Trending Products
      </h1>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2  grid-cols-1 pt-12 gap-6">
        {products.slice(4, 8).map((product) => (
          <Link href={`/shop/${product.id}`} className="shadow-md p-2 flex flex-col" key={product.id}>
            <div className="bg-[#F5F6F8] p-2 cursor-pointer w-full h-full overflow-hidden flex justify-center items-center ">
              <Image
                src={product.images[0]}
                alt={product.name}
                height={1000}
                width={1000}
                className="transition-transform hover:scale-105 duration-700  hover:rounded-md object-contain "
              />
            </div>

            <div className="flex justify-center flex-col gap-4 items-center pt-4">
              <h1 className="font-lato font-bold text-[16px] text-[#151875]">
                {product.name}
              </h1>
              <div className="">
                <span className="mr-2">${product.price}</span>
                <span className="font-light">${product.price - 1000}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pt-6 grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 xl:gap-16">
        <div className="flex bg-[#FFF6FB] xl:w-[420px]  justify-between p-4 ">
          <div className="">
            <h2 className="font-josifen text-[#151875] font-semibold text-[26px]">
              23% ff in all products
            </h2>
            <Link href={`/products`} className="text-[#FB2E86] font-lato text-[16px]">Shop Now</Link>
          </div>
          <Image
            src="/speaker.png"
            alt="speaker"
            height={1000}
            width={1000}
            className="w-[213px] "
          ></Image>
        </div>

        <div className="flex bg-[#EEEFFB] xl:w-[420px] h-full  justify-between p-4 ">
          <div className="">
            <h2 className="font-josifen text-[#151875] font-semibold text-[26px]">
              23% ff in all products
            </h2>
            <Link href={`/shop`} className="text-[#FB2E86] font-lato text-[16px]">
              View Collection
            </Link>
          </div>
          <Image
            src="/table.png"
            alt="speaker"
            height={1000}
            width={1000}
            className="w-[213px]"
          ></Image>
        </div>

        <div className="flex flex-col gap-3">
          {products.slice(0, 3).map((product) => (
            <Link href={`/shop/${product.id}`} className="flex gap-3 items-center" key={product.id}>

            <div className="bg-[#F5F6F8] p-4 items-center flex  cursor-pointer overflow-hidden gap-3 max-w-[267px] max-h-[74px]">
              <Image
                src={product.images[0]}
                alt={product.name}
                height={1000}
                width={1000}
                className="transition-transform hover:scale-105 duration-700  hover:rounded-md object-contain w-[64px] h-[71px]"
              />
            </div>
            <h1 className="font-josifen font-bold">{product.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
