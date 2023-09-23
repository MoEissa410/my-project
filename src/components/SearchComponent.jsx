export default function SearchComponent() {
  return (
    <div className="flex items-center">
      <div className="flex">
        <input
          type="text"
          className="block w-auto px-1 py-1  text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
        />
        <button className="px-1 text-white bg-blue-600 border-l rounded-l-none rounded-r-md">
          Search
        </button>
      </div>
    </div>
  );
}
