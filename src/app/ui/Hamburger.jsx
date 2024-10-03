import React from "react";

const Hamburger = ({isScrolled}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      class="size-7 xl:size-9"
      className={`${isScrolled ? "text-black" : "text-white"}  h-[2.25rem] w-[2.25rem]`}
      >
      <title>hamburger icon</title>
      <line
        x1="3.5"
        y1="19.5"
        x2="20.5"
        y2="19.5"
        stroke="currentColor"
        stroke-linecap="round"
      ></line>
      <line
        x1="3.5"
        y1="12.5"
        x2="20.5"
        y2="12.5"
        stroke="currentColor"
        stroke-linecap="round"
      ></line>
      <line
        x1="3.5"
        y1="5.5"
        x2="20.5"
        y2="5.5"
        stroke="currentColor"
        stroke-linecap="round"
      ></line>
    </svg>
  );
};

export default Hamburger;
