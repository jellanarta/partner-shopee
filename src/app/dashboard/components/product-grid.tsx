import { DashboardData } from "@/types/DashboardData";
import { ProductCard } from "./product-card";
import { ProductFilter } from "./product-filter";
import { useState } from "react";
import { Product } from "@/types/Product";

interface ProductGridProps {
  data: DashboardData;
}

export function ProductGrid({ data }: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    data.products
  );
  const [filters, setFilters] = useState({
    searchQuery: "",
    location: "all",
    category: "all",
    priceRange: "all",
    sort: "popular",
    originalOnly: false,
    mallOnly: false,
    minRating: 0,
  });
  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });

    // Apply filters
    let filtered = [...data.products];

    // Search query
    if (newFilters.searchQuery) {
      const query = newFilters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.location.toLowerCase().includes(query)
      );
    }

    // Location filter
    if (newFilters.location && newFilters.location !== "all") {
      filtered = filtered.filter((product) =>
        product.location
          .toLowerCase()
          .includes(newFilters.location.toLowerCase())
      );
    }

    // Price range filter
    if (newFilters.priceRange && newFilters.priceRange !== "all") {
      switch (newFilters.priceRange) {
        case "under200k":
          filtered = filtered.filter((product) => product.price < 200000);
          break;
        case "200k-500k":
          filtered = filtered.filter(
            (product) => product.price >= 200000 && product.price <= 500000
          );
          break;
        case "500k-1m":
          filtered = filtered.filter(
            (product) => product.price > 500000 && product.price <= 1000000
          );
          break;
        case "above1m":
          filtered = filtered.filter((product) => product.price > 1000000);
          break;
      }
    }

    // Original only
    if (newFilters.originalOnly) {
      filtered = filtered.filter((product) => product.isOriginal);
    }

    // Mall only
    if (newFilters.mallOnly) {
      filtered = filtered.filter((product) => product.isMall);
    }

    // Rating filter
    if (newFilters.minRating > 0) {
      filtered = filtered.filter(
        (product) => product.rating >= newFilters.minRating
      );
    }

    // Sort
    if (newFilters.sort) {
      switch (newFilters.sort) {
        case "newest":
          filtered.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "sales":
          filtered.sort((a, b) => b.sales.total - a.sales.total);
          break;
        default: // popular - by orders
          filtered.sort((a, b) => b.orders.total - a.orders.total);
      }
    }

    setFilteredProducts(filtered);
  };
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Products ({data.summary.totalItems})
        </h2>
        <div className="text-sm text-gray-500">
          Total Revenue:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(data.summary.totalRevenue)}
        </div>
      </div>

      <ProductFilter onFilterChange={handleFilterChange} />

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your filters.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() =>
              handleFilterChange({
                searchQuery: "",
                location: "all",
                category: "all",
                priceRange: "all",
                sort: "popular",
                originalOnly: false,
                mallOnly: false,
                minRating: 0,
              })
            }
          >
            Clear Filters
          </button>
        </div>

      )}
    </div>
  );
}
