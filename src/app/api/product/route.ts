import dataDummyProducts from "@/types/dataDumyProduct";
import { Product } from "@/types/Product";
import { SortFilter } from "@/types/SortOption";
import { sortProducts } from "@/utils/sortProducts";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    // Get 'name', 'page', and 'limit' from query parameters
    const query: string | null = params.get("name");
    const filterParam: string | null = params.get("filter");

    // Validasi filter yang diterima
    const validFilters: SortFilter[] = [
      "murah",
      "mahal",
      "populer",
      "laris",
      "default",
    ];
    const filter: SortFilter = validFilters.includes(filterParam as SortFilter)
      ? (filterParam as SortFilter) // jika valid, gunakan filter tersebut
      : "default"; // jika tidak valid, defaultkan ke "murah"
    let page: number = parseInt(params.get("page") || "1", 10);
    const limit: number = parseInt(params.get("limit") || "12", 10);

    // filter berdasarkan sapa saja ni anjing dio
    // harga tertinggi
    // harga terendah
    // telaris
    // terpopuler

    // console.log(`Searching for products with name: ${query}, Page: ${page}, Limit: ${limit}`);

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ message: "Please provide a product name keyword." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const keywordLower = query.toLowerCase();

    const filteredProducts = dataDummyProducts.filter((product) =>
      product.name.toLowerCase().includes(keywordLower)
    );

    // ❗️ Check if no products found
    if (filteredProducts.length === 0) {
      return new Response(
        JSON.stringify({
          message: "No products found matching the given keyword.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const filteredProductsFilter: { products: Product[] } = {
      products: [],
    };
    let withFilter = ""
    if (filter !== "default") {
      filteredProductsFilter.products = sortProducts(filteredProducts, filter);
      withFilter+=`&filter=${filter}`
    }else{
      filteredProductsFilter.products = filteredProducts
    }
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const productsToReturn = filteredProductsFilter.products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProductsFilter.products.length / limit);
    const hasNextPage = endIndex < filteredProductsFilter.products.length;


    const returnData = {
      products: productsToReturn,
      next: hasNextPage
        ? `/api/product?name=${query}&page=${page + 1}&limit=${limit}${withFilter}`
        : null,
      totalPages,
      currentPage: page,
    };
    // console.log(returnData)
    return new Response(JSON.stringify(returnData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred while fetching products." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
