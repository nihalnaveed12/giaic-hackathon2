import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-32  my-24">
      
      <div className="absolute inset-0 ">
        <Image
          src="/NesSec.png"
          alt="Agriculture background"
          className="object-cover object-center w-full h-full"
          quality={100}
          width={1000}
          height={1000}

        />
        <div className="absolute inset-0 opacity-30 " />
      </div>
      
      <div className="container relative mx-auto px-4 flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="mb-2 text-center text-2xl font-semibold tracking-tight md:text-3xl font-josifen text-[#151875]">
            Get Latest Update By Subscribe Our Newslater
          </h2>
          <Button size="lg" className="bg-[#FB2E86] hover:bg-pink-600 text-white font-josifen">
            Shop Now
          </Button>
        </div>  
    </div>

      
    </section>
  )
}

