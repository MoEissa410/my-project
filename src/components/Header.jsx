import React, { useEffect, useRef, useState } from "react";
import SearchComponent from "./SearchComponent";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getUser, removeUser } from "../pages/store/productSlice";
import { Link, useLocation } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import Cart from "./headerContainer/Cart";
import { getAuth, signOut } from "firebase/auth";
const Header = () => {
  // const [isScroll, setIsScroll] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const [openCart, setOpenCart] = useState(false);
  //
  const allProduct = useSelector(getProduct);
  let count = allProduct.length;
  const dispatch = useDispatch();
  const auth = getAuth();
  //
  const handleSignOut = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        console.log("sign  out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const cartRef = useRef(null);
  const location = useLocation();
  const user = useSelector(getUser);
  useEffect(() => {
    setOpenCart(false); // Close the cart when navigating to another page
  }, [location]);

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
  };
  //
  const Display = (user) => {
    if (user) {
      if (user.displayName) {
        return user.displayName.split(" ")[0];
      } else if (user.email) {
        return user.email.split("@")[0];
      } else {
        return "Authenticated User"; // Default if neither displayName nor email is available
      }
    } else {
      return " log in";
    }
  };

  const userInfo = user ? (
    <div
      className="relative group cursor-pointer"
      onClick={() => setOpenUser(!openUser)}
    >
      <div className="flex items-center">
        <p>{Display(user)}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ml-2 transform ${
            openUser ? "rotate-180" : "rotate-0"
          } transition-transform duration-300 ease-in-out`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {openUser && (
        <button
          className="absolute right-0 mt-2 px-2 py-1 bg-slate-500 text-white rounded shadow-md"
          onClick={handleSignOut}
        >
          Logout
        </button>
      )}
    </div>
  ) : (
    <Link to="/sign-in">
      <div className=" sm:text-[10px] lg:text-base font-medium border-Primary  border-2  cursor-pointer ">
        log in
      </div>
    </Link>
  );
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
          <div>
            <img
              className="mx-auto w-48"
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              alt="logo"
            />
          </div>
        </Link>
      </div>
      <div className="flex lg:flex-row basis-2/5	 justify-around items-center transition-all  ">
        <SearchComponent />
        <div className={`${btnClasses}`} onClick={cartHandle}>
          <AiOutlineShoppingCart className=" text-[30px]" />
          {count > 0 && (
            <div className=" transition-all bg-red-500 rounded-sm px-[1px] text-white absolute top-[-8px] left-4">
              {count}
            </div>
          )}
        </div>
        {openCart && <Cart products={allProduct} openCart={openCart} />}
        {/* render user  */}
        {userInfo}
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
