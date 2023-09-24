import React from "react";
import { Spinner } from "flowbite-react";

const SpinnerJsx = () => {
  return (
    <div className="flex justify-around">
      <Spinner aria-label="Info spinner example" color="info" />
      <Spinner aria-label="Success spinner example" color="success" />
      <Spinner aria-label="Failure spinner example" color="failure" />
      <Spinner aria-label="Warning spinner example" color="warning" />
      <Spinner aria-label="Pink spinner example" color="pink" />
      <Spinner aria-label="Purple spinner example" color="purple" />
    </div>
  );
};

export default SpinnerJsx;
