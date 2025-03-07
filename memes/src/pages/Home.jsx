import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import MemeCard from "../components/MemeCard";
import HeroSection from "../components/HeroSection";
import { Loader2, TrendingUp, Clock, Filter } from "lucide-react";
import MemeCTA from "../components/MemeCTA";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const [memes, setMemes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Check for system dark mode preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(data.data.memes.slice(0, 20));
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  const filterButtons = [
    { id: "trending", label: "Trending", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "latest", label: "Latest", icon: <Clock className="w-4 h-4" /> },
    // { id: "popular", label: "Popular", icon: <Fire className="w-4 h-4" /> },
  ];

  return (
    <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
      <HeroSection />
      
      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {filterButtons.map((button) => (
              <motion.button
                key={button.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(button.id)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  activeFilter === button.id
                    ? "bg-purple-500 text-white"
                    : "bg-white/90 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700"
                }`}
              >
                {button.icon}
                {button.label}
              </motion.button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search memes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 rounded-full bg-white/90 dark:bg-gray-800 border border-purple-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              />
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Memes Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-purple-500" />
            </motion.div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
          >
            <AnimatePresence>
              {memes
                .filter(meme => 
                  meme.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((meme) => (
                  <motion.div
                    key={meme.id}
                    variants={item}
                    layout
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <MemeCard meme={meme} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More Button */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
              Load More Memes
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                👇
              </motion.span>
            </button>
          </motion.div>
        )}
      </div>
      <MemeCTA />
    </Layout>
  );
}