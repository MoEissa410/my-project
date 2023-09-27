import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { add, getProduct } from "../pages/store/productSlice";

const ProductCard = ({ product }) => {
  ProductCard.propTypes = {
    product: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number.isRequired,
      _id: PropTypes.number.isRequired,
      oldPrice: PropTypes.number, // Remove .isRequired
      rating: PropTypes.number,
    }).isRequired,
  };
  const { title, image, price, oldPrice, rating, _id } = product;
  //
  const chooseProduct = useSelector(getProduct);
  //
  const dispatch = useDispatch();
  const addHandler = () => {
    dispatch(add({ title, image, price, _id }));
  };
  const truncatedTitle = title.split(" ").slice(0, 6).join(" ");
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4 flex flex-col grow items-center">
      <div className="relative rounded-md overflow-hidden ">
        <img
          src={image}
          alt={title}
          className=" w-40 h-40 object-contain mb-4 transition-transform duration-400 transform-gpu hover:scale-105 "
        />
      </div>
      <h2 className="text-sm font-semibold w-32 h-12 mb-2 flex items-center justify-center">
        {truncatedTitle}...
      </h2>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 mr-1">&#9733;</span>
        <span className="text-yellow-500 mr-1">&#9733;</span>
        <span className="text-yellow-500 mr-1">&#9733;</span>
        <span className="text-yellow-500 mr-1">&#9733;</span>
        <span className="text-yellow-500 mr-1">&#9733;</span>
      </div>
      <div className="flex justify-between space-x-3">
        <p className="text-gray-600 mb-4">${price}</p>
        <p className="text-gray-600 mb-4">
          <del>${oldPrice}</del>
        </p>
      </div>
      {/* <button
        onClick={addHandler}
        className="bg-button  hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded"
      >
        Add to Cart
      </button> */}
    </div>
  );
};

export default ProductCard;
