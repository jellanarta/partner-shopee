import dataDummyProducts from "@/types/dataDumyProduct";
import {
  daftarLabelFilter,
  LabelFilterProduk,
} from "@/types/LabelFilterProduk";
import { Product } from "@/types/Product";
import { SortFilter } from "@/types/SortOption";
import { sortProducts } from "@/utils/sortProducts";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    // Get 'name', 'page', and 'limit' from query parameters
    const query: string | null = params.get("name");
    const queryCategorie: string | null = params.get("category");

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

    if (!query || !query.trim().length) {
      if (!queryCategorie || !queryCategorie.trim().length) {
        return new Response(
          JSON.stringify({ message: "Please provide a product name keyword." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        if (
          !(daftarLabelFilter as readonly string[]).includes(queryCategorie)
        ) {
          return new Response(
            JSON.stringify({
              message: "Please provide a product name keyword.",
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }
    }

    const dataproducts: { products: Product[] } = {
      products: [],
    };

    if (query) {
      const keywordLower = query?.toLowerCase();
      dataproducts.products = dataDummyProducts.filter((product) =>
        product.name.toLowerCase().includes(keywordLower ? keywordLower : "")
      );
    } else if (queryCategorie) {
      const category = queryCategorie as LabelFilterProduk;
      if (category === "Populer") {
        dataproducts.products = sortProducts(dataDummyProducts, "populer");
      } else if (category === "Terbaru") {
        dataproducts.products = sortProducts(dataDummyProducts, "terbaru");
      } else if (category === "Terlaris") {
        dataproducts.products = sortProducts(dataDummyProducts, "laris");
      } else if (category === "Stok Terbanyak") {
        dataproducts.products = sortProducts(
          dataDummyProducts,
          "stok_terbanyak"
        );
      } else if (category === "Produk Mall") {
        dataproducts.products = sortProducts(dataDummyProducts, "produk_mall");
      } else {
        dataproducts.products = [];
      }
    }

    // ❗️ Check if no products found
    if (dataproducts.products.length === 0) {
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
    let withFilter = "";
    if (filter !== "default") {
      filteredProductsFilter.products = sortProducts(
        dataproducts.products,
        filter
      );
      withFilter += `&filter=${filter}`;
    } else {
      filteredProductsFilter.products = dataproducts.products;
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const productsToReturn = filteredProductsFilter.products.slice(
      startIndex,
      endIndex
    );
    const totalPages = Math.ceil(
      filteredProductsFilter.products.length / limit
    );
    const hasNextPage = endIndex < filteredProductsFilter.products.length;

    let nextUrl = `/api/product?name=${query}&page=${
      page + 1
    }&limit=${limit}${withFilter}`;

    if (
      (daftarLabelFilter as readonly string[]).includes(
        queryCategorie ? queryCategorie : ""
      )
    ) {
      nextUrl = nextUrl.replace(/(\?name=null)/, "?category=" + queryCategorie);
    }
    const returnData = {
      products: productsToReturn,
      next: hasNextPage ? nextUrl : null,
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
