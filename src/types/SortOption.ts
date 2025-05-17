export enum SortOption {
  Default = "default",
  Murah = "murah",
  Mahal = "mahal",
  Populer = "populer",
  Laris = "laris",
}
export type SortFilter =
  | "murah"
  | "mahal"
  | "populer"
  | "laris"
  | "default"
  | "stok_terbanyak"
  | "produk_mall"
  | "terbaru";

export enum SortOptionBeranda {
  Populer = "populer",
  Laris = "laris",
  Terbaru = "terbaru",
  ProdukMall = "produk_mall",
  StokTerbanyak = "stok_terbanyak",
}

export type SortFilterBeranda =
  | "populer"
  | "laris"
  | "stok_terbanyak"
  | "produk_mall"
  | "terbaru";
