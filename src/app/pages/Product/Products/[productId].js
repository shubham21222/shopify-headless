// File: /pages/products/[productId].js
"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../../common/Spinner";
import AddToCart from "../../components/AddtoCart";

const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

export default function ProductDetail() {
  const router = useRouter();
  const { productId } = router.query; // Retrieve the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // GraphQL query to get product details by ID
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        variants(first: 1) {
          edges {
            node {
              id
              priceV2 {
                amount
              }
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

  // Fetch product data
  useEffect(() => {
    if (!productId) return;

    async function fetchProduct() {
      const { body, status } = await shopifyFetch({
        query,
        variables: { id: `gid://shopify/Product/${productId}` },
      });

      if (status === 200) {
        setProduct(body.data.product);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [productId]);

  if (loading) return <Spinner />;

  if (!product) return <div className="text-center">Product not found</div>;

  const productImage = product.images.edges[0]?.node.url || "";
  const productPrice = product.variants.edges[0]?.node.priceV2?.amount || "";

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row">
        <div className="flex justify-center md:w-1/2">
          {productImage ? (
            <Image
              src={productImage}  
              alt={product.title}
              width={500}
              height={500}
              className="rounded object-contain"
            />
          ) : (
            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>
        <div className="md:w-1/2 px-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl text-gray-800 font-semibold">₹{productPrice}</p>
          <AddToCart
            productId={product.id}
            variantId={product.variants.edges[0].node.id}
            productTitle={product.title}
            productImage={productImage}
            productPrice={productPrice}
            className="mt-6"
          />
        </div>
      </div>
    </div>
  );
}
