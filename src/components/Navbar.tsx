"use client";
import React, {useState , useEffect, Suspense } from "react";

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
import { useRouter, useSearchParams } from "next/navigation";


function NavbarContent() {
  const [searchValue, setSearchValue] = useState<string>("");
 
  const navItem = [
    {
      name: "Home",
      href: "/",
    },
    
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Categories",
      href: "/#category",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Blog",
      href: "/blog",
    },
  ];

  
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Component mount hone par URL se search value load karo
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Agar search empty ho to query remove kar do
    if (!searchValue.trim()) {
      router.push("/all-products");
      return;
    }

    // ✅ Search query ko URL me update karo
    router.push(`/shop?search=${encodeURIComponent(searchValue)}`);
  };

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

          <form className="md:flex items-center hidden" onSubmit={handleSearch}>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search for products"
              className="border-none"
            />
            <Button className="bg-[#FB2E86] hover:bg-[#f563a2]">
              <Search className="w-[24px] text-[#E7E6EF]" />
            </Button>
          </form>

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

function Navbar() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <NavbarContent />
    </Suspense>
  );
};

export default Navbar;