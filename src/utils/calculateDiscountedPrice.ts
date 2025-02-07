export const calculateDiscountedPrice = (price:number | undefined, discountPercentage:number | undefined) => {
    const numericPrice = price // Convert price to number
    if (!numericPrice || !discountPercentage) return price; // Return original price if invalid
    const discountedPrice = numericPrice - (numericPrice * discountPercentage) / 100;
    return discountedPrice.toFixed(2); // Return discounted price with 2 decimal places
  };
  