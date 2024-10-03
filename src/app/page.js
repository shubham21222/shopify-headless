"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Heading from "./components/Heading";
import AddProduct from "./components/AddProduct";
import AddToCart from "./components/AddtoCart";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Spinner from "./common/Spinner";
import Main from "./components/Main";
import Footer from "./components/Footer";

const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

export default function Home() {
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the Shopify Storefront GraphQL query
  // Define the Shopify Storefront GraphQL query
  const query = `
  {
    shop {
      name
    }
    products(first: 250) {
      edges {
        node {
          id
          title
          variants(first: 1) {
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

  // Fetch function for Storefront API
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

  // Fetch data from Storefront API
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

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );

  return (
    <>
      <Toaster />
      <Heading shopData={shopData} loading={loading} className="h-[100vh]"/>
      <Main/>
     <Footer/>
    </>
  );
}
