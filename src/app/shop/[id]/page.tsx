"use client";
import { useParams } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";
import Rating from "@/components/ui/Rating";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Product() {
  const { id } = useParams();
  const product = products.find((product) => product.id === Number(id));
  if (!product) {
    return <h1>Product Not Found!</h1>;
  }
  return (
    <div className="">
      <div className=" bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            Product Details
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <li>Home .</li>
            <li>Pages .</li>
            <li className="text-[#FB2E86]">Product Details</li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto py-12 px-4">
        <div className="shadow-xl lg:flex-row flex-col p-2 flex min-h-[460px] gap-6">

          <div className="flex lg:flex-row flex-col gap-3 lg:w-[50%] ">

            <div className="flex flex-row lg:flex-col gap-4 w-[30%] ">
              <Image
                src={product.images[1]}
                alt={product.name}
                width={1000}
                height={1000}
                className="bg-slate-200 "
              />
              <Image
                src={product.images[2]}
                alt={product.name}
                width={1000}
                height={1000}
                className="bg-slate-200"
              />
              <Image
                src={product.images[3]}
                alt={product.name}
                width={1000}
                height={1000}
                className="bg-slate-200"
              />
            </div>

            
              <Image
                src={product.images[0]}
                alt={product.name}
                width={1000}
                height={1000}
                className=" bg-slate-200 lg:w-[70%]"
              />
          
          </div>

          <div className="py-4 flex flex-col gap-3">
            <h1 className="text-[#0D134E] font-josifen font-semibold text-[36px]">
              {product.name}
            </h1>
            <div className="flex gap-2 items-center">
              <Rating
                initialValue={product.rating}
                allowFraction
                SVGclassName="inline-block"
                emptyClassName="fill-gray-50"
                size={19}
                readonly
              />
              <p className="mt-1 text-zinc-600">{product.rating}</p>
            </div>
            <div className="flex gap-4">
              <span className="text-[#151875]">${product.price}</span>
              <span className="text-[#FB2E86]">${product.price - 1000}</span>
            </div>
            <p>Color</p>
            <p className="font-josifen font-semibold text-[#A9ACC6]">
              {product.shortSummary}
            </p>
            <Button className="w-[200px] text-[#151875] font-josifen">
              Add To Cart
            </Button>
            <ul className="flex gap-4 flex-col text-[#151875] font-josifen">
              <li>Categories</li>
              <li>Tags</li>
              <li>Share</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#F9F8FE] px-4 py-12">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-6">
          <ul className="flex sm:flex-row flex-col gap-16 font-josifen font-semibold text-[24px] text-[#151875]">
            <li>Description</li>
            <li>Additional Info</li>
            <li>Reviews</li>
            <li>Video</li>
          </ul>

          <div className="">
            <h4 className="text-[24px] pb-4 text-[#151875] font-semibold">
              Various Temper
            </h4>
            <p className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              provident natus unde. Nobis similique ipsa aliquam autem, rerum
              aperiam pariatur saepe itaque error cumque? Aspernatur fugit optio
              illum facere nisi.
            </p>
          </div>

          <div className="">
            <h4 className="text-[24px] pb-4 text-[#151875] font-semibold">
              More Details
            </h4>
            <ul className="flex flex-col gap-4 ">
              <li className="flex gap-3">
                <ArrowRight />
                <h5 className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugiat, quas!
                </h5>
              </li>
              <li className="flex gap-3">
                <ArrowRight />
                <h5 className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugiat, quas!
                </h5>
              </li>
              <li className="flex gap-3">
                <ArrowRight />
                <h5 className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugiat, quas!
                </h5>
              </li>
              <li className="flex gap-3">
                <ArrowRight />
                <h5 className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fugiat, quas!
                </h5>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto pt-10 px-4">
        <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
          Related Products
        </h1>

        <div className="grid lg:grid-cols-4 grid-cols-1 gap-y-6 place-items-center md:place-items-start  md:grid-cols-2 pt-6">
          {products.slice(0, 4).map((product) => (
            <Link
              href={`/shop/${product.id}`}
              className="flex flex-col gap-4 "
              key={product.id}
            >
              <div className="bg-[#F5F6F8] p-4 items-center flex justify-center w-[270px] h-[300px]  cursor-pointer overflow-hidden gap-3">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  height={1000}
                  width={1000}
                  className="transition-transform hover:scale-105 duration-700  hover:rounded-md object-contain w-[154px] h-[158px] "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-josifen text-sm font-bold text-[#151875]">
                  {product.name}
                </h1>
                <div className="">
                  <Rating
                    initialValue={product.rating}
                    allowFraction
                    SVGclassName="inline-block"
                    emptyClassName="fill-gray-50"
                    size={19}
                    readonly
                  />
                </div>
                <div className="flex gap-1">
                  <span className="text-[#151875]">${product.price}</span>
                  <span className="text-[#FB2E86]">
                    ${product.price - 1000}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-16">
        <Image
          src="/brands.png"
          alt="brand"
          width={1000}
          height={1000}
          className="w-[80%]"
        ></Image>
      </div>
    </div>
  );
}
