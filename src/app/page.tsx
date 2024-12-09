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

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Featured />
        <LatestProduct />
        <Offer />
        <HomeSec />
        <Trending />
        <Discount />
        <TopCat />
        <Newsletter />
        <Brands />
        <Latest />
      </main>
    </>
  );
}
