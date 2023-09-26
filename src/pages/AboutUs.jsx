import React from "react";
import SpinnerJsx from "../components/SpinnerJsx";

const AboutUs = () => {
  return (
    <div className="container mx-auto py-6 relative top-28">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <p className="text-gray-600 mb-4">
        Welcome to our website! Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
        dapibus diam. Sed nisi.
      </p>
      <p className="text-gray-600 mb-4">
        Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
        Praesent mauris. Fusce nec tellus sed augue semper porta.
      </p>
      <p className="text-gray-600 mb-4">
        Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
    </div>
  );
};

export default AboutUs;
