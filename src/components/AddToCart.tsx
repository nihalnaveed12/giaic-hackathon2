"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { Products } from "@/redux/types";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ToastAction } from "./ui/toast";

type PropTypes = {
  product: Products;
  className?: string;
  children: ReactNode;
};

export default function AddToCart(prop: PropTypes) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!prop.product) {
      throw new Error("Hello world");
    }

    const productItem: Products = {
      _id: prop.product._id,
      name: prop.product.name,
      price: prop.product.price,
      image: prop.product.image,
      category: prop.product.category,
    };
    dispatch(addToCart(productItem));
    console.log(productItem);
    toast({
      title: `${prop.product.name}`,
      description: "Product Successfully added to cart",
      action: (
        <ToastAction
          altText="Check your cart"
          className="bg-[#FB2E86] text-white hover:bg-pink-500"
        >
          <Link href={"/cart"}>Check your cart</Link>
        </ToastAction>
      ),
      className: "bg-white text-lg font-lato font-semibold top-0 right-0 fixed md:max-w-[420px] md:top-4 md:right-4",
      
    });
  };
  return (
    <Button className={prop.className} onClick={handleAddToCart}>
      {prop.children}
    </Button>
  );
}
