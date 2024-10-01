"use client";
import { useState } from "react";

const Cart = ({ productId, variantId }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItemIndex = cart.findIndex(
      (item) => item.variantId === variantId
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ productId, variantId, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart");
  };

  return (
    <div className="mt-4">
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        className="border rounded p-1 mr-2"
      />
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Cart;
