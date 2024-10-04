import React from "react";
import Logo from "../ui/logo";

const Footer = () => {
  const data = [
    {
      id: 1,
      heading: "About us",
    },
    {
      id: 2,
      heading: "How it works",
    },
    {   
      id: 3,
      heading: "Sustainability",
    },
    {
      id: 4,
      heading: "Health",
    },
    {
      id: 5,
      heading: "Careers",
    },
    {
      id: 6,
      heading: "Support & FAQ",
    },
    {
      id: 7,
      heading: "Press",
    },
  ];

  const data1 = [
    {
      id: 1,
      heading: "Return policy",
    },
    {
      id: 2,
      heading: "Shipping & payments",
    },
    {
      id: 3,
      heading: "Terms & conditions",
    },
  ];

  return (
    <>
      <div className="bg-[#40001c] flex justify-center flex-col items-center mt-7">
        <div className="text-white mt-5">
          <Logo />
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex items-center uppercase text-[3vh] cursor-pointer font-bold">
                {item.heading}
              </div>
              {index < data.length - 1 && (
                <div className="h-6 w-px bg-gray-300" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-9">
          {data1.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex items-center uppercase text-[3vh] cursor-pointer">
                {item.heading}
              </div>
              {index < data.length - 1 && (
                <div className="h-6 w-px bg-gray-300" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="my-6">© 2024 air up inc. All rights reserved.</div>
      </div>
    </>
  );
};

export default Footer;
