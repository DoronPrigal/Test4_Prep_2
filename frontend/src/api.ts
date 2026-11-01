import { Product } from "./types";

export type FilterType = "all" | "search" | "price" | "rating";

// בניית הנתיב לפי סוג הסינון
export async function fetchProducts(type: FilterType, value: string): Promise<Product[]> {
  const path = type === "all" ? "products" : `${type}/${encodeURIComponent(value)}`;
  const res = await fetch(`/api/${path}`);
  if (!res.ok) throw new Error(res.status === 422 ? "ערך לא תקין" : "שגיאה בטעינת המוצרים");
  return res.json();
}
