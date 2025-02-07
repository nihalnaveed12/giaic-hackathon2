"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Suspense } from 'react';
import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types/ProductTypes";
import { Slider } from "radix-ui";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface ShopFiltersProps {
  products: Product[];
  onFilterChange: (filtered: Product[]) => void;
}

const ShopFiltersContent: React.FC<ShopFiltersProps> = ({
  products,
  onFilterChange,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract valid price values
  const prices = products
    .map((p) => Number(p.price))
    .filter((price) => !isNaN(price));
  const minPrice = prices.length > 0 ? Math.floor(Math.min(...prices)) : 100;
  const maxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices)) : 2500;

  const categories = Array.from(
    new Set(products.map((p) => p.category?.title || "All"))
  );

  const allColors = Array.from(new Set(products.flatMap((p) => p.color || [])));

  const [filters, setFilters] = useState<{
    category: string;
    priceRange: number[];
    colors: string[];
    inStock: boolean;
    onSale: boolean;
  }>({
    category: searchParams.get("category") || "All",
    priceRange: [
      Number(searchParams.get("minPrice")) || minPrice,
      Number(searchParams.get("maxPrice")) || maxPrice,
    ],
    colors: searchParams.get("colors")?.split(",").filter(Boolean) || [],
    inStock: searchParams.get("inStock") === "true",
    onSale: searchParams.get("onSale") === "true",
  });


  useEffect(() => {
    setFilters({
      category: searchParams.get("category") || "All",
      priceRange: [
        Number(searchParams.get("minPrice")) || minPrice,
        Number(searchParams.get("maxPrice")) || maxPrice,
      ],
      colors: searchParams.get("colors")?.split(",").filter(Boolean) || [],
      inStock: searchParams.get("inStock") === "true",
      onSale: searchParams.get("onSale") === "true",
    });
  }, [searchParams, minPrice, maxPrice]); // ✅ Jab URL change ho, filters bhi update ho jayein
  

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
  
    if (filters.category && filters.category !== "All") {
      params.set("category", filters.category);
    }
    if (filters.priceRange[0] !== minPrice) {
      params.set("minPrice", filters.priceRange[0].toString());
    }
    if (filters.priceRange[1] !== maxPrice) {
      params.set("maxPrice", filters.priceRange[1].toString());
    }
    if (filters.colors.length) {
      params.set("colors", filters.colors.join(","));
    }
    if (filters.inStock) {
      params.set("inStock", "true");
    }
    if (filters.onSale) {
      params.set("onSale", "true");
    }
  
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  
  }, [filters, products, pathname, router]); // ✅ Now URL updates correctly
  
  
  // ✅ Yahan filtering apply karo!
  
  
  

  // Apply filters and notify parent component
  const applyFilters = useCallback(
    (newFilters: typeof filters) => {
      const filtered = products.filter((product) => {
        if (newFilters.category !== "All" && product.category) {
          if (product.category.title !== newFilters.category) {
            return false;
          }
        }

        const productPrice = Number(product.price);

        if (
          isNaN(productPrice) ||
          productPrice < newFilters.priceRange[0] ||
          productPrice > newFilters.priceRange[1]
        ) {
          return false;
        }

        if (
          newFilters.colors.length > 0 &&
          !newFilters.colors.some((color) => product.color?.includes(color))
        ) {
          return false;
        }

        if (newFilters.inStock && product.stockLevel <= 0) {
          return false;
        }

        if (newFilters.onSale && !product.discountPercentage) {
          return false;
        }

        return true;
      });

      onFilterChange(filtered);
    },
    [products, onFilterChange]
  );

 
  // Update filters and apply them
  const updateFilter = useCallback(
    (key: keyof typeof filters, value:any) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      applyFilters(newFilters); // Apply filters
    },
    [filters, applyFilters]
  );

  useEffect(() => {
    applyFilters(filters);
  }, [filters, products]);
  

  // Reset filters to default values
  const resetFilters = () => {
    const defaultFilters = {
      category: "All",
      priceRange: [minPrice, maxPrice],
      colors: [],
      inStock: false,
      onSale: false,
    };
    setFilters(defaultFilters);
  
    applyFilters(defaultFilters); // Apply filters
  };

  // Update category filter
  const updateCategoryFilter = (category: string) => {
    const newCategory = category === filters.category ? "All" : category;
    updateFilter("category", newCategory);
  };

  return (
    <div className="w-64 rounded-lg p-6 my-12 sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-[#151875]">Filters</h3>

      <Accordion type="multiple" className="space-y-4">
        {/* Categories */}
        <AccordionItem value="category">
          <AccordionTrigger className="text-[#151875]">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.category === category}
                    onCheckedChange={() => updateCategoryFilter(category)}
                  />
                  <label htmlFor={category} className="text-sm cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-[#151875]">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-2 pt-4">
              <div className="px-2">
                <Slider.Root
                  min={minPrice}
                  max={maxPrice}
                  step={50}
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilter("priceRange", value)}
                  className="w-full h-2 bg-[#FB2E86] rounded-2xl appearance-none cursor-pointer SliderRoot"
                >
                  <Slider.Track className="SliderTrack">
                    <Slider.Range className="SliderRange" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="SliderThumb rounded-full"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>${filters.priceRange[0].toFixed(0)}</span>
                <span>${filters.priceRange[1].toFixed(0)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors */}
        <AccordionItem value="colors">
          <AccordionTrigger className="text-[#151875]">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-4 gap-2 pt-2">
              {allColors.map((color) => (
                <div
                  key={color}
                  onClick={() => {
                    const newColors = filters.colors.includes(color)
                      ? filters.colors.filter((c) => c !== color)
                      : [...filters.colors, color];
                    updateFilter("colors", newColors);
                  }}
                  className={`
                    py-5 rounded-full cursor-pointer border-2
                    ${filters.colors.includes(color) ? "border-[#FB2E86]" : "border-gray-200"}
                  `}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Filters */}
        <AccordionItem value="additional">
          <AccordionTrigger className="text-[#151875]">
            Additional
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) =>
                    updateFilter("inStock", checked)
                  }
                />
                <label htmlFor="inStock" className="text-sm cursor-pointer">
                  In Stock Only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onSale"
                  checked={filters.onSale}
                  onCheckedChange={(checked) => updateFilter("onSale", checked)}
                />
                <label htmlFor="onSale" className="text-sm cursor-pointer">
                  On Sale
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={resetFilters}
          className="bg-[#FB2E86] text-white px-4 py-2 rounded-md hover:bg-[#D82A67] transition"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

 

const ShopFilters: React.FC<ShopFiltersProps> = ({ products, onFilterChange }) => {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <ShopFiltersContent products={products} onFilterChange={onFilterChange} />
    </Suspense>
  );
};

export default ShopFilters;