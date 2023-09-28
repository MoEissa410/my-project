import React from "react";

const Credit = () => {
  return (
    <div>
      <div className=" relative top-28 max-w-sm mx-auto mt-20 bg-white rounded-md shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-900 text-white">
          <h1 className="text-lg font-bold">Credit Card</h1>
        </div>
        <div className="px-6 py-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="card-number"
            >
              Card Number
            </label>
            <input
              className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="card-number"
              type="text"
              placeholder="**** **** **** ****"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="expiration-date"
            >
              Expiration Date
            </label>
            <input
              className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiration-date"
              type="text"
              placeholder="MM/YY"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cvv"
              type="text"
              placeholder="***"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="cardholder-name"
            >
              Cardholder Name
            </label>
            <input
              className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cardholder-name"
              type="text"
              placeholder="Full Name"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Credit;
