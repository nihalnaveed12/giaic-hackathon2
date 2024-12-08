import {
  Mail,
  PhoneCall,
  ChevronDown,
  User,
  Heart,
  ShoppingCart,
} from "lucide-react";
export default function HeadingBar() {
  return (
    <header className="h-[44px] bg-[#7E33E0] shadow-zinc-300 shadow-sm w-full px-4">
      
      <div className="max-w-screen-lg mx-auto text-[16px] font-josifen text-[#F1F1F1] flex justify-between pt-3 gap-2">

        <div className="md:flex gap-10 hidden">
          <div className="flex gap-2">
            <Mail className="w-[16px]" />
            <h5>nihalnaveed50@gmail.com</h5>
          </div>
          <div className="flex gap-2">
            <PhoneCall className="w-[16px]" />
            <h5>03128050626</h5>
          </div>
        </div>

        <div className="flex gap-4 ">
          <div className="flex cursor-pointer gap-1">
            <h6>English</h6>
            <ChevronDown className="w-[16px]" />
          </div>
          <div className="flex cursor-pointer gap-1">
            <h6>USD</h6>
            <ChevronDown className="w-[16px]" />
          </div>
          <div className="md:flex cursor-pointer gap-1 hidden">
            <h6>Login</h6>
            <User className="w-[16px]" />
          </div>
          <div className="md:flex cursor-pointer gap-1 hidden">
            <h6>Wishlist</h6>
            <Heart className="w-[16px]" />
          </div>
              
          <ShoppingCart className="md:block hidden md:ml-3 w-[24px]" />
        </div>
        <ShoppingCart className="md:hidden md:ml-4 w-[24px]" />

      </div>
    </header>
  );
}
