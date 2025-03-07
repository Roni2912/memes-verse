import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Grid, List, TrendingUp, Sparkles, History, Shuffle, Filter, SlidersHorizontal } from "lucide-react";
import Layout from "../components/Layout";
import MemeCard from "../components/MemeCard";

const Explorer = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("trending");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Trending");

  const categories = [
    { name: "Trending", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "Fresh", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Classics", icon: <History className="w-4 h-4" /> },
    { name: "Random", icon: <Shuffle className="w-4 h-4" /> },
  ];

  const sortOptions = [
    { value: "trending", label: "Trending" },
    { value: "latest", label: "Latest" },
    { value: "popular", label: "Most Popular" },
    { value: "comments", label: "Most Comments" },
  ];

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(data.data.memes);
        handleCategoryChange("Trending", data.data.memes);
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  const handleCategoryChange = (categoryName, memesData = memes) => {
    setActiveCategory(categoryName);
    setLoading(true);
    
    const shuffled = [...memesData].sort(() => Math.random() - 0.5);
    
    switch(categoryName) {
      case "Trending":
        setFilteredMemes(shuffled.slice(0, 500));
        break;
      case "Fresh":
        setFilteredMemes(shuffled.slice(20, 40));
        break;
      case "Classics":
        setFilteredMemes(shuffled.slice(40, 60));
        break;
      case "Random":
        setFilteredMemes(shuffled.slice(60, 800));
        break;
      default:
        setFilteredMemes(memesData);
    }
    
    setTimeout(() => setLoading(false), 500); // Add slight delay for animation
  };

  useEffect(() => {
    if (search) {
      const filtered = memes.filter((meme) =>
        meme.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredMemes(filtered);
    } else {
      handleCategoryChange(activeCategory);
    }
  }, [search]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-400/10 via-pink-500/10 to-red-500/10 py-8 rounded-[2.5rem]">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Explore Epic Memes
            </h2>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Title and Search */}
              <div className="flex-1">
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search your favorite memes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-3 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-purple-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Filters and View Toggle */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-purple-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* View Toggle */}
                <div className="flex rounded-xl overflow-hidden border border-purple-100 dark:border-gray-600">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid"
                        ? "bg-purple-500 text-white"
                        : "bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list"
                        ? "bg-purple-500 text-white"
                        : "bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mt-6">
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    activeCategory === category.name
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.icon}
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Category Title */}
          {activeCategory && !search && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {activeCategory} Memes
              </h3>
            </motion.div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            /* Memes Grid/List */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
                    : "flex flex-col items-center gap-6 max-w-3xl mx-auto"
                }
              >
                {filteredMemes.map((meme) => (
                  <motion.div
                    key={meme.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MemeCard meme={meme} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* No Results Message */}
          {filteredMemes.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No memes found! Try a different search term.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Explorer;