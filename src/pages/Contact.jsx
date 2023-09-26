import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto py-6 relative top-28">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-4">
        If you have any questions or inquiries, please feel free to contact us
        using the information below:
      </p>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
          <i className="fas fa-envelope"></i>
        </div>
        <span className="text-gray-700">Email: alyawaisa@email.com</span>
      </div>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
          <i className="fas fa-phone"></i>
        </div>
        <span className="text-gray-700">Phone: +111111111(zoma&dola)</span>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <span className="text-gray-700">
          Address: alyawaisa, City: tanta, Country: Egypt
        </span>
      </div>
    </div>
  );
};

export default Contact;
