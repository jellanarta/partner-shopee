import dataDummyProducts from "@/types/dataDumyProduct";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    // Get 'name', 'page', and 'limit' from query parameters
    const query: string | null = params.get("name");
    const page: number = parseInt(params.get("page") || "1", 10);
    const limit: number = parseInt(params.get("limit") || "12", 10);

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
        JSON.stringify({ message: "No products found matching the given keyword." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const productsToReturn = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / limit);
    const hasNextPage = endIndex < filteredProducts.length;

    console.log(productsToReturn)
    return new Response(
      JSON.stringify({
        products: productsToReturn,
        next: hasNextPage ? `/api/product?name=${query}&page=${page + 1}&limit=${limit}` : null,
        totalPages,
        currentPage: page,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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
