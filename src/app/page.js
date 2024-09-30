"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Heading from "./components/Heading";

const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

export default function Home() {
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the Shopify GraphQL query
  const query = `
    {
      shop {
        name
      }
      products(first: 10) {
        edges {
          node {
            id
            title
            collections(first: 10) {
              edges {
                node {
                  id
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  // Shopify Fetch function
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

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();
      return { status: result.status, body: data };
    } catch (error) {
      console.error("Error:", error);
      return {
        status: 500,
        error: "Error receiving data",
      };
    }
  }

  // Fetch data from Shopify
  useEffect(() => {
    async function fetchData() {
      try {
        const { body, status, error } = await shopifyFetch({ query });

        if (status === 200) {
          setShopData(body.data);
        } else {
          setError(error || "Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );



  return (
    <div className="container mx-auto px-4 py-6">
      {/* Simplified h1 style for better LCP */}
      <Heading shopData={shopData} loading={loading}/>

      {/* Product list */}
      <h2 className="text-2xl mb-4 font-sans text-center">Products:</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {shopData?.products?.edges.map((product) => (
          <div
            key={product.node.id}
            className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              {product.node.images.edges.length > 0 ? (
                <Image
                  src={product.node.images.edges[0].node.url}
                  alt={product.node.title}
                  width={300}
                  height={300}
                  className="rounded object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>
            <h3 className="text-[2vh] font-medium  text-gray-800 text-center">
              {product.node.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
