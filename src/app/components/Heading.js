import Link from "next/link";
import React, { useEffect, useState } from "react";
import Hamburger from "../ui/Hamburger";
import Cart from "../ui/Cart";

const Heading = ({ loading, shopData }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 100);
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
    <div>
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

      <div className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://web-media.cdn.air-up.com/en_all/hero-desktop-16-9-60mb-compressed.mp4#t=0.0001"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#40001c] via-[#40001c] via-10% to-transparent xl:bg-gradient-to-t xl:from-[#40001c] xl:via-[#40001c] xl:via-10% xl:to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full xl:w-[40%] pl-4 xl:pl-16">
            <h1 className="text-3xl md:text-5xl xl:text-6xl text-white font-bold max-w-2xl">
              Rediscover flavor with Scentaste™
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
