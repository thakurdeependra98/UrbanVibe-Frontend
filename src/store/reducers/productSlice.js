import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


export const productsItem = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch products");
    }
  }
)

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/createProduct", productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to create product");
    }
  }
)

export const getProductsById = createAsyncThunk(
  "products/getProductsById",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/productsById");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch products by ID");
    }
  }
)


export const deleteProduct = createAsyncThunk(
  "products/deleteProduct", 
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/deleteProduct/${productId}`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to delete product");
    }
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/updateProduct/${productId}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to update product");
    }
  }
)

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addToCart", { productId, quantity });
      console.log("Add to cart response:", response.data); // Debugging line
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to add to cart");
    }
})

export const getCartItems = createAsyncThunk(
  "products/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/getCartItems");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch cart items");
    }
  }
)

export const deleteCartItem = createAsyncThunk(
  "products/deleteCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/deleteCartItem/${cartItemId}`); // Send cartItemId in the URL
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to delete cart item");
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "products/increaseQuantity",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/increaseQuantity/${cartItemId}`); // Send cartItemId in the URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to increase quantity");
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "products/decreaseQuantity",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/decreaseQuantity/${cartItemId}`); // Send cartItemId in the URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to decrease quantity");
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "products/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/addWishlist", { productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to add to wishlist");
    }
  }
)

export const getWishlist = createAsyncThunk(
  "products/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/getWishlist");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch wishlist");
    }
  }
)

export const removeWishlist = createAsyncThunk(
  "products/removeWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/removeWishlist", { data: { productId } });
      return { productId }; // Return the productId to update the state
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to remove from wishlist");
    }
  }
)


const initialState = {
  products: [],
  wishlist: [],
  cart: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers:(builder)=>{
    builder
     .addCase(productsItem.fulfilled, (state, action) => {
        state.products = action.payload;
      })
     .addCase(productsItem.rejected, (state, action) => {
      state.errors = action.payload;
        console.error("Error fetching products:", action.payload);
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error creating product:", action.payload);
      })
      .addCase(getProductsById.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getProductsById.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error fetching products by ID:", action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload._id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error deleting product:", action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error updating product:", action.payload);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const product = action.payload;
        const existingItem = state.cart.find((item) => item.productId
        ._id === product.productId._id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cart.push({ ...product, quantity: 1 });
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error adding to cart:", action.payload);
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error fetching cart items:", action.payload);
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item._id !== action.meta.arg); 
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error deleting cart item:", action.payload);
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const product = action.payload.newWishlistItem;
        if (!state.wishlist.some((item) => item.productId === product.productId)) {
          state.wishlist.push(product);
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error adding to wishlist:", action.payload);
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload.filter((item) => item.productId); 
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error fetching wishlist:", action.payload);
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter((item) => item.productId._id !== action.payload.productId); 
        // Remove the product from the wishlist state
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error removing from wishlist:", action.payload);
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        const cartItem = state.cart.find((item) => item._id === action.meta.arg); 
        if (cartItem) {
          cartItem.quantity += 1;
        }
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error increasing quantity:", action.payload);
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        const cartItem = state.cart.find((item) => item._id === action.meta.arg); 
        if (cartItem) {
          if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
          } else {
            state.cart = state.cart.filter((item) => item._id !== action.meta.arg); // Remove item if quantity is 1
          }
        }
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.errors = action.payload;
        console.error("Error decreasing quantity:", action.payload);
      })

  }
});


export default productSlice.reducer;
