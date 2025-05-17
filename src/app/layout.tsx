import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PrelineScript from "./components/PrelineScript";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopee Insights: Statistik Produk untuk Meningkatkan Penjualan",
  description: "Temukan data statistik Shopee yang mendalam untuk produk-produk terpopuler. Shopee Insights memberikan analisis dan tren terbaru, membantu penjual dan pembeli membuat keputusan yang lebih cerdas. Dapatkan informasi lengkap tentang performa produk, harga, dan popularitas untuk meningkatkan penjualan di platform Shopee. Akses mudah, data akurat, dan solusi terbaik untuk mengoptimalkan strategi penjualan Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <PrelineScript />
    </html>
  );
}
