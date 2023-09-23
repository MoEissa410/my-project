import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={` hover:opacity-[1]  z-50 fixed top-0 left-0 right-0 shadow-2xl mb-2 w-full h-24 flex flex-row items-center ${
        isScroll ? " bg-Primary opacity-[0.7]" : "bg-Primary"
      } px-2 border-b[1px] border-b-red`}
    >
      <ul className=" flex flex-row basis-2/5	 justify-between list-none   	">
        <li className=" font-medium border-Primary   border-2  hover:border-red-500 cursor-pointer rounded-md px-2">
          HOME
        </li>
        <li className="font-medium border-Primary  border-2  hover:border-red-500 cursor-pointer rounded-md px-2">
          MEN
        </li>
        <li className="font-medium border-Primary  border-2  hover:border-red-500 cursor-pointer rounded-md px-2">
          WOMEN
        </li>
        <li className="font-medium border-Primary  border-2  hover:border-red-500 cursor-pointer rounded-md px-2">
          ABOUT US
        </li>
        <li className="font-medium border-Primary  border-2  hover:border-red-500 cursor-pointer rounded-md px-2">
          CONTACT
        </li>
      </ul>
      <div className=" text-3xl font-semibold flex flex-col basis-1/5	 justify-center items-center cursor-pointer">
        <div> Store</div>
        <div>Dola&Zoma</div>
      </div>
      <div className=" flex flex-row basis-2/5	 justify-around items-center">
        <SearchComponent />
        <div className=" relative cursor-pointer">
          <AiOutlineShoppingCart className=" text-[30px]" />
          <div className=" text-red-500 absolute top-[-8px] left-4">1</div>
        </div>
        <div className=" font-medium border-Primary  border-2  cursor-pointer">
          LOG IN
        </div>
      </div>
    </div>
  );
};

export default Header;
