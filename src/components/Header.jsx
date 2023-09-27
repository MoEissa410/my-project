import React, { useEffect, useRef, useState } from "react";
import SearchComponent from "./SearchComponent";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getProduct } from "../pages/store/productSlice";
import { Link } from "react-router-dom";
import Cart from "./headerContainer/Cart";
const Header = () => {
  // const [isScroll, setIsScroll] = useState(false);
  //
  const [openCart, setOpenCart] = useState(false);
  //
  const allProduct = useSelector(getProduct);
  let count = allProduct.length;
  //
  const cartRef = useRef(null);

  // Function to close the cart

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     if (scrollTop > 0) {
  //       setIsScroll(true);
  //     } else {
  //       setIsScroll(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // showCart
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnClasses = `  relative cursor-pointer bg-[#f0c14b] hover:bg-yellow-400 rounded p-1${
    btnIsHighlighted ? "animate-bump" : ""
  }`;

  useEffect(() => {
    if (count.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [count]);
  //
  //
  const cartHandle = () => {
    setOpenCart(!openCart);
    console.log(openCart);
  };
  //
  return (
    <div
      className={` hover:opacity-[1]  z-50 fixed top-0 left-0 right-0 shadow-lg mb-2 w-full h-24 flex flex-row items-center ${
        // isScroll ? " bg-Primary opacity-[0.7]"
        "bg-Primary"
      } px-2 border-b[1px] border-b-red`}
    >
      <ul className=" transition-all  flex flex-row basis-2/5 justify-evenly items-center list-none lg:text-base md:text-sm sm:text-[10px]">
        <li className=" font-medium border-Primary   border-2  duration-200 hover:bg-yellow-400 cursor-pointer rounded-md px-1">
          <Link to="/">Home</Link>
        </li>

        <li className="font-medium border-Primary  border-2  duration-200 hover:bg-yellow-400 cursor-pointer rounded-md px-1">
          <Link to="contact">CONTACT</Link>
        </li>
        <li className="font-medium border-Primary  border-2 duration-200 hover:bg-yellow-400 cursor-pointer rounded-md px-1">
          <Link to="about-us"> ABOUT US</Link>
        </li>
      </ul>
      <div className=" lg:text-3xl md:text-lg sm:text-sm font-semibold flex flex-col basis-1/5	 justify-center items-center cursor-pointer">
        <Link to="/">
          <div>Dola&Zoma</div>
        </Link>
      </div>
      <div className="flex lg:flex-row basis-2/5	 justify-around items-center ">
        <SearchComponent />
        <div className={`${btnClasses}`} onClick={cartHandle}>
          <AiOutlineShoppingCart className=" text-[30px]" />
          {count > 0 && (
            <div className=" bg-red-500 rounded-sm px-[1px] text-white absolute top-[-8px] left-4">
              {count}
            </div>
          )}
        </div>
        {openCart && <Cart products={allProduct} />}

        {/* <div className=" sm:text-[10px] lg:text-base font-medium border-Primary  border-2  cursor-pointer ">
          log in
        </div> */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1300}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Header;
