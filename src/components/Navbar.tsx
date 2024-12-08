
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


export default function Navbar() {

 
  const navItem = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Pages",
      href: "/pages",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];
  return (
    <div className="pt-2 px-4">
      <nav className="max-w-screen-lg mx-auto ">
        <div className="flex justify-between">
          <div className="flex gap-16 items-center">
            <h1 className="font-josifen font-bold text-[34px]">Hekto</h1>
            <ul className="md:flex gap-6 hidden">
              {navItem.map((nav) => (
                <li key={nav.name}>
                  <Link
                    href={nav.href}
                    className="text-[16px] active:text-[#FB2E86] font-lato hover:text-[#FB2E86] transition-colors"
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:flex items-center hidden">
            <Input
              type="text"
              placeholder="Search for products"
              className="border-none"
            />
            <Button className="bg-[#FB2E86] hover:bg-[#f563a2]">
              <Search className="w-[24px] text-[#E7E6EF]" />
            </Button>
          </div>

          <Sheet >
            <SheetTrigger className="md:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent className="bg-white md:hidden">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription >
                  <ul className="flex flex-col gap-4 md:hidden mt-6 items-start">
                    {navItem.map((nav) => (
                      <li key={nav.name}>
                        <Link
                          href={nav.href}
                          className="text-[16px] active:text-[#FB2E86]  font-lato hover:text-[#FB2E86] transition-colors"
                        >
                          {nav.name}
                        </Link>
                      </li>
                    ))}
                    <li className="flex flex-col gap-4">
                      <div className="flex cursor-pointer gap-1">
                        <h6>Login</h6>
                      </div>
                      <div className="flex cursor-pointer gap-1">
                        <h6>Wishlist</h6>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center ">
                        <Input
                          type="text"
                          placeholder="Search for products"
                          className="border-none"
                        />
                        <Button className="bg-[#FB2E86] hover:bg-[#f563a2]">
                          <Search className="w-[24px] text-[#E7E6EF]" />
                        </Button>
                      </div>
                    </li>
                  </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
