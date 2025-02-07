"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";

import { getAllProducts } from "@/lib/getAllProducts";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import AddToCart from "@/components/AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateQuantity } from "@/redux/cartSlice";
import RelatedProducts from "@/components/related-products";
import { Product } from "@/types/ProductTypes";
import { calculateDiscountedPrice } from "@/utils/calculateDiscountedPrice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortableText } from "@portabletext/react";
import { components } from "@/components/sanityRender";
import ReviewForm from "@/components/reviewForm";
import StarRating from "@/components/ui/Rating";

export interface ProductInterface {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
  price: number;
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  images: {
    _type: "image";
    asset: {
      _id: string;
      url: string;
    };
  }[];
  stockLevel: number;
  category: {
    title: string;
  };
  color: string[];
  tags: string[];
  _createdAt: string;
  content: Block[];
  additionalInfo: Block[];
}

interface Child {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
}

interface Block {
  _key: string;
  _type: "block";
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  markDefs?: string[];
  children: Child[];
}

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const fetchProductByName = async (name: string) => {
  const decodeName = decodeURIComponent(name);

  if (!name) return "Name is required";

  const query = `*[_type == "product" && name == $name][0]{
   _id,
    name,
    image{
      asset->{
        url
      }
    },
    images[]{
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
    content,
    additionalInfo,
    _createdAt
  }`;
  const product = await client.fetch(query, { name: decodeName });
  return product;
};

const fetchReviews = async (productId: string) => {
  const query = `*[_type == "review" && product._ref == $productId] | order(date desc) {
    _id,
    userName,
    rating,
    comment,
    date
  }`;
  const params = { productId };
  const reviews = await client.fetch(query, params);
  return reviews;
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<ProductInterface>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(product?.image.asset.url);
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleImageClick = (imgUrl: string) => {
    setMainImage(imgUrl);
  };

  const items = useSelector((state: RootState) => state.cart.items);
  const item = items.find((i) => i._id === product?._id);
  const dispatch = useDispatch();

  const handleQuantityChange = (increment: boolean) => {
    if (product) {
      dispatch(
        updateQuantity({
          id: product._id.toString(),
          increment,
        })
      );
    }
  };


    const discountedPrice = calculateDiscountedPrice(
      product?.price,
      product?.discountPercentage
    );
  

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const products: Product[] = await getAllProducts();
      const product: ProductInterface = await fetchProductByName(params.slug);
      setProduct(product);
      setProducts(products);
      setLoading(false);
    }
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    const fetchProductReviews = async () => {
      if (product) {
        const reviews = await fetchReviews(product._id);
        setReviews(reviews);
      }
    };

    fetchProductReviews();
  }, [product]);

  if (loading) {
    return (
      <div className="p-10 flex items-center h-[200px]">
        <Loader />
      </div>
    );
  }

  if (!params.slug) return <div>Name is required</div>;
  const triggerClass =
    "relative text-black hover:text-[#151875] font-medium bg-none focus:ring-0 transition duration-300 before:content-[''] before:absolute before:w-0 before:h-[2px] before:bg-[#151875] before:bottom-[-2px] before:left-0 before:transition-all before:duration-300   hover:before:w-full  data-[state=active]:text-[#151875] data-[state=active]:before:w-full data-[state=active]:shadow-none";

   

  return (
    <div className="">
      <div className=" bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            Product Details
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <li>Home .</li>
            <li>Pages .</li>
            <li className="text-[#FB2E86]">Product Details</li>
          </ul>
        </div>
      </div>

      {product && (
        <div className="max-w-screen-xl mx-auto py-12 px-4">
          <div className="shadow-xl lg:flex-row flex-col p-2 flex min-h-[460px] gap-6">
            {product.image && (
              <div className="flex lg:flex-row flex-col gap-3 lg:w-[50%]">
                {/* Side Images */}
                {product.images ? (
                  <div className="flex flex-row lg:flex-col gap-4 w-[30%]">
                    {product.images.map((img, index) => (
                      <Image
                        src={img.asset.url}
                        alt={product.name}
                        width={1000}
                        height={1000}
                        key={index}
                        className="bg-slate-200 cursor-pointer"
                        onClick={() => handleImageClick(img.asset.url)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-row lg:flex-col gap-4 w-[30%]">
                    <Image
                      src={product.image.asset.url}
                      alt={product.name}
                      width={1000}
                      height={1000}
                      className="bg-slate-200"
                    />
                    <Image
                      src={product.image.asset.url}
                      alt={product.name}
                      width={1000}
                      height={1000}
                      className="bg-slate-200"
                    />
                    <Image
                      src={product.image.asset.url}
                      alt={product.name}
                      width={1000}
                      height={1000}
                      className="bg-slate-200"
                    />
                  </div>
                )}

                <div className="bg-slate-200 overflow-hidden h-full w-full ">
                  <Image
                    src={mainImage || product.image.asset.url}
                    alt={product.name}
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full hover:scale-150 duration-500 transition-all cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="py-4 flex flex-col gap-3">
              <h1 className="text-[#0D134E] font-josifen font-semibold text-[36px]">
                {product.name}
              </h1>

              <div className="flex gap-4">
                <span className="text-[#151875]">${product.price}</span>
                <span className="text-[#FB2E86] line-through">
                  {discountedPrice}
                </span>
              </div>

              <div className="flex gap-3 flex-col">
                <h3>Colors: </h3>

                {product.color?.map((color, index) => (
                  <div
                    key={index}
                    className={`w-[40px] h-[40px] rounded-full cursor-pointer border hover:scale-105 border-[#151875] duration-300 transition-all`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}

                <p className="font-josifen font-semibold text-[#A9ACC6]">
                  {product.description}
                </p>

                <div className="flex flex-col gap-4 ">
                  <div className="flex gap-4 w-[80px] items-center justify-center text-white ">
                    <button
                      className="bg-pink-400 px-1 hover:bg-pink-500"
                      onClick={() => handleQuantityChange(false)}
                    >
                      -
                    </button>
                    <p className="bg-white text-black">
                      {item ? item.stockLevel : 1}
                    </p>
                    <button
                      className="bg-pink-400 px-1 hover:bg-pink-500"
                      onClick={() => handleQuantityChange(true)}
                    >
                      +
                    </button>
                  </div>

                  <AddToCart
                    className="w-[200px] border-purple-500 border hover:bg-pink-400 duration-300 transition-all hover:text-zinc-50 text-[#151875] font-josifen"
                    product={product}
                  >
                    Add To Cart
                  </AddToCart>
                </div>

                <ul className="flex gap-4 flex-col text-[#151875] font-josifen">
                  <li className="text-xl font-bold">
                    Categories:{" "}
                    <span className="text-lg font-medium">
                      {`${product.category?.title}`}
                    </span>
                  </li>
                  <div className="flex gap-2 text-xl font-bold">
                    Tags:
                    {product.tags.map((p, index) => (
                      <li key={index} className="text-lg font-medium">
                        {p} |
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#F9F8FE] px-4 py-12">
        <Tabs
          defaultValue="description"
          className="max-w-screen-xl mx-auto flex flex-col gap-6"
        >
          <TabsList className="flex sm:flex-row flex-col gap-16 font-josifen font-semibold text-[24px] text-[#151875]">
            <TabsTrigger value="description" className={triggerClass}>
              Description
            </TabsTrigger>
            <TabsTrigger value="info" className={triggerClass}>
              Additional Info
            </TabsTrigger>
            <TabsTrigger value="reviews" className={triggerClass}>
              Reviews
            </TabsTrigger>
            <TabsTrigger value="video" className={triggerClass}>
              Video
            </TabsTrigger>
          </TabsList>
          {product && (
            <div className="">
              <TabsContent value="description">
                <PortableText
                  components={components}
                  value={product?.content}
                />
              </TabsContent>
              <TabsContent value="info">
                <PortableText
                  components={components}
                  value={product?.additionalInfo}
                />
              </TabsContent>
              <TabsContent value="reviews">
                <ReviewForm productId={product._id} />
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div
                        key={review._id}
                        className="mb-6 p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{review.userName}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-2">
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
              </TabsContent>
            </div>
          )}
        </Tabs>
      </div>

      {products && product && (
        <RelatedProducts
          products={products}
          category={product.category?.title}
        />
      )}

      <div className="flex justify-center pt-16">
        <Image
          src="/brands.png"
          alt="brand"
          width={1000}
          height={1000}
          className="w-[80%]"
        ></Image>
      </div>
    </div>
  );
}
