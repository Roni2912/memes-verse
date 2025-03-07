import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Twitter, Facebook, Instagram, Send, Sparkles, Star } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-purple-500/10 to-pink-500/10 dark:from-gray-900 dark:to-gray-800 backdrop-blur-lg">
      {/* Fun Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 -top-36 -left-20 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute w-72 h-72 -top-36 -right-20 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Top Memers */}
          <div className="space-y-4">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2"
            >
              <Star className="w-5 h-5" /> Top Memers
            </motion.h4>
            <div className="space-y-4">
              {[
                { name: "MemeKing", memes: "1.2K", avatar: "😎" },
                { name: "LaughMaster", memes: "987", avatar: "🤣" },
                { name: "GiggleGuru", memes: "756", avatar: "😄" },
              ].map((memer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-xl transform group-hover:scale-110 transition-transform">
                    {memer.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{memer.name}</p>
                    <p className="text-sm text-purple-500">{memer.memes} memes</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Quick Links
            </motion.h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "🔥 Trending", path: "/trending" },
                { name: "⭐ Latest", path: "/latest" },
                { name: "🎯 Explore", path: "/explorer" },
                { name: "🎲 Random", path: "/random" },
                { name: "👑 Leaderboard", path: "/leaderboard" },
                { name: "🎪 Events", path: "/events" },
              ].map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 lg:col-span-2">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2"
            >
              <Send className="w-5 h-5" /> Stay Updated
            </motion.h4>
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email for daily meme dose! 🎉"
                  className="w-full px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 border border-purple-200 dark:border-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </div>
            </motion.form>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com" },
                { icon: <Facebook className="w-5 h-5" />, url: "https://facebook.com" },
                { icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com" },
                // { icon: <Reddit className="w-5 h-5" />, url: "https://reddit.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 pt-8 border-t border-purple-100 dark:border-gray-700 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Made by Ronish Dudhat | © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;