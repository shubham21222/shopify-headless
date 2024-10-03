import Link from "next/link";
import React, { useEffect, useState } from "react";
import Hamburger from "../ui/Hamburger";
import Cart from "../ui/Cart";
import Header from "./Header";

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

  return (
    <div>
      <Header isScrolled={isScrolled} loading={loading} shopData={shopData} />

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
        <div className="absolute inset-0 bg-gradient-to-b from-[#40001c] via-[#40001c]  via-10% to-transparent xl:bg-gradient-to-t xl:from-[#40001c] xl:via-[#40001c] xl:via-10% xl:to-transparent" />
        <div className="relative z-10 h-full flex items-center container-main ">
          <div className="w-full pl-[3vh]">
            <h1 className="text-[2.5vh] md:text-5xl xl:text-6xl text-white font-bold max-w-2xl">
              Rediscover flavor with Scentaste™
            </h1>
            <Link href="/Products">
              <button className="p-4 bg-[#ff90c0] uppercase mt-4 rounded-xl text-[#40001c] font-semibold">
                sell all products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
