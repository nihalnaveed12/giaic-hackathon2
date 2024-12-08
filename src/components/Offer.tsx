import Image from "next/image";

export default function Offer() {
  const Offers = [
    {
      name: "24/7 Support",
      src: "/cashback 1.png",
      summary:
        "As there are many languages in the World, you can choose from a variety of base texts so you cover",
    },
    {
      name: "24/7 Support",
      src: "/7.png",
      summary:
        "As there are many languages in the World, you can choose from a variety of base texts so you cover",
    },
    {
      name: "24/7 Support",
      src: "/free.png",
      summary:
        "As there are many languages in the World, you can choose from a variety of base texts so you cover",
    },
    {
      name: "24/7 Support",
      src: "/premium.png",
      summary:
        "As there are many languages in the World, you can choose from a variety of base texts so you cover",
    },
  ];

  return (
    <section className="max-w-screen-xl mx-auto px-7">
      <h1 className="text-[#151875] font-josifen text-3xl font-bold text-center">
        What Shoppex Offer!
      </h1>
      <div className="grid lg:grid-cols-4 gap-4 py-10 md:grid-cols-2">
        {Offers.map((offer) => (
          <div className="flex flex-col items-center shadow-lg px-4 py-10 gap-4" key={offer.name}>
            <Image
              src={offer.src}
              height={1000}
              width={1000}
              alt="offers"
              className="w-[65px]"
            />
            
            <h1 className="text-[#151875] font-semibold">{offer.name}</h1>
            <p className="font-lato font-bold text-[16px] text-slate-400 text-center">{offer.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
