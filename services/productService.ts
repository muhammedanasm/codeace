import axios from "axios";
import { Product } from "@/types/product";

// base URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const productService = {
  fetchProducts: async (): Promise<Product[]> => {
    try {
      console.log(`Service: Fetching from ${BASE_URL}/products`); // Debug log
      const response = await api.get<Product[]>("/products");
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.message);
      throw new Error("Could not load products at this time.");
    }
  },

  addProduct: async (productData: any) => {
    try {
      console.log("Service: Submitting new entry...");
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      console.error("Post Error:", error);
      throw error;
    }
  },
};
