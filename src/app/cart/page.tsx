"use client";
import Image from "next/image";
import { CartItem } from "@/redux/types";
import { removeFromCart, clearCart } from "@/redux/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { X } from "lucide-react";

export default function CartPage() {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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

              {items.length === 0 && <div>Your cart is empty</div>}

              {items.map((product: CartItem) => (
                <div
                  key={product._id}
                  className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center border-b border-gray-200 pb-4"
                >
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.image.asset.url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className="absolute left-0 bg-red-500 rounded-lg cursor-pointer"
                        onClick={() => handleRemove(product._id)}
                      >
                        <X className="w-4 h-4" color="white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.category?.title}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="md:hidden font-medium text-gray-500">
                      Price:{" "}
                    </span>
                    ${product.price}
                  </div>
                  <div>{product.stockLevel}</div>
                  <div className="text-sm">
                    <span className="md:hidden font-medium text-gray-500">
                      Total:{" "}
                    </span>
                    {product.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 ">
              {items.length > 0 && (
                <Button
                  className="bg-[#FB2E86] text-white hover:bg-pink-500"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              )}
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
                    <span className="text-[#101750]">{0}</span>
                  </div>
                  <div className="flex justify-between border-b-gray-300 border-b pb-4 font-medium">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="accent-[#19D16F]"
                    />
                    <h5 className="text-[#8A91AB] font-lato text-[12px]">
                      Shipping and taxes calculating at checkout time
                    </h5>
                  </div>
                </div>

                <Link href={`/checkout`}>
                  <Button className="w-full bg-[#19D16F] px-4 py-2 text-white hover:bg-[#19D46F] mt-8">
                    Proceed to checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
