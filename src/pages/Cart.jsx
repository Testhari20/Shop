import { cartItems } from "../data.js";

export default function Cart() {
  const total = cartItems.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <>
      <h2 className="page-title">Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
        </thead>
        <tbody>
          {cartItems.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{i.qty}</td>
              <td>${(i.qty * i.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <span>Total</span>
        <strong>${total.toFixed(2)}</strong>
      </div>
      <button className="btn btn-checkout">Checkout</button>
    </>
  );
}
