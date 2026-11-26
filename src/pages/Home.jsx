import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <h1>Gear up for your next adventure</h1>
      <p>Quality outdoor equipment at honest prices.</p>
      <Link to="/products" className="btn btn-hero">Browse products</Link>
    </section>
  );
}
