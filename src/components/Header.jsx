import React, { useEffect, useRef, useState } from "react";
import SearchComponent from "./SearchComponent";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getUser, removeUser } from "../pages/store/productSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";
import Cart from "./headerContainer/Cart";
import { getAuth, signOut } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { walMart } from "../api/Api";
import { getSearchInput, removeSearch } from "../pages/store/searchSlice";
const Header = () => {
  // const [isScroll, setIsScroll] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const location = useLocation();
  const user = useSelector(getUser);
  const navigation = useNavigate();
  const searchQuery = useSelector(getSearchInput);
  const [matchingProductsItmes, setMatchingProductsItmes] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: walMart,
  });
  let matchingProducts = [];
  if (searchQuery.length > 2) {
    matchingProducts = !isLoading
      ? data.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
  }
  useEffect(() => {
    if (matchingProducts.length > 0) {
      return setMatchingProductsItmes(true);
    }
  }, [searchQuery]);
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

  useEffect(() => {
    setOpenCart(false); // Close the cart when navigating to another page
    setMatchingProductsItmes(false);
    dispatch(removeSearch());
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
      onClick={() => {
        setOpenUser(!openUser);
        setMatchingProductsItmes(false);
      }}
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
        <div>
          <SearchComponent />
          {matchingProductsItmes && (
            <div
              className={`w-full mx-auto gap-2 py-2  max-h-60 flex flex-col  justify-center items-center bg-white top-20 absolute left-0  z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
            >
              {matchingProducts &&
                matchingProducts.map((item) => (
                  <div
                    onClick={() => navigation(`/product/${item._id}`)}
                    key={item._id}
                    className="flex justify-center items-center flex-col gap-2 py-2   w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="relative flex items-center">
                      <img
                        className="w-10 h-10 object-cover"
                        src={item.image}
                        alt="Product Image"
                      />
                    </div>
                    <div className=" flex items-center">
                      <h2 className="text-md font-semibold text-gray-800">
                        {item.title}
                      </h2>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
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
