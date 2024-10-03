import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

const Main = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const images = [
    {
      src: "https://images.ctfassets.net/x1178tp27tgt/1NLORV88ozSilTCSaiP8jT/64a25b76579f1cde3cd3e62124cc2c06/US_How_It_Works_1.png?fm=webp&q=75&w=640",
      alt: "image1",
    },
    {
      src: "https://images.ctfassets.net/x1178tp27tgt/1tRTLwCZ3iY4j9U6s2vLoA/bfede4bbd1b9e4f2142b14a70361dc67/US_How_It_Works_2.png?fm=webp&q=75&w=640",
      alt: "image2",
    },
    {
      src: "https://images.ctfassets.net/x1178tp27tgt/5Qg3tqp3owQnu9L0shbgcQ/58cc130eb48faa84c7223a9ac956be0b/US_How_It_Works_3.png?fm=webp&q=75&w=640",
      alt: "image3",
    }
  ];

  return (
    <>
      <div className="container-main2 pt-[6vh] flex justify-between items-start">
        <div className="w-1/2" ref={contentRef}>
          <div className="text-[#ff90c0] font-semibold mb-4 text-[3vh] uppercase">
            What is Scentaste™?
          </div>
          <h2 className="text-[#40001c] mb-8 font-extrabold text-[8vh] leading-[54px] w-[80%]">
            There’s more to flavor than meets the tongue
          </h2>
          <div className="text-[#40001c] w-[80%] text-[3vh] leading-[30px]">
            Close your eyes, imagine a world where smell and taste merge, fun
            meets responsibility. We are crafting it with water. Do you know
            your brain can turn water into flavors using just scent? Wild,
            right? Just pop on a pod, sip, and voila! Suddenly, plain H2O isn’t
            so plain anymore, thanks to Scentaste™.
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-start">
          <Image
            width={1145}
            height={contentHeight}
            alt="bottle-image"
            className="object-contain rounded-xl"
            src="https://images.ctfassets.net/x1178tp27tgt/2zfy3CZp5Qym89F8Rj62dM/085705755394d177af8565fd2438d96a/US_Scentaste.png?fm=webp&q=95&w=1145"
          />
        </div>
      </div>

      <div className="container-main2 flex justify-center items-center pt-8 flex-col">
        <div className="text-[#ff90c0] font-semibold uppercase text-[3vh]">
          Welcome to a new era of flavored water
        </div>

        <div className="text-[8vh] mb-4 font-extrabold text-[#40001c]">
          How to use the air up bottle?
        </div>

        <div className="flex flex-row items-center justify-items mb-4">
          <div className="flex flex-row items-center gap-5 justify-center rounded-lg">
            {images.map((items, index) => {
              return (
                <Image
                  key={index}
                  width={400}
                  alt={items.alt}
                  height={500}
                  src={items.src}
                  className="rounded-lg"
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-main2 flex flex-col pt-8 px-4 ">
        <div className="text-[#ff90c0] font-semibold uppercase text-lg md:text-xl lg:text-2xl mb-2">
          Learn More
        </div>

        <div className="text-4xl md:text-5xl lg:text-6xl mb-8 font-extrabold text-[#40001c]">
          Explore Deeper
        </div>

        <div className=" flex flex-col md:flex-row justify-between gap-4 md:gap-8">
          <div className="w-full md:w-1/2">
            <Image
              width={710}
              height={960}
              className="rounded-2xl w-full h-auto"
              alt="How it works"
              src="https://images.ctfassets.net/x1178tp27tgt/5W5n51OVQDLxYyVJRsTece/2534691478a72b410ca8150b3d9e8230/US-Card_Item-HIW.png?fm=webp&q=95&w=1280"
            />
          </div>
          <div className="w-full md:w-1/2">
            <Image
              width={710}
              height={960}
              className="rounded-2xl w-full h-auto"
              alt="Health benefits"
              src="https://images.ctfassets.net/x1178tp27tgt/6ArWAX5K7FZKPOzp5FPoBM/455a534ef387358d317386690b6d896e/US-Card_Item-Health.png?fm=webp&q=95&w=1280"
            />
          </div>
        </div>
      </div>

      <div className="container-main2 flex flex-col pt-8 px-4 ">
        <div className="text-[#ff90c0] font-semibold uppercase text-lg md:text-xl lg:text-2xl mb-2">
          Shop air up®
        </div>

        <div className="text-4xl md:text-5xl lg:text-6xl mb-8 font-extrabold text-[#40001c]">
          Discover our products
        </div>

        <div className=" flex flex-col md:flex-row justify-between gap-4 md:gap-8">
          <div className="w-full md:w-1/2">
            <Image
              width={710}
              height={960}
              className="rounded-2xl w-full h-auto"
              alt="How it works"
              src="https://images.ctfassets.net/x1178tp27tgt/5Z1FDHqEvSfaVnLy75y1HN/8a1ea8f15eff370bba21a1c1b701681c/US_Category_Crosslink_Bottles.png?fm=webp&q=95&w=1280"
            />
          </div>
          <div className="w-full md:w-1/2">
            <Image
              width={710}
              height={960}
              className="rounded-2xl w-full h-auto"
              alt="Health benefits"
              src="https://images.ctfassets.net/x1178tp27tgt/4oVcLekF4kylnMsIKDJBtg/be6d86b3afa5182b61dedf720cf2aa84/Category_Crosslink_Pods.png?fm=webp&q=95&w=1280"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
