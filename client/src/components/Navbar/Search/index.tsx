import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import Recommendations from "./Recommendations";

const SearchBar = () => {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search) {
      setFocus(true)
    }
  }, [focus, search])

  return (
    <div
      className={`flex relative items-center gap-2 border border-gray-300 rounded-md px-2 transition-all duration-200 py-1 ${focus ? "w-96 border-black" : "w-40 xl:w-72"
        }`}
    >
      <div>
        <FiSearch className="text-gray-500 text-xl" />
      </div>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="outline-none p-1 w-full border-none focus-visible:ring-0 ring-0"
        placeholder="Search for jobs, companies, people & more..."
      />
      {search && <Recommendations search={search} setSearch={setSearch} setFocus={setFocus} />}
    </div>
  );
};

export default SearchBar;
