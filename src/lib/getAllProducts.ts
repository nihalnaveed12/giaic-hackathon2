import { Category } from "@/components/TopCategories";
import { client } from "@/sanity/lib/client";
export const getAllProducts = async () => {
  const query = `*[_type == "product"]{
    _id,
    name,
    image{
      asset->{
        url
      }
    },
    price,
    description,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category->{
      title
    },
    color,
    tags,
    _createdAt
  }`;

  const allProducts = await client.fetch(query);
  return allProducts;
};
export const getDiscountedItems = async () => {
  const query = `*[_type == "discountedItems"]{
    title,
    category->{
      title
    },
    content,
    image{
      asset->{
        url
      }
    }
  }`;

  const discountedProducts = await client.fetch(query);
  return discountedProducts;
};
export const getTopCategories = async (): Promise<Category[]> => {
  const query = `*[_type == "category"]{
  _id,
  title,
  description,
  "imageUrl": image.asset->url
}`;

  const TopCategories: Category[] = await client.fetch(query);
  return TopCategories;
};
