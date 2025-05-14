
import { toast } from "sonner";
import { Product, Category, User } from "../types";

const API_DELAY = 500; // Simulate network delay

// Mock data for development
const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description: "The most advanced iPhone ever with A16 Bionic chip",
    category: "electronics"
  },
  {
    id: "2",
    name: "MacBook Air M2",
    price: 1199,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Supercharged by the next-generation M2 chip",
    category: "electronics"
  },
  {
    id: "3",
    name: "AirPods Pro",
    price: 249,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Active Noise Cancellation for immersive sound",
    category: "accessories"
  },
  {
    id: "4",
    name: "iPad Pro",
    price: 799,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "The ultimate iPad experience with M1 chip",
    category: "electronics"
  },
  {
    id: "5",
    name: "Apple Watch Series 8",
    price: 399,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Advanced health features and a stunning display",
    category: "wearables"
  },
  {
    id: "6",
    name: "Apple TV 4K",
    price: 179,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB0dnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "4K HDR with Dolby Atmos for amazing home entertainment",
    category: "electronics"
  },
  {
    id: "7",
    name: "HomePod mini",
    price: 99,
    image: "https://images.unsplash.com/photo-1614111345869-99b7cd85c883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXBvZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Room-filling sound in a compact design",
    category: "accessories"
  },
  {
    id: "8",
    name: "Magic Keyboard",
    price: 299,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjBrZXlib2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Floating design, backlit keys, and a trackpad",
    category: "accessories"
  }
];

const mockCategories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1625466307561-ce195d242e73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwcGxlJTIwYWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "wearables",
    name: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYXJhYmxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "services",
    name: "Services",
    image: "https://images.unsplash.com/photo-1599658880765-4f08d991c6b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGUlMjBzZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  }
];

// Mock user for development
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  isAdmin: true
};

// Utility function to simulate API request with delay
const simulateRequest = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, API_DELAY);
  });
};

// API functions
export const getProducts = async (sortOrder = "price_asc"): Promise<Product[]> => {
  try {
    // In a real app, this would be a fetch call to your API
    // const response = await fetch(`/api/products?sort=${sortOrder}`);
    // const data = await response.json();
    
    // For now, use mock data
    const sortedProducts = [...mockProducts].sort((a, b) => {
      if (sortOrder === "price_asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    
    return await simulateRequest(sortedProducts);
  } catch (error) {
    console.error("Failed to fetch products", error);
    toast.error("Failed to load products");
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    // In a real app: const response = await fetch('/api/categories');
    // const data = await response.json();
    
    return await simulateRequest(mockCategories);
  } catch (error) {
    console.error("Failed to fetch categories", error);
    toast.error("Failed to load categories");
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // In a real app: const response = await fetch('/api/users/me');
    // const data = await response.json();
    
    return await simulateRequest(mockUser);
  } catch (error) {
    console.error("Failed to fetch user data", error);
    // Don't show error toast as this might be a normal state (not logged in)
    return null;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    // In a real app: const response = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
    // const data = await response.json();
    
    // Filter mock data based on search query
    const filteredProducts = mockProducts.filter(
      product => product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    return await simulateRequest(filteredProducts);
  } catch (error) {
    console.error("Failed to search products", error);
    toast.error("Failed to search products");
    throw error;
  }
};
