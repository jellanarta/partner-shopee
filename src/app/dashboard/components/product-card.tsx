import { Product } from "@/types/Product"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatNumber } from "@/utils/formatNumber"
import { Star, TrendingUp, ShoppingBag, MapPin, CheckCircle, AlertCircle } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const stockPercentage = (product.stock.current / product.stock.initial) * 100
  const stockStatus =
    stockPercentage > 50 ? "text-green-500" : stockPercentage > 20 ? "text-yellow-500" : "text-red-500"

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          {product.isMall && <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Mall</span>}
          {product.isOriginal && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Original</span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm ml-1 font-medium">{product.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center text-green-500 text-sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{product.growth.toFixed(1)}%</span>
          </div>
        </div>

        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 h-12">{product.name}</h3>

        <div className="flex items-center text-gray-500 text-xs mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{product.location}</span>
        </div>

        <div className="text-lg font-bold text-gray-800 mb-2">{formatCurrency(product.price)}</div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-blue-50 p-2 rounded">
            <div className="text-blue-700 font-medium">Total Sales</div>
            <div className="text-blue-900">{formatCurrency(product.sales.total)}</div>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <div className="text-green-700 font-medium">30 Days Sales</div>
            <div className="text-green-900">{formatCurrency(product.sales.last30Days)}</div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <div className="flex items-center">
            <ShoppingBag className="h-3 w-3 mr-1" />
            <span>{formatNumber(product.orders.total)} orders</span>
          </div>
          <div className={`flex items-center ${stockStatus}`}>
            {stockPercentage > 50 ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
            <span>Stock: {product.stock.current}</span>
          </div>
        </div>

        {/* Stock Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
          <div
            className={`h-1.5 rounded-full ${
              stockPercentage > 50 ? "bg-green-500" : stockPercentage > 20 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${stockPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
