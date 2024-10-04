"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";

const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCartItems =
      JSON.parse(localStorage.getItem("shopify-cart")) || [];
    setCartItems(storedCartItems);
    setLoading(false);
  }, []);

  // Update cart items in localStorage
  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("shopify-cart", JSON.stringify(updatedItems));
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCartItems);
  };

  // Function to handle increasing quantity
  const increaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCart(updatedCartItems);
  };

  // Function to handle decreasing quantity
  const decreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateCart(updatedCartItems);
  };

  // Shopify Fetch Function
  async function shopifyFetch({ query, variables }) {
    try {
      const result = await fetch(SHOPIFY_STORE_DOMAIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await result.json();
      if (data.errors) throw new Error(data.errors[0].message);
      return data;
    } catch (error) {
      setError("Checkout failed. Please try again.");
      console.error("Shopify fetch error:", error);
    }
  }

  // Function to handle checkout
  const handleCheckout = async () => {
    const lineItems = cartItems.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const query = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: { lineItems },
    };

    try {
      const data = await shopifyFetch({ query, variables });

      if (data?.data?.checkoutCreate?.checkout?.webUrl) {
        window.location.href = data.data.checkoutCreate.checkout.webUrl;
      } else {
        setError("Failed to create checkout session.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 pt-[80px] ">
        <h2 className="text-2xl mb-4 font-bold text-[#40001c]  text-[7vh]">
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-black">Your cart is empty.</p>
        ) : (
          <div className="rounded-md border w-1/2 border-mute bg-default p-4">
            {" "}
            <div className=" ">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border mt-3  rounded-lg p-4 bg-white shadow-md hover:shadow-lg"
                >
                  <div className="flex flex-row justify-between">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-1/2 h-48 object-contain mb-4"
                      width={150}
                      height={150}
                    />
                    <h3 className="text-lg flex justify-start items-center font-medium text-gray-800">
                      {item.title}
                    </h3>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className=" text-black rounded flex justify-start"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-6 xl:size-8"
                      >
                        <title>close icon</title>
                        <g id="Icon">
                          <path
                            id="Vector 172"
                            d="M5.36401 18.0918L18.0919 5.36387"
                            stroke="currentColor"
                            stroke-width="1.5"
                          ></path>
                          <path
                            id="Vector 173"
                            d="M5.36401 5.36401L18.0919 18.0919"
                            stroke="currentColor"
                            stroke-width="1.5"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className="border-b-2"></div>

                  <div className="flex mt-4 flex-row gap-3 justify-between items-center">
                    <p className="text-black">Quantity: {item.quantity}</p>
                    <div className="flex space-x-2 border gap-4  items-center">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className=" px-2 py-1 text-black bg-gray-300 rounded hover:bg-gray-400 "
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className=" text-black">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 text-black bg-gray-300 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-black">${item.price}</p>{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {cartItems.length > 0 && (
          <button
            onClick={handleCheckout}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
          >
            Checkout
          </button>
        )}
      </div>
    </>
  );
}
