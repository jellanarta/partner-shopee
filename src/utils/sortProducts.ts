import { Product } from "@/types/Product";
import { SortFilter, SortFilterBeranda } from "@/types/SortOption";

export function sortProducts(
  products: Product[],
  filter: SortFilter | SortFilterBeranda
): Product[] {
  const sorted = [...products]; // Jangan ubah array asli

  switch (filter) {
    case "murah":
      sorted.sort((a, b) => a.price - b.price); // Mengurutkan berdasarkan harga terendah
      break;
    case "mahal":
      sorted.sort((a, b) => b.price - a.price); // Mengurutkan berdasarkan harga tertinggi
      break;
    case "populer":
      sorted.sort((a, b) => b.rating - a.rating); // Mengurutkan berdasarkan rating tertinggi
      break;
    case "laris":
      sorted.sort((a, b) => b.orders.total - a.orders.total); // Mengurutkan berdasarkan total penjualan
      break;
    case "terbaru":
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Mengurutkan berdasarkan tanggal terbaru
      break;
    case "produk_mall":
      sorted.sort((a, b) => (b.isMall ? 1 : 0) - (a.isMall ? 1 : 0)); // Mengurutkan berdasarkan produk Mall
      break;
    case "stok_terbanyak":
      sorted.sort((a, b) => b.stock.current - a.stock.current); // Mengurutkan berdasarkan stok terbanyak
      break;
    default:
      break;
  }

  return sorted;
}
