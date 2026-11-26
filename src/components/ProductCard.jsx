export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      {product.tag && <span className="tag">{product.tag}</span>}
      <div className="product-img" style={{ background: product.color }} />
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <button className="btn">Add to cart</button>
    </div>
  );
}
