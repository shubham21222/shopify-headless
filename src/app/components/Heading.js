import React from "react";

const Heading = ({loading,shopData}) => {
  function ShopNameSkeleton() {
    return (
      <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
    );
  }
  return (
    <div>
      <h1 className="text-[3vh] font-sans  text-center">
        {loading ? <ShopNameSkeleton /> : shopData?.shop?.name}
      </h1>
    </div>
  );
};

export default Heading;
