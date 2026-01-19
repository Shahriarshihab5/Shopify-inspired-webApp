"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export default function PublicProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Public list – API থেকে পড়লে ভালো, আপাতত local Zustand থাকলে চাইলে useStore ব্যবহার করতে পারো
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) return;
        const data = await res.json();
        setProducts(data.products ?? data);
      } catch (e) {
        console.error("Failed to load products", e);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 md:mb-10">
          Store Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="h-40 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </p>
                  <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No products available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
