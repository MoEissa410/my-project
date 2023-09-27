import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  removeAllProduct,
  removeProduct,
} from "../../pages/store/productSlice";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const CartItem = () => {
  const navigation = useNavigate();
  const products = useSelector(getProduct);
  const dispatch = useDispatch();

  const minusHandler = (item) => {};
  const pluseHandler = (item) => {};

  const removeHandler = (item) => {
    toast.error("🖕 Product removed", {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(removeProduct(item));
  };

  return (
    <div className="fixed right-0 top-24 bg-white shadow-xl p-4 w-full h-full">
      <h2 className="text-lg font-semibold mb-4">Cart</h2>
      <div className=" max-h-[500px] overflow-y-scroll hide-scroll cart-item-container">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              className="flex items-center py-4 border-b border-gray-300"
              key={item._id}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <h4 className="text-lg font-semibold mb-2">{item.des}</h4>
                <p className="text-gray-600 mb-2">Quantity:1 {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
                <div className="flex space-x-4 pt-3 text-xl">
                  <button
                    onClick={minusHandler(item)}
                    className="text-red-500 font-semibold "
                  >
                    <IoIosRemoveCircleOutline />
                  </button>
                  <button
                    onClick={pluseHandler(item)}
                    className="text-red-500 font-semibold"
                  >
                    <IoIosAddCircleOutline />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeHandler(item)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div>
            <p className="text-gray-600">Your cart is empty.</p>
            <button
              className="bg-button hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded w-full md:w-auto mt-4"
              onClick={() => {
                navigation(-1); // Navigate back to the previous page
              }}
            >
              Back to Last View
            </button>
          </div>
        )}
      </div>
      {products.length > 0 && (
        <div className="flex justify-center space-x-3 align-bottom pt-2">
          <button
            className="  bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              // Handle navigation to the credit page
              // Example: navigation("/creditPage");
            }}
          >
            Go to Credit
          </button>
          <button
            className="  bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              dispatch(removeAllProduct());
              toast.error("🖕 Product removed", {
                position: "top-right",
                autoClose: 1300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }}
          >
            removeAllProduct{" "}
          </button>
        </div>
      )}
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

export default CartItem;
