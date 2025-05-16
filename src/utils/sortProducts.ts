import { Product } from "@/types/Product";
import { SortFilter } from "@/types/SortOption";

export function sortProducts(
  products: Product[],
  filter: SortFilter
): Product[] {
  const sorted = [...products]; // jangan ubah array asli

  switch (filter) {
    case "murah":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "mahal":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "populer":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "laris":
      sorted.sort((a, b) => b.orders.total - a.orders.total);
      break;
    default:
      break;
  }
  return sorted;
}
