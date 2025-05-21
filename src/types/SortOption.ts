export enum SortOption {
  Default = "default",
  Murah = "cheap",
  Mahal = "expensive",
  Populer = "popular", 
  Laris = "best_selling",
}

export const sortOptionData = ['default','cheap','expensive','popular','best selling']
export type SortOptionData = 'default' | 'cheap' | 'expensive' | 'popular' | 'best selling';

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
