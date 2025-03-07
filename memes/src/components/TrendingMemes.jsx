import React, { useEffect, useState } from "react";
import MemeCard from "./MemeCard";
import axios from "axios";
import { FaSearch, FaThLarge, FaList } from "react-icons/fa";
import Layout from "./Layout";

const TrendingMemes = () => {
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Most Liked");
  const [viewMode, setViewMode] = useState("grid");
  const [title, setTitle] = useState("Trending Memes");

  useEffect(() => {
    const fetchMemes = async () => {
      const { data } = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(data.data.memes.slice(0, 100)); 
    };
    fetchMemes();
  }, []);

  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
    <section className="mb-12 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Title and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {/* Search Bar */}
          <div className="relative w-60">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search memes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option>Most Liked</option>
            <option>Latest</option>
            <option>Most Comments</option>
          </select>

          {/* View Mode Toggle */}
          <div className="border border-gray-300 rounded-lg p-1 flex dark:border-gray-600">
            <button
              className={`px-3 py-2 rounded-l ${
                viewMode === "grid" ? "bg-yellow-500 text-white" : "text-gray-500"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <FaThLarge />
            </button>
            <button
              className={`px-3 py-2 rounded-r ${
                viewMode === "list" ? "bg-yellow-500 text-white" : "text-gray-500"
              }`}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {["Trending", "Fresh", "Classics", "Random"].map((category) => (
          <button
            key={category}
            onClick={() => setTitle(category + " Memes")}
            className="px-4 py-2 rounded-full text-sm font-semibold shadow-sm transition-all duration-200 bg-gray-200 hover:bg-yellow-500 hover:text-white"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Meme Grid */}
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col space-y-4"
        }`}
      >
        {filteredMemes.length > 0 ? (
          filteredMemes.map((meme) => <MemeCard key={meme.id} meme={meme} />)
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No memes found!</p>
        )}
      </div>
    </section>
    </Layout>
  );
};

export default TrendingMemes;
