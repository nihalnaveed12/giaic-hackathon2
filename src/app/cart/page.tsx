import { products } from "@/data/products";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function CartPage() {
  return (
    <div className="">
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

      <div className="container mx-auto px-4 py-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="hidden md:grid md:grid-cols-5 gap-4 font-josifen text-[20px] font-bold text-[#101750] text-sm  mb-4">
                <div className="col-span-2">Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
              </div>

              {products.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center border-b border-gray-200 pb-4"
                >
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="md:hidden font-medium text-gray-500">
                      Price:{" "}
                    </span>
                    ${product.price.toFixed(2)}
                  </div>
                  <div>
                    Quantity:
                    {"  "}
                    <span>2</span>
                  </div>
                  <div className="text-sm">
                    <span className="md:hidden font-medium text-gray-500">
                      Total:{" "}
                    </span>
                    {product.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button className="bg-[#FB2E86] text-white hover:bg-pink-500">
                Update Cart
              </Button>
              <Button className="bg-[#FB2E86] text-white hover:bg-pink-500">
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="mt-8 lg:mt-0">
            <h1 className="text-lg mb-8 font-josifen text-[20px] font-bold text-center text-[#101750]">
              Cart Totals
            </h1>

            <Card className="bg-[#f4f2fc] shadow-none outline-none border-none">
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div className="flex justify-between border-b-gray-300 border-b pb-4">
                    <span className="font-medium text-[#101750]">Subtotal</span>
                    <span className="text-[#101750]">$4000</span>
                  </div>
                  <div className="flex justify-between border-b-gray-300 border-b pb-4 font-medium">
                    <span>Total</span>
                    <span>$5000</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    {/* <Checkbox className="w-[8px] h-[8px] outline-none border-none bg-[#19D16F] checked:bg-[#19D16F]" /> */}
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="accent-[#19D16F] text-white"
                      checked
                    />
                    <h5 className="text-[#8A91AB] font-lato text-[12px]">
                      Shipping and taxes calculating at checkout time
                    </h5>
                  </div>
                </div>

                <Button className="w-full bg-[#19D16F] text-white hover:bg-[#19D46F] mt-8">
                  Proceed to checkout
                </Button>
              </CardContent>
            </Card>

            <div className="">
              <h1 className="text-lg my-8 font-josifen text-[20px] font-bold text-center text-[#101750]">
                Calculate Shipping
              </h1>
              <div className="space-y-10 mt-4 bg-[#f4f2fc] p-6">
                <Input
                  placeholder="Enter your City"
                  className="border-none pb-4"
                />
                <Input
                  placeholder="Enter your address"
                  className="border-none pb-4"
                />
                <Input
                  placeholder="Enter your postal code"
                  className="border-none border-b"
                />
                <Button className="w-[179px] bg-[#FB2E86] hover:bg-pink-500 font-josifen text-white">
                  Calculate Shipping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
