import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Facebook , Instagram ,Linkedin} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 pt-10 bg-[#F1F0FF] ">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-6 px-4">

          <div className="flex flex-col gap-6">
            <h1 className="font-josifen font-bold text-[34px]">Hekto</h1>
            <div className="w-[60%] flex items-center">
              <Input
                type="text"
                placeholder="Type your email"
                className="border-none px-2 py-3"
              />
              <Button className="bg-[#FB2E86] hover:bg-[#f563a2] font-josifen text-white w-[135px]">
                Sign Up
              </Button>
            </div>
            <div className="flex flex-col gap-2 text-[#8A8FB9]">
              <h4>Contact info</h4>
              <h4>Lorem ipsum dolor, sit amet consectetur adipisicing</h4>
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <div className="flex flex-col gap-6 ">
              <h3 className="font-semibold">Categories</h3>
              <ul className="flex flex-col gap-3 text-[#8A8FB9]">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="font-semibold">Categories</h3>
              <ul className="flex flex-col gap-3 text-[#8A8FB9]">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="font-semibold">Categories</h3>
              <ul className="flex flex-col gap-3 text-[#8A8FB9]">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>
          
        </div>

      </div>
       
       <div className="bg-[#E7E4F8]">

       <div className="max-w-screen-xl mx-auto mt-10 py-4 px-4 sm:flex-row flex-col gap-4 flex justify-between" >
        <h1>&copy;Hekto All Right Reserved</h1>
         <ul className="flex gap-2 cursor-pointer">
          <li><Facebook /></li>
          <li><Instagram /> </li>
          <li><Linkedin /></li>
         </ul>
       </div>
       </div>

    </footer>
  );
}
