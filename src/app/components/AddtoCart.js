"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const AddToCart = ({ productId, variantId, productTitle, productImage, productPrice }) => {
  const [isAdding, setIsAdding] = useState(false);

  // Function to add product to localStorage
  const handleAddToCart = () => {
    setIsAdding(true);
  
    const existingCartItems = JSON.parse(localStorage.getItem("shopify-cart")) || [];
  
    const newCartItem = {
      id: productId,
      variantId,
      title: productTitle,
      image: productImage, // Store the product image
      price: productPrice,  // Store the product price
      quantity: 1,
    };
  
    const productExists = existingCartItems.find((item) => item.id === productId);
  
    if (productExists) {
      productExists.quantity += 1;
    } else {
      existingCartItems.push(newCartItem);
    }
  
    localStorage.setItem("shopify-cart", JSON.stringify(existingCartItems));
    
    toast.success(`${productTitle} has been added to your cart!`);

    setIsAdding(false);
  };
  
  return (
    
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`p-2 bg-green-500 text-white rounded hover:bg-green-700 ${
        isAdding && "cursor-not-allowed"
      }`}
    >
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCart;
