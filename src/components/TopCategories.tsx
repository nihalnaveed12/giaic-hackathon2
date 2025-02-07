

import Image from "next/image";
import Link from "next/link";

export interface Category {
  _id: string; // The unique ID for the category document
  title: string; // The title of the category
  description: string; // A brief description of the category
  imageUrl: string; // The URL of the category image
}

export default function TopCat({ categories }: { categories: Category[] }) {
  const param = new URLSearchParams();

  return (
    <section className="max-w-screen-xl mx-auto pt-24 px-4" id="category">
      <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center  font-bold">
        Top Categories
      </h1>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 pt-10">
        {categories.map((category) => {
          param.set("category" , category.title);
          return (
            <Link
              href={`/shop?category=${category.title}`}
              className="flex flex-col gap-3"
              key={category._id}
            >
              <div className="rounded-full overflow-hidden border-l-purple-500 border-l-8 border border-purple-500 hover:border-x-8 cursor-pointer">
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  height={1000}
                  width={1000}
                  className="transition-transform hover:scale-125 duration-700 object-cover object-center h-[280px] w-[300px]"
                />
              </div>

              <h1 className="font-josifen font-bold text-center ">
                {category.title}
              </h1>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
