import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">ShopLite</div>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart <span className="cart-count">3</span></NavLink>
      </nav>
    </header>
  );
}
