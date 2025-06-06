import { cache } from "react";
import { addServerHeaders } from "@/lib/utils.server";
import { Product } from "@/models/product.interface";
import { PaginatedResponse, QueryParam } from "@/models/request.interface";

export const getProductsList = cache(async (mode: "server" | "client", query: QueryParam = {}): Promise<PaginatedResponse<Product>> => {
  const UrlBase = mode === "server" ? process.env.API_BASE_URL : "/api";
  let requestInit: RequestInit = { method: "GET", next: { revalidate: 0 } };

  const queryParams: string[] = [];
  if (query.search) queryParams.push(`search=${query.search}`);
  if (query.page) queryParams.push(`page=${query.page}`);
  if (query.pp) queryParams.push(`pp=${query.pp}`);
  if (query.sort_type) queryParams.push(`sort_type=${query.sort_type}`);
  if (query.sort) queryParams.push(`sort=${query.sort}`);
  if (query.extraParams?.categoryFilter && query.extraParams?.categoryFilter !== "all") {
    queryParams.push(`categoryFilter=${query.extraParams?.categoryFilter}`);
  }

  if (mode === "server") requestInit = await addServerHeaders(requestInit);

  const R = await fetch(`${UrlBase}/products/?${queryParams.join("&")}`, requestInit)
    .then((response) => response)
    .catch((error) => {
      console.error({ error });
      return new Response(error, { status: 500, statusText: "Internal Error" });
    });

  if (R.status >= 400) console.error({ url: R.url, status: R.status, statusText: R.statusText });
  if (R.ok) return await R.json().catch((e) => ({ page: 1, pageTotal: 1, records: [], total: 0 }));

  return { page: 1, pageTotal: 1, records: [], total: 0 };
});

export const getSingleProduct = cache(async (mode: "server" | "client", productId: string): Promise<Product | undefined> => {
  const UrlBase = mode === "server" ? process.env.API_BASE_URL : "/api";
  let requestInit: RequestInit = { method: "GET", next: { revalidate: 0 } };

  if (mode === "server") requestInit = await addServerHeaders(requestInit);

  const R = await fetch(`${UrlBase}/products/${productId}`, requestInit)
    .then((response) => response)
    .catch((error) => {
      console.error({ error });
      return new Response(error, { status: 500, statusText: "Internal Error" });
    });

  if (R.status >= 400) console.error({ url: R.url, status: R.status, statusText: R.statusText });
  if (R.ok) return await R.json().catch((e) => undefined);

  return undefined;
});
