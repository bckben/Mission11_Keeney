import React from 'react';
import { getCart, clearCart, getLastView } from '../services/CartService';

const Cart: React.FC = () => {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const continueShopping = () => {
    const { page, category } = getLastView();
    window.location.href = `/?page=${page}&category=${encodeURIComponent(category)}`;
  };

  return (
    <div className="container mt-4">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5 className="mt-3">Total: ${total.toFixed(2)}</h5>

          <div className="mt-4 d-flex gap-3">
            <button
              className="btn btn-secondary"
              onClick={continueShopping}
            >
              ⬅️ Continue Shopping
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                clearCart();
                window.location.reload();
              }}
            >
              ❌ Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
