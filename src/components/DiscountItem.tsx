import Image from "next/image";

import { Button } from "./ui/button";
export default function Discount() {
  return (
    <section className="max-w-screen-xl mx-auto pt-24">
      <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center  font-bold">
        Discount Items
      </h1>
      
      <ul className="flex gap-6 items-center justify-center pt-4 font-lato">
        <li className="text-[#FB4997] underline">Wood Chair</li>
        <li>Platic Chair</li>
        <li>Sofa Collection</li> 
      </ul>
      <div className="max-w-screen-xl mx-auto flex gap-5 items-center lg:flex-row px-4 flex-col">

        <div className="flex flex-col gap-6 pt-6">
          <h1 className="text-[#151875] font-semibold text-[35px] font-josifen">
            Unique Features Of Latest & Trending Products
          </h1>
          <h4 className="text-pink-500 font-josifen">Eams Sofa Compact</h4>
          <p className="text-[#ACABC3]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, iusto?Lorem ipsum dolor sit amet.</p>
          <ul className="grid sm:grid-cols-2 grid-cols-1 gap-3 text-[#ACABC3]">
            <li className="flex items-center">
              
              <span>
                Lorem ipsum dolor sit amet consectetur 
              </span>
            </li>
            <li className="flex items-center">
              
              <span>
                Lorem ipsum dolor sit amet consectetur 
              </span>
            </li>
            <li className="flex items-center">
              
              <span>
                Lorem ipsum dolor sit amet consectetur 
              </span>
            </li>
            <li className="flex items-center">
              
              <span>
                Lorem ipsum dolor sit amet consectetur
              </span>
            </li>
          </ul>
          <div className="">
            <Button className="bg-[#FB2E86] font-josifen text-white w-[157px] hover:bg-pink-500">
             Shop Now
            </Button>
          </div>
        </div>
        <Image
          src="/discount.png"
          alt="Home products"
          width={1000}
          height={1000}
          className="w-[558px]"
        />
      </div>
    </section>
  );
}
