import { products } from "@/data/products";
import Image from "next/image";
export default function Cart() {
  return (
    <div className="">
        <h1 className="text-center py-12 text-2xl font-bold">Work In Progress</h1>
      <div className=" bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            Shopping Cart
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <li>Home .</li>
            <li>Pages .</li>
            <li className="text-[#FB2E86]">Shopping Cart</li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto pt-12">
        <div className="grid grid-cols-2">

          <div className="flex flex-col ">
            <ul className="flex gap-36 font-josifen font-bold text-[20px] text-[#1D3178]">
              <li className="mr-28">Product</li>
              <li>Price</li>
              <li>Quantity</li>
              <li>Total</li>
            </ul>
            <div className="pt-12 flex flex-col divide-y ">
              {products.slice(0, 5).map((product) => (
                <div className="py-10 ">
                  <ul className="flex gap-36 items-center">
                    <li className="flex gap-3">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        height={1000}
                        width={1000}
                        className="w-[83px] mr-10 "
                      />
                      <div className="flex flex-col gap-1">
                        <h2>Home Chair</h2>
                        <h4>{product.category}</h4>
                        <h4>Size 2xl</h4>
                      </div>
                    </li>
                    <li>${product.price}</li>
                    <li>10</li>
                    <li>${product.price * 4}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          
          
        </div>
      </div>
    </div>
  );
}
