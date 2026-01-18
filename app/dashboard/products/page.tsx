"use client";

import { useState } from "react";
import { useStore } from "@/app/store/useStore";
import { Plus, Search, Edit2, Trash2, Package } from "lucide-react";
import AddProductModal from "@/app/components/add-product-modal";
import EditProductModal from "@/app/components/edit-product-modal";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export default function ProductsPage() {
  const { products, deleteProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-950 min-h-full">
      
      {/* Header - ADD TOP MARGIN FOR MOBILE MENU */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-8 mb-4 md:mb-8 mt-12 md:mt-0">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">
            Products
          </h1>
          <p className="text-xs md:text-base text-gray-600 dark:text-gray-400 font-semibold mt-1">
            Manage your inventory
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-8 py-2.5 md:py-3 bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg md:rounded-xl font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 md:mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 bg-gray-50 dark:bg-gray-900 border border-emerald-200 dark:border-emerald-800 rounded-lg md:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs md:text-base placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Products Grid - 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => {
            const gradients = [
              "from-emerald-500 to-teal-600",
              "from-teal-500 to-cyan-600",
              "from-cyan-500 to-emerald-600",
              "from-emerald-600 to-cyan-600",
              "from-teal-600 to-emerald-600",
            ];
            const grad = gradients[index % 5];
            return (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-lg md:rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all group"
              >
                {/* Product Image */}
                <div className={`h-32 md:h-48 bg-gradient-to-br ${grad} flex items-center justify-center`}>
                  <Package className="w-12 h-12 md:w-16 md:h-16 text-white opacity-50" />
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-6">
                  {/* Name & Category */}
                  <div className="mb-3">
                    <h3 className="text-base md:text-xl font-black text-gray-900 dark:text-white mb-1 truncate">
                      {product.name}
                    </h3>
                    <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                      {product.category}
                    </span>
                  </div>

                  {/* Price & Stock */}
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div>
                      <p className="text-lg md:text-2xl font-black text-gray-900 dark:text-white">
                        ${product.price}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {product.stock} units
                      </p>
                    </div>
                    <div
                      className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-bold ${
                        product.stock > 20
                          ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                      }`}
                    >
                      {product.stock > 20
                        ? "In Stock"
                        : product.stock > 0
                        ? "Low"
                        : "Out"}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition font-bold text-xs md:text-sm"
                    >
                      <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${product.name}"?`)) {
                          deleteProduct(product.id);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition font-bold text-xs md:text-sm"
                    >
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 md:py-20">
            <Package className="w-12 h-12 md:w-16 md:h-16 text-gray-300 dark:text-gray-700 mx-auto mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              No products found
            </h3>
            <p className="text-xs md:text-base text-gray-600 dark:text-gray-400">
              Try searching or add a new product
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}
