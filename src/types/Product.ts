export type Sales = {
  total: number;
  last30Days: number;
  averagePerDay: number;
};

export type Orders = {
  total: number;
  last30Days: number;
  averagePerDay: number;
};

export type Stock = {
  current: number;
  initial: number;
};

export type Product = {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  isMall: boolean;
  isOriginal: boolean;
  rating: number;
  sales: Sales;
  orders: Orders;
  stock: Stock;
  growth: number;
  createdAt: string;
};