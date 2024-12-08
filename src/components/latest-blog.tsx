import Image from "next/image";

export default function Latest() {
  const blogs = [
    {
      name: "Nihal",
      date: "12/3/24",
      title: "Top Essential trends in 2024",
      src: "/blog1.png",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, iusto?Lorem ipsum dolor sit amet.",
    },
    {
      name: "Zayaan",
      date: "12/3/24",

      src: "/blog2.png",
      title: "Top Essential trends in 2024",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, iusto?Lorem ipsum dolor sit amet.",
    },
    {
      name: "Ayaan",
      src: "/blog3.png",
      date: "12/3/24",
      title: "Top Essential trends in 2024",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, iusto?Lorem ipsum dolor sit amet.",
    },
  ];
  return (
    <section className="max-w-screen-xl mx-auto pt-20 px-4">
      <h1 className="text-[#1A0B5B] font-josifen text-3xl text-center  font-bold">
        Latest Blog
      </h1>
      <div className="grid sm:grid-cols-3 gap-6 pt-8">
        {blogs.map((blog , index) => (
          <div className="shadow-md" key={index}>
            <Image
              src={blog.src}
              alt={blog.title}
              height={2000}
              width={1000}
              className=""
            />
           <div className="p-4 flex flex-col gap-4">
            <div className="flex gap-4 font-josifen  text-[#151875]">
                <h2>{blog.name}</h2>
                <p>{blog.date}</p>
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="font-josifen font-bold text-[#151875] text-[24px]">{blog.title}</h1>
                <p className="text-[#72718F]">{blog.para}</p>
            </div>

            <p className="underline text-[#151875] font-lato">Readmore</p>
           </div>

          </div>
        ))}
      </div>
    </section>
  );
}
