"use client";
import { useSelector } from "react-redux";
import { CartItem } from "@/redux/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";
// import axios from "axios";
// import { Address, Package } from "@/types/ShippingTypes";
import { RootState } from "@/redux/store";
import { client } from "@/sanity/lib/client";
import { OrderData } from "@/types/orderTypes";
import { toast } from "@/hooks/use-toast";

// Define the schema for the form
const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  newsletter: z.boolean().optional(),
  paymentMethod: z.enum(["cod", "payOnline"]), // Add payment method
  countryCode: z.enum(["PK", "US"]), // Add country code
  shippingRate: z.string().optional(), // Change to string for rate ID
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submissionSuccess, setSubmissionSuccess] = useState(false);
  // const [shippingRates, setShippingRates] = useState<any[]>([]); // Store shipping rates
  // const [errorMessage, setErrorMessage] = useState<string | null>(null); // Store error messages
  // const [isFetchingRates, setIsFetchingRates] = useState(false); // Loading state for shipping rates

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const paymentMethod = watch("paymentMethod"); // Watch payment method
  const countryCode = watch("countryCode"); // Watch country code

  // shipping process handling
  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        user: data,
        products: items.map((item: CartItem) => ({
          product: {
            _type: 'reference',
            _ref: item._id, // Reference to the product in Sanity
          },
          name: item.name, // Include product name
          price: item.price, // Include product price
          quantity: item.stockLevel,
        })),
        total,
        status: "Pending",
        createdAt: new Date().toISOString(),
        shippingRate:
          countryCode === "US"
            ? data.shippingRate === undefined
              ? "1000"
              : data.shippingRate
            : null, // Include selected shipping rate
      };

      // Save order data to local storage
      localStorage.setItem("currentOrder", JSON.stringify(orderData));
        // if (data.countryCode === "US") {
        //   setIsFetchingRates(true);
        //   const shipeToAddress: Address = {
        //     name: `${data.firstName} ${data.lastName}`,
        //     phone: data.phone,
        //     addressLine1: data.address,
        //     addressLine2: data.apartment, // sanity-check: کیا Carrier IDs موجود ہیں؟
        //     cityLocality: data.city,
        //     stateProvince: data.state,
        //     postalCode: data.postalCode,
        //     countryCode: data.countryCode,
        //     addressResidentialIndicator: "yes"// Residential address
        //   };

        //   const packages: Package[] = items.map((item: CartItem) => ({
        //     weight: {
        //       value: 1, // Update with actual weight
        //       unit: "pound",
        //     },
        //     dimensions: {
        //       length: 10, // Update with actual dimensions
        //       width: 10,
        //       height: 10,
        //       unit: "inch",
        //     },
        //   }));

        //   // Make API call to fetch shipping rates
        //   try {
        //     const response = await axios.post("/api/shipengine/get-rates", {
        //       shipeToAddress,
        //       packages,
        //     });
          
        //     if (response.data.error) {
        //       // Handle API-level errors
        //       toast({
        //         title: "Shipping Rate Error",
        //         description: response.data.error,
        //         variant: "destructive"
        //       });
        //       return;
        //     }
          
        //     if (response.data.rates) {
        //       setShippingRates(response.data.rates);
        //     } else {
        //       toast({
        //         title: "No Shipping Rates Available",
        //         description: "We couldn't fetch shipping rates at this time.",
        //         variant: "destructive"
        //       });
        //     }
        //   } catch (error) {
        //     console.error("Shipping Rates Fetch Error:", error);
        //   } finally {
        //     setIsFetchingRates(false);
        //   }

        //   // Agar api nhi chali to shippingrate empty
        // } else {
        //   // For Pakistan, show free delivery
        //   setShippingRates([]);
        // }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // save data in sanity

  const saveOrderToSanity = async (orderData: OrderData) => {
    try {
      const result = await client.create({
        _type: 'order',
        ...orderData,
        products: orderData.products.map((item) => ({
          product: {
            _type: 'reference',
            _ref: item.product._ref, // Reference to the product
          },
          name: item.name, // Include product name
          price: Number(item.price), // Include product price
          quantity: item.quantity,
        })),
      });
      return result;
    } catch (error) {
      console.error('Error saving order to Sanity:', error);
      throw error;
    }
  };

  const requiredFields: (keyof CheckoutFormData)[] = [
    "email",
    "phone",
    "firstName",
    "lastName",
    "address",
    "city",
    "state",
    "postalCode",
    "countryCode",
    "paymentMethod",
  ];
  
  const isOrderDataComplete = () => {
    // Check if all required fields are filled
    for (const field of requiredFields) {
      if (!watch(field)) {
        return false;
      }
    }
  
    // If country is US, ensure shipping rate is selected
    
  
    // Ensure there are items in the cart
    if (items.length === 0) {
      return false;
    }
  
    return true;
  };
  
  const handlePlaceOrder = async () => {
    if (!isOrderDataComplete()) {
      toast({
        title: "Please fill out all required fields before placing your order.",
        variant: "destructive",
        className: "bg-red-500 text-white font-semibold text-[20px]"
      })
      return;
    }
  
    const orderData: OrderData = {
      user: {
        email: watch('email'),
        phone: watch('phone'),
        firstName: watch('firstName'),
        lastName: watch('lastName'),
        address: watch('address'),
        apartment: watch('apartment'),
        city: watch('city'),
        state: watch('state'),
        postalCode: watch('postalCode'),
        countryCode: watch('countryCode'),
      },
      products: items.map((item: CartItem) => ({
        product: {
          _type: 'reference',
          _ref: item._id, // Reference to the product in Sanity
        },
        name: item.name, // Include product name
        price: Number(item.price), // Include product price
        quantity: item.stockLevel,
      })),
      total,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      shippingRate: watch('countryCode') === 'US' ? watch('shippingRate') || '1000' : null,
      paymentMethod: watch('paymentMethod'),
    };
  
    if (orderData.paymentMethod === "cod") {
      try {
        await saveOrderToSanity(orderData);
        router.push("/checkout/order-complete");
      } catch (error) {
        console.error("Failed to save order:", error);
      }
    } else {
      localStorage.setItem("currentOrder", JSON.stringify(orderData));
      router.push("/checkout/payement");
    }
  };
  
 
  return (
    <div>
      <div className="bg-[#F6F5FF]">
        <div className="max-w-screen-xl mx-auto h-[286px] flex flex-col justify-center gap-2 px-4">
          <h1 className="font-josifen font-bold text-[36px] text-[#101750]">
            Hekto Checkout
          </h1>
          <ul className="flex gap-1 font-lato font-medium cursor-pointer">
            <li>Home .</li>
            <li className="text-[#FB2E86]">Checkout</li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto py-10">
        <h1 className="text-2xl font-bold font-josifen text-[#101750] pb-4">
          Hekto Checkout
        </h1>

        <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-[#F8F7FF]">
          <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-8">
            {/* Success Message */}

            {/* Error Message */}

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Contact Information and Shipping Address sections remain unchanged */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Contact Information</h2>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      className="w-full p-3 bg-[#F3F1FF] border-0 rounded"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      {...register("phone")}
                      className="w-full p-3 bg-[#F3F1FF] border-0 rounded"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Newsletter Checkbox */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="newsletter"
                      {...register("newsletter")}
                      className="w-4 h-4 accent-[#FF4D8D]"
                    />
                    <label htmlFor="newsletter" className="text-sm">
                      Keep me up to date on news and offers
                    </label>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Shipping Address</h2>

                  {/* Country Code */}
                  <div>
                    <label htmlFor="countryCode" className="block text-sm mb-1">
                      Country
                    </label>
                    <select
                      id="countryCode"
                      {...register("countryCode")}
                      className="w-full p-3 cursor-pointer bg-[#F3F1FF] border-0 rounded"
                    >
                      <option value="PK">Pakistan</option>
                      <option value="US">United States</option>
                    </select>
                  </div>

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        placeholder="First name"
                        {...register("firstName")}
                        className="w-full p-3 bg-[#F3F1FF] border-0 rounded"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="Last name"
                        {...register("lastName")}
                        className="w-full p-3 bg-[#F3F1FF] border-0 rounded"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <input
                      placeholder="Address"
                      {...register("address")}
                      className="w-full p-3 bg-[#F3F1FF] border-0 rounded"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* Apartment */}
                  <div>
                    <input
                      placeholder="Apartment, suite, etc. (optional)"
                      {...register("apartment")}
                      className="w-full p-3 bg-[#F3F1FF] border-0 rounded"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <input
                      placeholder="City"
                      {...register("city")}
                      className="w-full p-3 bg-[#F3F1FF] border-0 rounded"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  {/* State & Postal Code */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        placeholder="State/Province"
                        {...register("state")}
                        className="w-full p-3 bg-[#F3F1FF] border-0 rounded"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="Postal Code"
                        {...register("postalCode")}
                        className="w-full p-3 bg-[#F3F1FF] border-0 rounded"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm">
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Payment Method</h2>

                  {/* COD Option */}
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="cod"
                      value="cod"
                      {...register("paymentMethod")}
                      className="w-4 h-4 accent-[#FF4D8D]"
                    />
                    <label htmlFor="cod" className="text-sm">
                      Cash on Delivery (COD)
                    </label>
                  </div>
                  {paymentMethod === "cod" && (
                    <p className="text-sm text-gray-600">
                      Pay when your order is delivered. No extra fees.
                    </p>
                  )}

                  {/* Pay Online Option */}
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="payOnline"
                      value="payOnline"
                      {...register("paymentMethod")}
                      className="w-4 h-4 accent-[#FF4D8D]"
                    />
                    <label htmlFor="payOnline" className="text-sm">
                      Pay Online
                    </label>
                  </div>
                </div>
                {/* Shipping Rates */}
                {/* <div className="space-y-4">
            
                  {isFetchingRates ? (
                    <div className="text-sm text-gray-600">
                      Fetching shipping rates...
                    </div>
                  ) : shippingRates.length > 0 ? (
                    shippingRates.map((rate) => (
                      <div
                        key={rate.rateId}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          id={rate.rateId}
                          value={rate.rateId}
                          {...register("shippingRate")}
                          className="w-4 h-4 accent-[#FF4D8D]"
                        />
                        <label htmlFor={rate.rateId} className="text-sm">
                          {rate.serviceType} - ${rate.shippingAmount.amount} (
                          {rate.deliveryDays} days)
                        </label>
                      </div> */}
                
                {countryCode === "PK" ? (
                    <div className="">Shipping is free for Pakistan</div>
                  ) : (
                    <div className="">$1000 fixed</div>
                  )}
                

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 bg-[#FF4D8D] text-white rounded hover:bg-[#FF3D7D] transition-colors ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Processing..." : "Continue to Shipping"}
                </button>
              </form>
            </div>

            {/* Product List and Summary sections remain unchanged */}
            <Card className="p-6 shadow-none border-none">
              <div className="space-y-6">
                {/* Product List */}
                {items.map((item: CartItem) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-white">
                      <Image
                        src={item.image.asset.url}
                        alt={`Product ${item.name}`}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.category?.title}
                      </p>
                    </div>
                    <p className="text-sm font-medium">${item.price}</p>
                  </div>
                ))}

                {/* Summary */}
                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotals:</span>
                    <span className="text-sm font-medium">${total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Totals:</span>
                    <span className="text-sm font-medium">${total}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="shipping"
                      className="mt-1 border-[#00D34D] data-[state=checked]:bg-[#00D34D] data-[state=checked]:border-[#00D34D]"
                      defaultChecked
                    />

                    <Label htmlFor="shipping" className="text-sm text-gray-600">
                      Shipping & taxes calculated at checkout!
                    </Label>
                  </div>
                  <Button
                    className={`w-full bg-[#00D34D] hover:bg-[#00C344] text-white ${
                      !isOrderDataComplete() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handlePlaceOrder}
                  >
                    Place Your Order
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
