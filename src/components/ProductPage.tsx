"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/ProductList";
import ProductGrid from "@/components/productGrid";
import { Input } from "@/components/ui/input";
import { type Product } from "@/types/ProductTypes";
import { LayoutGrid, List } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Loader from "./loader";
import ShopFilters from "./filters";

interface ShopClientProps {
  products: Product[];
}

function ProductContent({ products }: ShopClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  // Apply filters when `category` or `search` query parameters change
  useEffect(() => {
    setLoading(true);
    let filtered = products;

    // Extract filters from URL
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minPrice = Number(searchParams.get("minPrice")) || 100;
    const maxPrice = Number(searchParams.get("maxPrice")) || 2500;
    const colors = searchParams.get("colors")?.split(",") || [];
    const inStock = searchParams.get("inStock") === "true";
    const onSale = searchParams.get("onSale") === "true";

    // Apply category filter
    if (category) {
      filtered = filtered.filter(
        (product) => product.category?.title === category
      );
    }

    // Apply search filter
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        Number(product.price) >= minPrice && Number(product.price) <= maxPrice
    );

    // Apply color filter
    if (colors.length > 0) {
      filtered = filtered.filter((product) =>
        product.color?.some((color) => colors.includes(color))
      );
    }

    // Apply in-stock filter
    if (inStock) {
      filtered = filtered.filter((product) => product.stockLevel > 0);
    }

    // Apply on-sale filter
    if (onSale) {
      filtered = filtered.filter((product) => product.discountPercentage);
    }

    setFilteredProducts(filtered);
    setLoading(false);
  }, [searchParams, products]); // ✅ Now it listens to all filters

  // Handle filter changes from the `ShopFilters` component

  // Handle filter changes from the `ShopFilters` component
  const handleFilterChange = (filtered: Product[]) => {
    setFilteredProducts(filtered);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            Get Your Dream Furniture
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <Link href="/">Home {">"}</Link>
            <Link href="/shop" className="text-[#FB2E86]">
              Shop {">"}
            </Link>
            <Link
              href={`/shop?category=${category}`}
              className="text-[#FB2E86]"
            >
              {category}
            </Link>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <Tabs
        defaultValue="productList"
        className="max-w-screen-xl mx-auto py-12 px-4"
        id="products"
      >
        <div className="flex justify-between gap-4 lg:flex-row flex-col">
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] font-bold font-josifen text-[#151875]">
              Ecommerce Accessories & Fashion Items
            </h1>
            <h4 className="text-[#8A8FB9] font-lato text-[12px]">
              Number of results: {filteredProducts.length}
            </h4>
          </div>

          <div className="flex gap-4">
            <div className="flex md:flex-row flex-col gap-6">
              <div className="flex gap-2 items-center">
                <label htmlFor="page" className="font-lato text-[16px]">
                  Sort By:
                </label>
                <Input className="w-[96px]" placeholder="Best Match" />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="" className="font-lato text-[16px]">
                View:
              </label>
              <TabsList>
                <TabsTrigger value="productGrid">
                  <LayoutGrid className="w-[20px] cursor-pointer" />
                </TabsTrigger>
                <TabsTrigger value="productList">
                  <List className="w-[20px] cursor-pointer" />
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>

        {/* Filters and Products */}
        <div className="sm:flex">
          <div className="w-[30%]">
            <ShopFilters
              products={products}
              onFilterChange={handleFilterChange}
            />
          </div>

          {loading && (
            <div className="flex items-center justify-center w-full">
              <Loader />
            </div>
          )}

          {filteredProducts.length === 0 && !loading && (
            <div className="flex items-center justify-center w-full">
              <h1 className="text-[#8A8FB9] font-lato text-[12px]">
                No products found
              </h1>
            </div>
          )}
          {filteredProducts.length > 0 && !loading && (
            <div className="w-[70%]">
              <TabsContent value="productList">
                <ProductList products={filteredProducts} />
              </TabsContent>
              <TabsContent value="productGrid">
                <ProductGrid products={filteredProducts} />
              </TabsContent>
            </div>
          )}
        </div>

        {/* Brands Section */}
        <div className="flex justify-center pt-16">
          <Image
            src="/brands.png"
            alt="brand"
            width={1000}
            height={1000}
            className="w-[80%]"
          />
        </div>
      </Tabs>
    </div>
  );
}

function Product({ products }: ShopClientProps) {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <ProductContent products={products} />
    </Suspense>
  );
};

export default Product;