import { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card glass">
      <img src={product.image} alt={product.title} loading="lazy" />
      <h2>{product.title}</h2>
      <p className="category">{product.category}</p>
      <div className="meta">
        <span className="price">${product.price}</span>
        <span aria-label={`דירוג ${product.rating.rate} מתוך 5`}>
          ⭐ {product.rating.rate} ({product.rating.count})
        </span>
      </div>
    </article>
  );
}
