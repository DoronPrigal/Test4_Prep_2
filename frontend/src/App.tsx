import { useEffect, useState } from "react";
import { fetchProducts, FilterType } from "./api";
import { Product } from "./types";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(type: FilterType, value: string) {
    setLoading(true);
    setError("");
    try {
      setProducts(await fetchProducts(type, value));
    } catch (e) {
      setProducts([]);
      setError((e as Error).message);
    }
    setLoading(false);
  }

  useEffect(() => {
    load("all", "");
  }, []);

  return (
    <main>
      <header>
        <h1>חנות מוצרים</h1>
      </header>
      <SearchBar onFilter={load} />
      <div aria-live="polite" className="status">
        {loading && "טוען..."}
        {error && <span className="error">{error}</span>}
        {!loading && !error && (products.length === 0 ? "לא נמצאו מוצרים" : `נמצאו ${products.length} מוצרים`)}
      </div>
      <section className="grid" aria-label="רשימת מוצרים">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  );
}
