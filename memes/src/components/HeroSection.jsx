import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [memes, setMemes] = useState([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("https://api.imgflip.com/get_memes");
        setMemes(data.data.memes.slice(0, 5));
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemes();
  }, []);

  useEffect(() => {
    if (memes.length > 0) {
      const interval = setInterval(() => {
        setCurrentMemeIndex((prevIndex) => (prevIndex + 1) % memes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [memes]);

  return (
    <section className="relative min-h-[60vh] mt-8 sm:mt-8 flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-400/10 via-pink-500/10 to-red-500/10 py-16 border-r-5 rounded-[2.5rem]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[300px] h-[300px] -top-20 -left-20 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] -bottom-20 -right-20 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full backdrop-blur-sm border border-purple-200 dark:border-purple-900"
            >
              <span className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4" /> Welcome to MemeVerse
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
            >
              Create, Share & Discover Epic Memes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0"
            >
              Join the ultimate meme community where creativity meets humor. Start your meme journey today! 🚀
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <TrendingUp className="w-4 h-4" />
                  Start Creating
                </motion.button>
              </Link>
              <Link to="/explorer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 border border-purple-100 dark:border-purple-900"
                >
                  <Zap className="w-4 h-4" />
                  Explore Memes
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {[
                { label: "Active Users", value: "50K+" },
                { label: "Daily Memes", value: "1000+" },
                { label: "Categories", value: "100+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {stat.value}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Meme Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-[400px] mx-auto"
          >
            <AnimatePresence mode="wait">
              {!isLoading && memes.length > 0 && (
                <motion.div
                  key={currentMemeIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square"
                >
                  <img
                    src={memes[currentMemeIndex].url}
                    alt="Featured Meme"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Carousel Dots */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {memes.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentMemeIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentMemeIndex
                      ? "w-6 bg-purple-500"
                      : "w-1.5 bg-purple-300 hover:bg-purple-400"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;