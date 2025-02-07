import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Products } from "./types";

// Function to load cart data from local storage (client-side only)
const loadCartFromLocalStorage = (): CartState => {
  // Check if the code is running in the browser
  if (typeof window !== "undefined" && localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart") as string); // Parse stored JSON into an object
  }
  // Return default state if no data exists in local storage
  return { items: [], total: 0 };
};

// Function to save cart data to local storage (client-side only)
const saveCartToLocalStorage = (state: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state)); // Convert object to JSON string and save
  }
};

// Default state to ensure the Redux slice works during SSR
const initialState: CartState = { items: [], total: 0 };

// Hydrate the state with local storage data (only on the client side)
const hydratedState =
  typeof window !== "undefined" ? loadCartFromLocalStorage() : initialState;

// Create the Redux slice
const cartSlice = createSlice({
  name: "cart",
  initialState: hydratedState, // Use hydrated state or default state
  reducers: {
    // Action: Add a product to the cart
    addToCart: (state, action: PayloadAction<Products>) => {
      const existingItem = state.items.find(
        (product) => product._id === action.payload._id
      );

      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.stockLevel += 1;
      } else {
        // Add new item to the cart
        state.items.push({ ...action.payload, stockLevel: 1 });
      }

      // Update the total price
      state.total += Number(action.payload.price);

      // Save updated state to local storage
      saveCartToLocalStorage(state);
    },

    // Action: Update the quantity of a product in the cart
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; increment: boolean }>
    ) => {
      const item = state.items.find(
        (product) => product._id.toString() === action.payload.id
      );

      if (item) {
        if (action.payload.increment) {
          // Increase quantity
          item.stockLevel++;
          state.total += Number(item.price);
        } else if (item.stockLevel > 1) {
          // Decrease quantity if greater than 1
          item.stockLevel--;
          state.total -= Number(item.price);
        }
      }

      // Save updated state to local storage
      saveCartToLocalStorage(state);
    },

    // Action: Remove a product from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (product) => product._id.toString() === action.payload
      );

      if (itemIndex > -1) {
        const item = state.items[itemIndex];
        // Deduct the price of the removed item(s) from the total
        state.total -= Number(item.price) * item.stockLevel;
        // Remove the item from the cart
        state.items.splice(itemIndex, 1);
      }

      // Save updated state to local storage
      saveCartToLocalStorage(state);
    },

    // Action: Clear all items from the cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0; // Reset the total price

      // Save updated state to local storage
      saveCartToLocalStorage(state);
    },
  },
});

// Export actions for use in components
export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

// Export the reducer for use in the Redux store
export default cartSlice.reducer;
