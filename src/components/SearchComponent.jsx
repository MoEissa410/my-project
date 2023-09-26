import { useState } from "react";
import { FaSearchengin } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../pages/store/searchSlice.js";
import { useNavigate } from "react-router-dom";
export default function SearchComponent() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  //
  const navigation = useNavigate();
  const inputHandler = (e) => {
    dispatch(setSearchQuery(input));
    navigation("/search-results");
    setInput("");
  };
  return (
    <div className="flex items-center ">
      <div className="relative">
        <input
          type="text"
          className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:outline-none focus:ring  focus:ring-[#f5d482]"
          placeholder="Search ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={inputHandler}
          className="absolute top-0 right-0 border-l-0 md:px-6 lg:px-4  xl:px-9  py-[12px] bg-[#f0c14b] text-black   rounded-r-md hover:bg-[#d8a100] focus:outline-none"
        >
          <FaSearchengin className="text-lg" />
        </button>
      </div>
    </div>
  );
}
