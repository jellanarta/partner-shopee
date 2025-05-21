export const daftarLabelFilter = [
  "Newest",
  "Popular",
  "Best Selling",
//   "Lowest Price",
//   "Highest Price",
//   "Top Rated",
  "Mall Products",
//   "Original Products",
  "Most Stock",
//   "Highest Growth",
] as const;

export type LabelFilterProduk = (typeof daftarLabelFilter)[number];
