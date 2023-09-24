export default function SearchComponent() {
  return (
    <div className="flex items-center  ">
      <div className="flex">
        <input
          type="text"
          className="block  lg:w-auto md:w-[140px] sm:w-[50px] w-auto px-1 py-1  text-gray-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
        />
        <button className="px-1 text-white bg-[#856800] hover:bg-[#4d4012] border-l rounded-l-none rounded-r-md">
          go
        </button>
      </div>
    </div>
  );
}
