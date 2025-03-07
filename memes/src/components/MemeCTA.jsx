// components/MemeCTA.jsx
import { motion } from "framer-motion";
import { Sparkles, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const MemeCTA = () => {
  return (
    <div className="relative py-20 overflow-hidden rounded-[2.6rem]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto px-4"
      >
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
          {/* Fun Corner Decorations */}
          <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 blur-xl"
            />
          </div>
          <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-30 blur-xl"
            />
          </div>

          {/* Content */}
          <div className="relative px-6 py-12 sm:px-12 text-center">
            {/* Floating Emojis */}
            <div className="absolute inset-0 pointer-events-none">
              {['😂', '🤣', '😅', '🎭', '✨'].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="absolute text-2xl"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>

            {/* Main Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
            >
              Ready to LOL? 🎭
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              Join thousands of memers in the ultimate meme fiesta! 
              <br className="hidden sm:block" />
              Create, share, and laugh your way to meme stardom! 🚀
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-block px-6 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full"
            >
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                69,420
              </span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">
                memes and counting!
              </span>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/explorer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Show Me The Memes!</span>
                  <span className="text-xl">🎉</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemeCTA;