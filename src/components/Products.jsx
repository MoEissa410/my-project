import React from "react";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { walMart } from "../api/Api";
import SpinnerJsx from "./SpinnerJsx";

const Products = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: walMart,
  });
  return (
    <div className="w-full h-full flex flex-wrap  mx-auto max-w-screen-xl py-10">
      {isLoading ? (
        <SpinnerJsx />
      ) : (
        data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default Products;
