import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { walMart } from "../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { add, getProduct } from "../pages/store/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const cartProduct = useSelector(getProduct);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: walMart,
  });

  let product;
  if (!isLoading) {
    product = data.find((p) => p._id === Number(id));
  }

  console.log("Product component product:", product);

  if (!product) {
    return <div>Loading...</div>;
  }
  const { brand, category, des, image, oldPrice, price, title, _id } = product;

  const addHandler = () => {
    dispatch(add(product));
    toast.success(" ❤️‍🔥 product add success", {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className=" relative top-28 flex flex-col md:flex-row md:max-w-6xl mx-auto p-4 space-y-4 md:space-y-0">
      <div className="md:w-1/2">
        <div className="rounded-lg overflow-hidden px-4 ">
          <img
            src={image}
            alt={title}
            className="w-full object-contain mb-4 md:max-h-96 md:mb-0 shadow-lg "
          />
        </div>
      </div>

      <div className="md:w-1/2">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">brand: {brand}</p>
        <p className="text-gray-600 mb-4">{des}</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">&#9733;</span>
          <span className="text-yellow-500 mr-1">&#9733;</span>
          <span className="text-yellow-500 mr-1">&#9733;</span>
          <span className="text-yellow-500 mr-1">&#9733;</span>
          <span className="text-yellow-500 mr-1">&#9733;</span>
        </div>
        <div className="flex  space-x-3 mb-4">
          <p className="text-gray-600">${price}</p>
          <p className="text-gray-600">
            <del>${oldPrice}</del>
          </p>
        </div>
        <button
          onClick={addHandler}
          className="bg-button hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded w-full md:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
