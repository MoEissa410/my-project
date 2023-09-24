import React, { useEffect } from "react";
import Banner from "../components/Banner";
import FooterE from "../components/FooterE";
import Products from "../components/Products";
import { walMart } from "../api/Api";

const Home = () => {
  return (
    <div className=" relative top-[94px]">
      <Banner />
      <Products />
      <FooterE />
    </div>
  );
};

export default Home;
