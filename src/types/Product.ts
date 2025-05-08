export interface Product {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  isMall: boolean;
  isOriginal: boolean;
  rating: number;
  sales: {
    total: number;
    last30Days: number;
    averagePerDay: number;
  };
  orders: {
    total: number;
    last30Days: number;
    averagePerDay: number;
  };
  stock: {
    current: number;
    initial: number;
  };
  growth: number;
  createdAt: string;
}
