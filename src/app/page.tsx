import Brands from "@/components/Brands";
import Discount from "@/components/DiscountItem";
import Featured from "@/components/Featured";

import Hero from "@/components/Hero";
import HomeSec from "@/components/Home-sec";
import Latest from "@/components/latest-blog";
import LatestProduct from "@/components/LatestProduct";

import Newsletter from "@/components/NewsLetter";
import Offer from "@/components/Offer";
import TopCat from "@/components/TopCategories";
import Trending from "@/components/Trending";
import { getAllProducts, getDiscountedItems, getTopCategories } from "@/lib/getAllProducts";

export const revalidate = 10

export default async function Home() {
  const products = await getAllProducts()
  const discountedProducts = await getDiscountedItems()
  const categories = await getTopCategories()
  return (
    <>
      <main>
        <Hero />
        <Featured products={products}/>
        <LatestProduct products={products}/>
        <Offer />
        <HomeSec />
        <Trending />
        <Discount products={discountedProducts}/>
        <TopCat categories={categories}/>
        <Newsletter />
        <Brands />
        <Latest />
      </main>
    </>
  );
}
