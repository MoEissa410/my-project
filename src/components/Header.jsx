import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getProduct } from "../pages/store/productSlice";
import { Link } from "react-router-dom";
const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  //
  const allProduct = useSelector(getProduct);
  let count = allProduct.length;
  //
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
  // showCart
  const [cartShow, setCartShow] = useState(false);
  const itemHandler = () => {
    setCartShow(!cartShow);
    console.log(cartShow);
  };
  //
  //
  return (
    <div
      className={` hover:opacity-[1]  z-50 fixed top-0 left-0 right-0 shadow-lg mb-2 w-full h-24 flex flex-row items-center ${
        isScroll ? " bg-Primary opacity-[0.7]" : "bg-Primary"
      } px-2 border-b[1px] border-b-red`}
    >
      <ul className=" flex flex-row basis-2/5 justify-evenly items-center list-none lg:text-base md:text-sm sm:text-[10px]">
        <li className=" font-medium border-Primary   border-2  hover:border-red-500 cursor-pointer rounded-md px-1">
          <Link to="/">Home</Link>
        </li>

        <li className="font-medium border-Primary  border-2  hover:border-red-500 cursor-pointer rounded-md px-1">
          <Link to="contact">CONTACT</Link>
        </li>
        <li className="font-medium border-Primary  border-2  hover:border-red-500 cursor-pointer rounded-md px-1">
          <Link to="about-us"> ABOUT US</Link>
        </li>
      </ul>
      <div className=" lg:text-3xl md:text-lg sm:text-sm font-semibold flex flex-col basis-1/5	 justify-center items-center cursor-pointer">
        <div> Store</div>
        <div>Dola&Zoma</div>
      </div>
      <div className="flex lg:flex-row basis-2/5	 justify-around items-center ">
        <SearchComponent />
        <div className=" relative cursor-pointer">
          <Link to="/cartItem">
            <AiOutlineShoppingCart className=" text-[30px]" />
            <div className=" text-red-500 absolute top-[-8px] left-4">
              {count}
            </div>
          </Link>
        </div>
        <div className=" sm:text-[10px] lg:text-base font-medium border-Primary  border-2  cursor-pointer ">
          log in
        </div>
      </div>
    </div>
  );
};

export default Header;
