"use client";
import React, { useState } from "react";

const AddProduct = () => {
  const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

  const [newProduct, setNewProduct] = useState({
    title: "",
    vendor: "",
    tags: "",
    imageUrl: "",
    price: "",
    color: "",
    size: "",
    material: "",
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const input = {
      title: newProduct.title,
      vendor: newProduct.vendor,
      tags: newProduct.tags.split(','),
      images: [
        {
          src: newProduct.imageUrl,
        },
      ],
      variants: [
        {
          price: newProduct.price,
        },
      ],
      metafields: [
        { namespace: "custom", key: "color", value: newProduct.color, type: "single_line_text_field" },
        { namespace: "custom", key: "size", value: newProduct.size, type: "single_line_text_field" },
        { namespace: "custom", key: "material", value: newProduct.material, type: "single_line_text_field" },
      ],
      publishedAt: new Date().toISOString(), // Ensure immediate publication
    };

    try {
      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_API_TOKEN,
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const data = await response.json();
      console.log("Product created successfully:", data);
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div className="mt-10 p-6 border rounded-lg bg-gray-100">
      <h2 className="text-xl mb-4 font-bold text-black">Add a New Product to Shopify</h2>
      <form onSubmit={handleAddProduct} className="space-y-4 text-black">
        <div>
          <label className="block mb-2">Product Title:</label>
          <input
            type="text"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Image URL:</label>
          <input
            type="text"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Price (in USD):</label>
          <input
            type="number"
            step="0.01"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Product Color:</label>
          <input
            type="text"
            value={newProduct.color}
            onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Product Size:</label>
          <input
            type="text"
            value={newProduct.size}
            onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Product Material:</label>
          <input
            type="text"
            value={newProduct.material}
            onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-800"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
