import React from "react";

const Cart = ({isScrolled}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      class="size-7 xl:size-9"
      className={`${isScrolled ? "text-black" : "text-white"}  h-[2.25rem] w-[2.25rem]`}
    >
      <path
        d="M2.3999 3.6001H5.17543L8.36988 14.2616H18.5093L21 7.12061H9.7307"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <ellipse
        cx="9.95616"
        cy="17.2232"
        rx="1.74376"
        ry="1.77692"
        stroke="currentColor"
      ></ellipse>
      <ellipse
        cx="15.7687"
        cy="17.2232"
        rx="1.74376"
        ry="1.77692"
        stroke="currentColor"
      ></ellipse>
    </svg>
  );
};

export default Cart;
