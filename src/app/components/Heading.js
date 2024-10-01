import Link from "next/link";
import React, { useEffect, useState } from "react";

const Heading = ({ loading, shopData }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50); // Change this value to adjust when the background color changes
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function ShopNameSkeleton() {
    return (
      <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
    );
  }

  return (
    <div
      className={`flex justify-between items-center p-4 sticky top-0 z-50 transition duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <h1 className="text-2xl font-bold text-center text-black">
        {loading ? <ShopNameSkeleton /> : shopData?.shop?.name}
      </h1>
      <Link href="/Cart">
        <button className="bg-gray-700 text-white rounded-full p-2 px-4 hover:bg-gray-600 transition duration-300 ease-in-out">
          Go to Cart
        </button>
      </Link>
    </div>
  );
};

export default Heading;
