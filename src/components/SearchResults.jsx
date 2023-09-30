import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchInput, setMatchingProduct } from "../pages/store/searchSlice";
import { useQuery } from "@tanstack/react-query";
import { walMart } from "../api/Api";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
const SearchResults = () => {
  const searchQuery = useSelector(getSearchInput);
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: walMart,
  });

  const matchingProducts = !isLoading
    ? data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className=" relative top-28">
      {matchingProducts.length > 0 ? (
        <ul className="w-full h-full  flex flex-wrap mx-auto max-w-screen-xl py-10">
          {matchingProducts.map((product) => (
            <li className="grow" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <ProductCard product={product} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h3>sorry we dont have that </h3>
      )}
    </div>
  );
};

export default SearchResults;
