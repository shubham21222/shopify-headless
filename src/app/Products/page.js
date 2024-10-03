"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import AddProduct from "../components/AddProduct";
import { Toaster } from "react-hot-toast";
import Spinner from "../common/Spinner";
import Main from "../components/Main";
import AddToCart from "../components/AddtoCart";
import Header from "../components/Header";

const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

export default function Products() {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const query = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
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
        cursor
      }
      pageInfo {
        hasNextPage
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

  // Fetch initial data and more data on scroll
  useEffect(() => {
    async function fetchData() {
      try {
        const { body, status, error } = await shopifyFetch({
          query,
          variables: { first: 8, after: null }, // Fetch initial 8 products
        });

        if (status === 200) {
          setShopData(body.data.products.edges);
          setHasNextPage(body.data.products.pageInfo.hasNextPage);
          setCursor(
            body.data.products.edges[body.data.products.edges.length - 1].cursor
          );
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

  // Load more products when the user scrolls
  const loadMoreProducts = async () => {
    if (!hasNextPage || loadingMore) return;

    setLoadingMore(true);
    try {
      const { body, status, error } = await shopifyFetch({
        query,
        variables: { first: 8, after: cursor }, // Fetch next 8 products
      });

      if (status === 200) {
        setShopData((prevData) => [...prevData, ...body.data.products.edges]);
        setHasNextPage(body.data.products.pageInfo.hasNextPage);
        setCursor(
          body.data.products.edges[body.data.products.edges.length - 1].cursor
        );
      } else {
        setError(error || "Failed to load more data");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Infinite scrolling using intersection observer
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cursor, hasNextPage, loadingMore]);

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );

  return (
    <>
      <Toaster />
      <Header />

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl mb-4 font-sans text-center text-black">
          Products:
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {shopData?.map((product) => {
            const productImage = product.node.images.edges[0]?.node.url || "";
            const productPrice =
              product.node.variants.edges[0]?.node.priceV2?.amount || "";

            return (
              <div
                key={product.node.id}
                className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg"
              >
                <div className="flex justify-center mb-4">
                  {productImage ? (
                    <Image
                      src={productImage}
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
                <h3 className="text-[2vh] font-medium text-gray-800 text-center">
                  {product.node.title}
                </h3>
                <p className="text-center text-gray-500">${productPrice}</p>{" "}
                <AddToCart
                  productId={product.node.id}
                  variantId={product.node.variants.edges[0].node.id}
                  productTitle={product.node.title}
                  productImage={productImage}
                  productPrice={productPrice}
                  className="flex justify-center items-center"
                />
              </div>
            );
          })}
        </div>
        {loadingMore && (
          <div className="flex justify-center items-center mt-4">
            <Spinner />
          </div>
        )}
        {/* <AddProduct /> */}
      </div>
    </>
  );
}
