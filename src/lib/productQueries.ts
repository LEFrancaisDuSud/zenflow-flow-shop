import { queryOptions } from "@tanstack/react-query";
import { fetchProductByHandle, fetchProducts } from "./shopify";

export const productsQueryOptions = (query?: string) =>
  queryOptions({
    queryKey: ["products", query ?? "all"],
    queryFn: () => fetchProducts(50, query),
    staleTime: 60_000,
  });

export const productByHandleQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
    staleTime: 60_000,
  });

export const PRODUCT_CATEGORIES = [
  "Tous",
  "Masseurs électriques",
  "Thérapie thermique",
  "Récupération sportive",
  "Coussins & supports",
];
