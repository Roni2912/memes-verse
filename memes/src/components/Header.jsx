import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User,
  Settings,
  Heart,
  BookMarked,
  ChevronDown,
  Grid
} from "lucide-react";

import { useTheme } from '../contexts/ThemeContext';


const Header = () => {
  // const [darkMode, setDarkMode] = useState(() => 
  //   document.documentElement.classList.contains('dark')
  // );
  const { darkMode, setDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Dummy user data
  const dummyUser = {
    name: "John Doe",
    username: "@johndoe",
    avatar: null,
    role: "Meme Creator"
  };

  // Handle dark mode toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };


  // Close profile when menu opens
  useEffect(() => {
    if (menuOpen) {
      setProfileOpen(false);
    }
  }, [menuOpen]);

  // Handle scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <>
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <header className="fixed min-h-[10vh] top-0 left-0 right-0 mb-20 flex justify-between items-center px-4 sm:px-6 py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg z-30">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-3xl animate-bounce">🎭</span>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            MEME-VERSE
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link to="/explorer" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Explore
          </Link>
          <Link to="/create" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Create
          </Link>
          <Link to="/leaderboard" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Leaderboard
          </Link>
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-purple-600" />
            )}
          </motion.button>

          {/* User Profile Menu */}
          <div className="relative z-50">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {dummyUser.name[0]}
              </div>
              <ChevronDown size={16} className="text-gray-600 dark:text-gray-300" />
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 border border-gray-100 dark:border-gray-700"
                >
                  {/* Profile dropdown content remains the same */}
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {dummyUser.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {dummyUser.username}
                    </p>
                  </div>

                  <div className="py-2">
                    {/* Menu items remain the same */}
                    {[
                      { icon: <User size={16} />, label: 'My Profile', path: '/profile' },
                      { icon: <Grid size={16} />, label: 'My Posts', path: '/profile/posts' },
                      { icon: <Heart size={16} />, label: 'Liked Memes', path: '/profile/liked' },
                      { icon: <BookMarked size={16} />, label: 'Saved Memes', path: '/profile/saved' },
                      { icon: <Settings size={16} />, label: 'Settings', path: '/profile/settings' },
                    ].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl z-45 lg:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <button
                  className="self-end p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMenuOpen(false)}
                >
                  {/* <X size={24} className="text-gray-700 dark:text-gray-300" /> */}
                </button>
                
                <nav className="flex flex-col gap-4 mt-8">
                  {/* Navigation links remain the same */}
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'Explore', path: '/explorer' },
                    { label: 'Create', path: '/create' },
                    { label: 'Leaderboard', path: '/leaderboard' },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-lg text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;