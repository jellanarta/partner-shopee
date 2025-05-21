import { Product } from "@/types/Product";
import {  SortFilterBeranda, SortOptionData } from "@/types/SortOption";

export function sortProducts(
  products: Product[],
  filter: SortOptionData | SortFilterBeranda
): Product[] {
  const sorted = [...products]; // Jangan ubah array asli

  switch (filter) {
    case "cheap":
      sorted.sort((a, b) => a.price - b.price); // Mengurutkan berdasarkan harga terendah
      break;
    case "expensive":
      sorted.sort((a, b) => b.price - a.price); // Mengurutkan berdasarkan harga tertinggi
      break;
    case "popular":
      sorted.sort((a, b) => b.rating - a.rating); // Mengurutkan berdasarkan rating tertinggi
      break;
    case "best selling":
      sorted.sort((a, b) => b.orders.total - a.orders.total); // Mengurutkan berdasarkan total penjualan
      break;
    case "newest":
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Mengurutkan berdasarkan tanggal terbaru
      break;
    case "mall_product":
      sorted.sort((a, b) => (b.isMall ? 1 : 0) - (a.isMall ? 1 : 0)); // Mengurutkan berdasarkan produk Mall
      break;
    case "most_stock":
      sorted.sort((a, b) => b.stock.current - a.stock.current); // Mengurutkan berdasarkan stok terbanyak
      break;
    default:
      break;
  }

  return sorted;
}
