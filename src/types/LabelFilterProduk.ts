export const daftarLabelFilter = [
  "Terbaru",
  "Populer",
  "Terlaris",
//   "Harga Terendah",
//   "Harga Tertinggi",
//   "Rating Tertinggi",
  "Produk Mall",
//   "Produk Original",
  "Stok Terbanyak",
//   "Pertumbuhan Tertinggi",
] as const;

export type LabelFilterProduk = (typeof daftarLabelFilter)[number];
