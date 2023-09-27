import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { useNavigate } from "react-router-dom";

const Cart = ({ products }) => {
  const navigation = useNavigate();
  const [cartOpen, setCartOpen] = useState(true);

  const clickHandle = () => {
    navigation("/cartItem");
    setCartOpen(false); // Close the cart when navigating
  };

  return (
    <div
      className={`absolute top-24 right-0 rounded-md w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 bg-[#f1c40f] ${
        cartOpen ? "" : "hidden"
      }`}
    >
      <h2 className="text-center text-2xl font-semibold py-2">Cart</h2>
      <div className="overflow-y-auto max-h-80">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div className="my-4 p-1" key={product._id}>
              <div className="text-center">
                <img
                  className="mx-auto w-28 h-28 rounded"
                  src={product.image}
                  alt={product.title}
                />
                <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Cart is empty</p>
        )}
      </div>
      <button
        className="block mx-auto mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={clickHandle}
      >
        all selected
      </button>
    </div>
  );
};

// Prop validation
Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      // Add more PropTypes for other properties if needed
    })
  ),
};

export default Cart;
