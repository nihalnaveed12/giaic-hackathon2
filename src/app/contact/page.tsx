import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="">
      <div className=" bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            Contact Us
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <li>Home .</li>
            <li>Pages .</li>
            <li className="text-[#FB2E86]">Contact Us</li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto pt-10 flex flex-col gap-24 px-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-[36px] font-josifen  text-[#151875] font-bold">
              Information About Us
            </h1>
            <p className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              provident natus unde. Nobis similique ipsa aliquam autem, rerum
              aperiam pariatur saepe itaque error cumque? Aspernatur fugit optio
              illum facere nisi.
            </p>
            <div className="flex w-[103px] items-center justify-center gap-6">
              <div className="w-[70px] h-[20px] bg-[#00009D] rounded-full" />
              <div className="w-[70px] h-[20px] bg-[#05E6B7] rounded-full" />
              <div className="w-[70px] h-[20px] bg-[#F701A8] rounded-full" />
            </div>
          </div>

          <div className="">
            <h1 className="text-[36px] pb-4 font-josifen text-[#151875] font-bold">
              Contact Way
            </h1>
            <ul className="grid sm:grid-cols-2 grid-cols-1 gap-6">
              <li className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] bg-[#00009D] rounded-full" />
                <div className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
                  <p>Lorem ipsum dolor </p>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] bg-[#e43ed6] rounded-full" />
                <div className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
                  <p>Lorem ipsum dolor </p>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] bg-[#e9ec2e] rounded-full" />
                <div className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
                  <p>Lorem ipsum dolor </p>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] bg-[#f52828] rounded-full" />
                <div className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
                  <p>Lorem ipsum dolor </p>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex xl:flex-row flex-col gap-10">
          <div className="">
            <h1 className="text-[36px] font-josifen  text-[#151875] font-bold">
              Get In Touch
            </h1>
            <p className="font-josifen font-semibold text-[16px] text-[#A9ACC6]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              provident natus unde. Nobis similique ipsa aliquam autem, rerum
              aperiam pariatur saepe itaque error cumque? Aspernatur fugit optio
              illum facere nisi.
            </p>
            <form action="" className="text-slate-400 flex flex-col gap-6 pt-8">
              <div className="flex gap-4 w-full">
                <Input
                  placeholder="Your Name"
                  className=" w-[50%] border-slate-400"
                />
                <Input
                  placeholder="Your Email"
                  className=" w-[50%] border-slate-400 "
                />
              </div>

              <Input
                placeholder="Subject"
                className="w-[100%] border-slate-400"
              />

              <textarea
                id="2"
                name="text"
                rows={5}
                cols={9}
                
                className="border-slate-400 border max-h-[166px] max-w-[534px] p-2"
              >
                Hi,
              </textarea>

              <Button
                type="submit"
                className="w-[157px] font-josifen bg-[#FB2E86] text-white hover:bg-pink-500"
              >
                Submit
              </Button>
            </form>
          </div>

          <Image src="/contact.png" alt="contact" height={1000} width={1000} className="w-[600px]"/>
        </div>
      </div>
    </div>
  );
}
