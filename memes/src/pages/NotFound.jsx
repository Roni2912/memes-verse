import React, { useState } from 'react';
import {  motion } from 'framer-motion';
import { Home, RefreshCcw, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";


function NotFound() {
  const [counter, setCounter] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleEasterEgg = () => {
    setIsSpinning(true);
    setCounter(prev => prev + 1);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400/10 via-pink-500/10 to-red-500/10 flex items-center justify-center p-4">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[300px] h-[300px] -top-20 -left-20 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] -bottom-20 -right-20 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-4 text-center"
      >
        {/* 404 Text */}
        <motion.div
          animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1, ease: "linear" }}
          className="relative mb-8"
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative z-10">
            404
          </h1>
          <div className="absolute inset-0 text-7xl sm:text-8xl md:text-9xl font-bold text-purple-600/20 animate-ping">
            404
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Looks like you've ventured into the digital void! 👻
          </p>
        </motion.div>

        {/* Fun Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-12 relative max-w-sm mx-auto"
        >
          <img
            src=".././public/images/4.jpg" 
            alt="Lost in space"
            className="w-full h-auto rounded-xl shadow-lg"
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-8 -right-8"
          >
            <Ghost className="w-16 h-16 text-purple-500" />
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Return Home
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEasterEgg}
            className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-purple-100 dark:border-purple-900 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </motion.button>
        </div>

        {/* Easter Egg Counter */}
        <AnimatePresence>
          {counter > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm"
            >
              Easter Eggs: {counter} 🎮
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default NotFound;