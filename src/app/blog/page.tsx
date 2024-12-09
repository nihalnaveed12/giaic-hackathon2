import { Input } from "@/components/ui/input";
import Image from "next/image";
import { products } from "@/data/products";

export default function Blog() {
  return (
    <div className="">
      <div className=" bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            Blog Page
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <li>Home .</li>
            <li>Pages .</li>
            <li className="text-[#FB2E86]">Blog Page</li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto pt-10 flex gap-10 w-[100%]">
        <div className="flex flex-col gap-10 w-[70%] ">
          <div className="flex flex-col gap-4">
            <Image
              src="/blogp1.png"
              alt="blog"
              height={1000}
              width={1000}
              className="w-[871px]"
            />
            <div className="text-[#151875] flex gap-6 pt-4">
              <h2 className="bg-[#FFE7F9] w-[160px] h-[28px] text-center py-1">
                Nihal Naveed
              </h2>
              <h2 className="bg-[#FFECE2] w-[160px]  h-[28px] text-center py-1">
                November 20 2024
              </h2>
            </div>

            <div className="">
              <h1 className="font-josifen text-[30px] font-bold text-[#151875] pb-4">
                Aenean vitae in aliquam ultrices lectus. Etiam.
              </h1>
              <p className="font-lato text-[16px] text-[#8A8FB9]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                saepe est nulla neque quae quibusdam beatae molestiae eligendi
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, enim. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nobis, alias.
              </p>
            </div>

            <h4 className="text-[#151875] pt-8">Read More</h4>
          </div>

          <div className="flex flex-col gap-4">
            <Image
              src="/blogp2.png"
              alt="blog"
              height={1000}
              width={1000}
              className="w-[871px]"
            />
            <div className="text-[#151875] flex gap-6 pt-4">
              <h2 className="bg-[#FFE7F9] w-[160px] h-[28px] text-center py-1">
                Nihal Naveed
              </h2>
              <h2 className="bg-[#FFECE2] w-[160px]  h-[28px] text-center py-1">
                November 20 2024
              </h2>
            </div>

            <div className="">
              <h1 className="font-josifen text-[30px] font-bold text-[#151875] pb-4">
                Aenean vitae in aliquam ultrices lectus. Etiam.
              </h1>
              <p className="font-lato text-[16px] text-[#8A8FB9]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                saepe est nulla neque quae quibusdam beatae molestiae eligendi
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, enim. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nobis, alias.
              </p>
            </div>

            <h4 className="text-[#151875] pt-8">Read More</h4>
          </div>

          <div className="flex flex-col gap-4">
            <Image
              src="/blogp3.png"
              alt="blog"
              height={1000}
              width={1000}
              className="w-[871px]"
            />
            <div className="text-[#151875] flex gap-6 pt-4">
              <h2 className="bg-[#FFE7F9] w-[160px] h-[28px] text-center py-1">
                Nihal Naveed
              </h2>
              <h2 className="bg-[#FFECE2] w-[160px]  h-[28px] text-center py-1">
                November 20 2024
              </h2>
            </div>

            <div className="">
              <h1 className="font-josifen text-[30px] font-bold text-[#151875] pb-4">
                Aenean vitae in aliquam ultrices lectus. Etiam.
              </h1>
              <p className="font-lato text-[16px] text-[#8A8FB9]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                saepe est nulla neque quae quibusdam beatae molestiae eligendi
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, enim. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nobis, alias.
              </p>
            </div>

            <h4 className="text-[#151875] pt-8">Read More</h4>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="">
            <label
              htmlFor=""
              className="font-josifen text-[#151875] text-[24px]"
            >
              Search
            </label>
            <Input placeholder="search for posts" />
          </div>

          <div className="">
            <h2 className="font-josifen text-[24px] pb-4 font-semibold text-[#151875]">
              Categories
            </h2>
            <ul className="grid grid-cols-2 gap-6 text-[#151875] font-lato ">
              <li className="bg-[#F939BF] text-center py-1 px-4 text-white">
                Hobbies
              </li>
              <li>Women(21)</li>
              <li>Women(21)</li>
              <li>Women(21)</li>
              <li>Women(21)</li>
              <li>Women(21)</li>
            </ul>
          </div>

          <div className="">
            <h2 className="font-josifen text-[24px] pb-4 font-semibold text-[#151875]">
              Recent Posts
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Image
                  src="/blogp1.png"
                  alt="blog"
                  width={1000}
                  height={1000}
                  className="w-[70px] h-[51px]"
                />
                <div className="">
                  <h2 className="text-[#151875] text-[16px] font-lato font-semibold">
                    Its a long time to established fact
                  </h2>
                  <h2 className="text-[12px] text-slate-400">
                    November 20 2024
                  </h2>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/blogp2.png"
                  alt="blog"
                  width={1000}
                  height={1000}
                  className="w-[70px] h-[51px]"
                />
                <div className="">
                  <h2 className="text-[#151875] text-[16px] font-lato font-semibold">
                    Its a long time to established fact
                  </h2>
                  <h2 className="text-[12px] text-slate-400">
                    November 20 2024
                  </h2>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/blog3.png"
                  alt="blog"
                  width={1000}
                  height={1000}
                  className="w-[70px] h-[51px]"
                />
                <div className="">
                  <h2 className="text-[#151875] text-[16px] font-lato font-semibold">
                    Its a long time to established fact
                  </h2>
                  <h2 className="text-[12px] text-slate-400">
                    November 20 2024
                  </h2>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/blog2.png"
                  alt="blog"
                  width={1000}
                  height={1000}
                  className="w-[70px] h-[51px]"
                />
                <div className="">
                  <h2 className="text-[#151875] text-[16px] font-lato font-semibold">
                    Its a long time to established fact
                  </h2>
                  <h2 className="text-[12px] text-slate-400">
                    November 20 2024
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="font-josifen text-[24px] pb-4 font-semibold text-[#151875]">
              Sale Product
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                <Image
                  src="/blogp1.png"
                  alt="blog"
                  width={1000}
                  height={1000}
                  className="w-[70px] h-[50px]"
                />
                <div className="">
                  <h2 className="text-[#151875] text-[16px] font-lato font-semibold">
                    Its a long time to established fact
                  </h2>
                  <h2 className="text-[12px] text-slate-400">
                    November 20 2024
                  </h2>
                </div>
              </div>

              <div className="flex gap-2">
                <Image
                  src="/blogp2.png"
                  alt="blog"
                  width={1000}
                  height={1000}
                  className="w-[70px] h-[50px]"
                />
                <div className="">
                  <h2 className="text-[#151875] text-[16px] font-lato font-semibold">
                    Its a long time to established fact
                  </h2>
                  <h2 className="text-[12px] text-slate-400">
                    November 20 2024
                  </h2>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  src="/blog2.png"
                  alt="blog"
                  width={1000}
                  height={1000}
                  className="w-[70px] h-[50px]"
                />
                <div className="">
                  <h2 className="text-[#151875] text-[16px] font-lato font-semibold">
                    Its a long time to established fact
                  </h2>
                  <h2 className="text-[12px] text-slate-400">
                    November 20 2024
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="font-josifen text-[24px] pb-4 font-semibold text-[#151875]">
              Offer Product
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {products.slice(0,4).map((product) => (
                <div className="flex flex-col items-center gap-3" key={product.id}>
                  <Image src={product.images[0]} alt={product.name} width={1000} height={1000} className="w-[126px] bg-slate-100"/>
                  <div className="text-center">
                  <h2 className="text-[#151875] text-[12px] font-lato font-semibold">
                    {product.name}
                  </h2>
                  <h2 className="text-[10px] text-slate-400">
                    {product.price} - {product.price - 1000}
                  </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="">
          <h2 className="font-josifen text-[24px]  font-semibold text-[#151875]">
              Follow
           </h2>
      
           <Image src="/social.png" alt="scials" width={1000} height={1000} className="w-[200px] "/>

          </div>

          <div className="">
          <h2 className="font-josifen text-[24px] pb-4  font-semibold text-[#151875]">
              Tags
           </h2>

           <ul className="text-[#151875] underline grid grid-cols-3 gap-2">
            <li>General</li>
            <li className="text-[#FB2E86] underline">Atsanil</li>
            <li>Inas</li>
            <li>Bibbas</li>
            <li>Nuvalla</li>
           </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
