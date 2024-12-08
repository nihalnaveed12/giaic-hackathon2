import Image from "next/image";
import { Dot } from "lucide-react";
import { Button } from "./ui/button";

export default function HomeSec() {
  return (
    <section className="bg-[#F1F0FF] px-4 py-4">
      <div className="max-w-screen-xl mx-auto flex gap-5 items-center lg:flex-row px-4 flex-col">
        <Image
          src="/HomeSec.png"
          alt="Home products"
          width={1000}
          height={1000}
          className="w-[558px]"
        />

        <div className="flex flex-col gap-6">
          <h1 className="text-[#151875] font-semibold text-[35px] font-josifen">
            Unique Features Of Latest & Trending Products
          </h1>

          <ul className="flex flex-col gap-3 text-[#ACABC3]">
            <li className="flex items-center">
              <Dot size={50} strokeWidth={4} className="text-[#F52B70]" />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                consequatu
              </span>
            </li>
            <li className="flex items-center">
              <Dot size={50} strokeWidth={4} className="text-[#2BF5CC]" />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                consequatu
              </span>
            </li>
            <li className="flex items-center">
              <Dot size={50} strokeWidth={4} className="text-[#2B2BF5]" />
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                consequatu
              </span>
            </li>
          </ul>
          <div className="flex gap-10 items-center ">
            <Button className="bg-[#FB2E86] font-josifen text-white w-[157px] hover:bg-pink-500">
              Add To Cart
            </Button>
            <div className="">
                <h5 className="text-[#151875] font-josifen font-semibold text-[14px]">B&B SOFA</h5>
                <p className="text-[#151875] font-josifen text-[14px]"> $4400</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
