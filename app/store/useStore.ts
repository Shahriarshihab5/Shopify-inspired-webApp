import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
}

interface Store {
  id: string;
  name: string;
  description: string;
  owner: string;
}

interface StoreState {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Stores
  stores: Store[];
  addStore: (store: Store) => void;
  
  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      products: [
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 79.99,
          image: '/placeholder.jpg',
          stock: 45,
          category: 'Electronics',
        },
        {
          id: '2',
          name: 'Smart Watch',
          price: 199.99,
          image: '/placeholder.jpg',
          stock: 23,
          category: 'Electronics',
        },
        {
          id: '3',
          name: 'Laptop Stand',
          price: 49.99,
          image: '/placeholder.jpg',
          stock: 67,
          category: 'Accessories',
        },
      ],
      stores: [
        {
          id: '1',
          name: 'TechHub Store',
          description: 'Premium electronics and gadgets',
          owner: 'merchant1',
        },
      ],
      sidebarOpen: true,

      // Actions
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      addStore: (store) =>
        set((state) => ({
          stores: [...state.stores, store],
        })),

      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),
    }),
    {
      name: 'storecraft-storage', // localStorage key
    }
  )
);
