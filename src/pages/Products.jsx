import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data.js";

export default function Products() {
  return (
    <>
      <h2 className="page-title">Products</h2>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
