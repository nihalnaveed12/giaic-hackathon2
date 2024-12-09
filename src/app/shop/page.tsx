import { Input } from "@/components/ui/input";
import { LayoutGrid, List } from "lucide-react";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
export default function Shop() {
  return (
    <div className="">
      <div className=" bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            Shop Grid Default
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <li>Home .</li>
            <li>Pages .</li>
            <li className="text-[#FB2E86]">Shop Grid Default</li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto py-12 px-4">

        <div className="flex justify-between gap-4 lg:flex-row flex-col">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] font-bold font-josifen text-[#151875]">
              Ecommerce Acceories & Fashion item
            </h1>
            <h4 className="text-[#8A8FB9] font-lato text-[12px]">
              About 9,620 results (0.62 seconds)
            </h4>
          </div>

          <div className="flex md:flex-row flex-col gap-6 ">
            <div className="flex gap-2 items-center">
              <label htmlFor="page" className="font-lato text-[16px]">
                Per Page:
              </label>
              <Input className="w-[50px]" />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="page" className="font-lato text-[16px]">
                Sort By:
              </label>
              <Input className="w-[96px]" placeholder="Best Match" />
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex gap-1">
                <label htmlFor="" className="font-lato text-[16px]">
                  View:
                </label>
                <LayoutGrid className="w-[20px]" />
                <List className="w-[20px] " />
              </div>

              <Input className="w-[162px]"></Input>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-y-20 gap-x-6 pt-16 ">
          {products.map((product) => (
            <Link href={`/shop/${product.id}`} className="flex flex-col gap-4 items-center" key={product.id}>
              <div className="bg-[#F5F6F8] p-4 items-center flex justify-center w-[270px]   cursor-pointer overflow-hidden gap-3">
                <Image
                  src={product.images[0]}
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
                  <div className="w-[12px] h-[12px] bg-[#F701A8] rounded-full"/>
                </div>
                <div className="flex gap-1">
                    <span className="text-[#151875]">${product.price}</span>
                    <span className="text-[#FB2E86]">${product.price - 1000}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
       
        <div className="flex justify-center pt-16">
        <Image src="/brands.png" alt="brand" width={1000} height={1000} className="w-[80%]"></Image>
       </div>

      </div>
    </div>
  );
}