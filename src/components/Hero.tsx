import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { Diamond } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#F2F0FF] ">
      <div className="max-w-screen-2xl mx-auto flex items-center lg:items-start lg:flex-row flex-col gap-3 px-4">
        <div className="flex ">
          <div className="hidden lg:block">
            <Image
              src="/HeroImg/image1.png"
              alt="home"
              height={1000}
              width={1000}
              className="w-[387px]"
            />
          </div>

          <div className="flex flex-col justify-center pt-24 gap-2 lg:items-start items-center text-center lg:text-start">
            <h5 className="font-lato text-[16px] font-semibold text-[#FB2E86]">
              Best Furniture for Your Castle...
            </h5>
            <h1 className="font-josifen font-bold text-[53px]">
              New Furniture Collection Trends in 2025
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Dolor esse
              tempora officia{" "}
            </p>
            <Button className="w-[163px] h-[50px] bg-[#FB2E86] rounded-md text-white font-josifen hover:bg-pink-600">
              <Link href="/shop" className="font-semibold text-[16px]">Shop Now</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center py-10">
          <Image
            src="/HeroImg/sofa.png"
            alt="home"
            height={1000}
            width={1000}
            className=" w-[760px] "
          />
        </div>
      </div>

      <div className="flex gap-1 justify-center items-center cursor-pointer py-10">
         <Diamond className="text-[#fb2e86] w-[12px]"/>
         <Diamond className="text-[#fb2e86] w-[12px]"/>
         <Diamond className="text-[#fb2e86] w-[12px]"/>
      </div>
    </section>
  );
}
