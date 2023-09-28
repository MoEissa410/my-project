import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getSupTotal,
  minusOne,
  plusOne,
  removeAllProduct,
  removeProduct,
  supTotal,
} from "../../pages/store/productSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const CartItem = () => {
  const navigation = useNavigate();
  const products = useSelector(getProduct);
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState(0);
  // const final = useSelector(getSupTotal);
  // console.log(final);
  //
  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    dispatch(supTotal());
  }, [products]);
  const minusHandler = (item) => {
    dispatch(minusOne(item));
    if (item.quantity > 1) {
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
    }
  };

  const pluseHandler = (item) => {
    if (item.quantity === 6) return;
    dispatch(plusOne(item));
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
      <div className="max-h-[500px] overflow-y-scroll hide-scroll cart-item-container">
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
                <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600 mb-2">
                  Total: ${item.total === 0 ? item.price : item.total}
                </p>
                <div className="flex space-x-4 pt-3 text-xl">
                  <button
                    onClick={() => {
                      minusHandler(item);
                    }}
                    className="text-red-500 font-semibold hover:text-[#ff0000]"
                  >
                    <IoIosRemoveCircleOutline />
                  </button>
                  <button
                    onClick={() => {
                      pluseHandler(item);
                    }}
                    className="text-red-500 font-semibold hover:text-[#ff0000]"
                  >
                    <IoIosAddCircleOutline />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeHandler(item)}
                className="text-red-500 font-semibold border px-1 rounded hover:text-[#ff0000]"
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
        <div className="flex justify-around space-x-3 align-bottom pt-2">
          <div className="flex items-center font-extrabold border px-1 rounded">
            finalTotal: ${totalAmt.toFixed(2)}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              // Handle navigation to the credit page
              navigation("/credit");
            }}
          >
            Go to Credit
          </button>
          <button
            className="text-red-500 font-semibold  px-4 py-2 rounded border hover:text-[#ff0000]"
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
            Remove All Products
          </button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
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
