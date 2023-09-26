import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeProduct } from "../../pages/store/productSlice";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CartItem = () => {
  const navigation = useNavigate();
  //
  const products = useSelector(getProduct);
  //
  const dispatch = useDispatch();
  //
  console.log(products);
  //
  const removeHandler = (item) => {
    toast.error("🖕 product remove", {
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
    <div className="fixed right-0 top-24 bg-white shadow-xl p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Cart</h2>
      <div className="cart-item-container max-h-96 overflow-y-scroll">
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
                <p className="text-gray-600 mb-2">Quantity: 1{item.quantity}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
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
              className="bg-button hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded w-full md:w-auto"
              onClick={() => {
                history.back();
              }}
            >
              back to Last View
            </button>
          </div>
        )}
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

export default CartItem;
