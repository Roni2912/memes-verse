import { motion } from "framer-motion";
import { MessageCircle, Clock, Heart, Share2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MemeCard({ meme }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  // Load likes and comments from localStorage
  useEffect(() => {
    // Load like state
    const likedState = localStorage.getItem(`meme-${meme.id}-liked`) === 'true';
    setIsLiked(likedState);

    // Load likes count
    const likes = parseInt(localStorage.getItem(`meme-${meme.id}-likes-count`) || '0');
    setLikesCount(likes);

    // Load comments
    const comments = JSON.parse(localStorage.getItem(`meme-${meme.id}-comments`) || '[]');
    setCommentsCount(comments.length);
  }, [meme.id]);

  // Handle like click
  const handleLike = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    // Update likes count
    const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1;
    setLikesCount(newLikesCount);

    // Save to localStorage
    localStorage.setItem(`meme-${meme.id}-liked`, newLikedState.toString());
    localStorage.setItem(`meme-${meme.id}-likes-count`, newLikesCount.toString());
  };

  // Format numbers
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num/1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Get relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp || now);
    const diffInSeconds = Math.floor((now - posted) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds/60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds/3600)}h ago`;
    return `${Math.floor(diffInSeconds/86400)}d ago`;
  };

  return (
    <div className="relative"> {/* Wrapper div for proper event handling */}
      <Link to={`/meme/${meme.id}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full sm:w-[280px] md:w-[290px] lg:w-[280px] xl:w-[260px] 2xl:w-[280px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-900"
        >
          {/* Meme Image Container */}
          <div className="relative group h-[180px] sm:h-[190px] overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={meme.url}
              alt={meme.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay on Hover */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent transition-all duration-300"
            >
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <motion.button
                  onClick={handleLike}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 backdrop-blur-sm rounded-full transition-all duration-300 ${
                    isLiked 
                      ? 'bg-red-500/20 text-red-500' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                </motion.button>
                
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    // Add share functionality
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                >
                  <Share2 size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* Category Badge */}
            <motion.span 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-600 text-xs font-medium rounded-full shadow-sm"
            >
              {meme.category || "🔥"}
            </motion.span>
          </div>

          {/* Meme Details */}
          <div className="p-4">
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-3 mb-3"
            >
              {/* Creator Avatar */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold"
              >
                {(meme.creator?.[0] || 'A').toUpperCase()}
              </motion.div>
              
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                  {meme.name}
                </h3>
                <p className="text-xs text-purple-500 dark:text-purple-400">
                  @{meme.creator || "anonymous"}
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <motion.span 
                  whileHover={{ scale: 1.2 }}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Heart size={14} className={isLiked ? "text-red-500 fill-red-500" : ""} />
                  {formatNumber(likesCount)}
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.2 }}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <MessageCircle size={14} />
                  {formatNumber(commentsCount)}
                </motion.span>
              </div>
              
              <span className="flex items-center gap-1 text-purple-400">
                <Clock size={14} />
                {getRelativeTime(meme.timestamp)}
              </span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${meme.progress || 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"
            />
          </div>
        </motion.div>
      </Link>
    </div>
  );
}