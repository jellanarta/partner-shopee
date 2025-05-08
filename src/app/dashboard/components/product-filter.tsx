"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, ChevronDown, Star, MapPin, Tag, TrendingUp } from "lucide-react"

interface FilterOption {
  id: string
  label: string
}

const locations: FilterOption[] = [
  { id: "all", label: "All Locations" },
  { id: "jakarta", label: "Jakarta" },
  { id: "bandung", label: "Bandung" },
  { id: "surabaya", label: "Surabaya" },
  { id: "tangerang", label: "Tangerang" },
  { id: "bali", label: "Bali" },
]

const categories: FilterOption[] = [
  { id: "all", label: "All Categories" },
  { id: "shoes", label: "Shoes" },
  { id: "electronics", label: "Electronics" },
  { id: "fashion", label: "Fashion" },
  { id: "accessories", label: "Accessories" },
]

const priceRanges: FilterOption[] = [
  { id: "all", label: "All Prices" },
  { id: "under200k", label: "Under Rp 200K" },
  { id: "200k-500k", label: "Rp 200K - Rp 500K" },
  { id: "500k-1m", label: "Rp 500K - Rp 1M" },
  { id: "above1m", label: "Above Rp 1M" },
]

const sortOptions: FilterOption[] = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rating" },
  { id: "sales", label: "Best Selling" },
]

interface ProductFilterProps {
  onFilterChange?: (filters: any) => void
}

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [selectedSort, setSelectedSort] = useState("popular")
  const [showOriginalOnly, setShowOriginalOnly] = useState(false)
  const [showMallOnly, setShowMallOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)

  const handleFilterChange = () => {
    if (onFilterChange) {
      onFilterChange({
        searchQuery,
        location: selectedLocation,
        category: selectedCategory,
        priceRange: selectedPriceRange,
        sort: selectedSort,
        originalOnly: showOriginalOnly,
        mallOnly: showMallOnly,
        minRating,
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            handleFilterChange()
          }}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center">
          <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        {/* Category Dropdown */}
        <div className="relative group">
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <Tag className="h-4 w-4 mr-1.5 text-gray-500" />
            <span className="mr-1">{categories.find((c) => c.id === selectedCategory)?.label || "Category"}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden group-hover:block">
            {categories.map((category) => (
              <button
                key={category.id}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSelectedCategory(category.id)
                  handleFilterChange()
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="relative group">
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <MapPin className="h-4 w-4 mr-1.5 text-gray-500" />
            <span className="mr-1">{locations.find((l) => l.id === selectedLocation)?.label || "Location"}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden group-hover:block">
            {locations.map((location) => (
              <button
                key={location.id}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSelectedLocation(location.id)
                  handleFilterChange()
                }}
              >
                {location.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Dropdown */}
        <div className="relative group">
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <span className="mr-1.5 text-gray-500">Rp</span>
            <span className="mr-1">{priceRanges.find((p) => p.id === selectedPriceRange)?.label || "Price Range"}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden group-hover:block">
            {priceRanges.map((range) => (
              <button
                key={range.id}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSelectedPriceRange(range.id)
                  handleFilterChange()
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="relative group">
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <Star className="h-4 w-4 mr-1.5 text-yellow-400 fill-yellow-400" />
            <span className="mr-1">{minRating > 0 ? `${minRating}+ Stars` : "Rating"}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden group-hover:block">
            {[0, 4, 4.5, 4.8].map((rating) => (
              <button
                key={rating}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                onClick={() => {
                  setMinRating(rating)
                  handleFilterChange()
                }}
              >
                {rating === 0 ? (
                  "All Ratings"
                ) : (
                  <>
                    <span className="flex items-center">
                      {rating}+ <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-4">
          <label className="flex items-center text-sm cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={showMallOnly}
              onChange={() => {
                setShowMallOnly(!showMallOnly)
                handleFilterChange()
              }}
            />
            <span className="ml-2">Mall Only</span>
          </label>
          <label className="flex items-center text-sm cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={showOriginalOnly}
              onChange={() => {
                setShowOriginalOnly(!showOriginalOnly)
                handleFilterChange()
              }}
            />
            <span className="ml-2">Original Only</span>
          </label>
        </div>

        {/* Sort Dropdown - Push to the right */}
        <div className="relative group ml-auto">
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <TrendingUp className="h-4 w-4 mr-1.5 text-gray-500" />
            <span className="mr-1">Sort: {sortOptions.find((s) => s.id === selectedSort)?.label || "Popular"}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden group-hover:block">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSelectedSort(option.id)
                  handleFilterChange()
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
