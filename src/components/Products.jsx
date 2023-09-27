import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { walMart } from "../api/Api";
import SpinnerJsx from "./SpinnerJsx";
import { useDispatch, useSelector } from "react-redux";
import { AllProducts, addAllProducts } from "../pages/store/productSlice";
import { Link } from "react-router-dom";

const Products = () => {
  //
  const allItems = useSelector(AllProducts);
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: walMart,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(addAllProducts(data));
    }
  }, [data]);
  console.log(allItems);
  return (
    <div className="w-full h-full flex flex-wrap mx-auto max-w-screen-xl py-10">
      {isLoading ? (
        <SpinnerJsx />
      ) : (
        <ul className="w-full h-full  flex flex-wrap mx-auto max-w-screen-xl py-10">
          {data.map((product) => (
            <li className="grow" key={product._id}>
              <Link
                to={{
                  pathname: `/product/${product._id}`,
                }}
              >
                <ProductCard
                  product={{
                    ...product,
                    price: parseFloat(product.price),
                    oldPrice: parseFloat(product.oldPrice),
                  }}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
