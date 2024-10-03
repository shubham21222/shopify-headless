import React from "react";
import Hamburger from "../ui/Hamburger";
import Link from "next/link";
import Cart from "../ui/Cart";

const Header = ({ isScrolled, loading, shopData }) => {
  function ShopNameSkeleton() {
    return (
      <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
    );
  }
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 p-4 transition duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center container-main">
        <Hamburger
          isScrolled={isScrolled}
          className={`${isScrolled ? "text-black" : "text-white"}`}
        />

        <h1
          className={`text-2xl font-bold text-center ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          {loading ? <ShopNameSkeleton /> : shopData?.shop?.name}
        </h1>

        <Link href="/Cart">
          <Cart
            isScrolled={isScrolled}
            className={`${isScrolled ? "text-black" : "text-white"}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
