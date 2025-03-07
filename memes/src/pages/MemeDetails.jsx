import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, BookmarkPlus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Load meme data and interactions from localStorage on mount
  useEffect(() => {
    // Simulate fetching meme data
    const fetchMeme = async () => {
      // Replace with your actual API call
      const response = await fetch(`https://api.imgflip.com/get_memes`);
      const data = await response.json();
      const foundMeme = data.data.memes.find(m => m.id === id) || {
        id,
        name: "Drake Hotline Bling",
        url: "https://your-meme-image-url.jpg",
        width: 1200,
        height: 1200,
        creator: "MemeCreator",
        createdAt: "2024-02-20",
      };
      setMeme(foundMeme);
    };

    // Load interactions from localStorage
    const loadInteractions = () => {
      const liked = localStorage.getItem(`meme-${id}-liked`) === 'true';
      const saved = localStorage.getItem(`meme-${id}-saved`) === 'true';
      const savedComments = JSON.parse(localStorage.getItem(`meme-${id}-comments`) || '[]');
      setIsLiked(liked);
      setIsSaved(saved);
      setComments(savedComments);
    };

    fetchMeme();
    loadInteractions();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    localStorage.setItem(`meme-${id}-liked`, (!isLiked).toString());
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    localStorage.setItem(`meme-${id}-saved`, (!isSaved).toString());
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      text: comment,
      user: "Anonymous",
      timestamp: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`meme-${id}-comments`, JSON.stringify(updatedComments));
    setComment('');
  };

  if (!meme) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400/10 via-pink-500/10 to-red-500/10 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              to="/explorer" 
              className="inline-flex items-center gap-2 px-4 py-5 bg-white/90 dark:bg-gray-800/90 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-gray-700 dark:text-gray-200">Back to Explorer</span>
            </Link>
        </motion.div>

        {/* Meme Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Meme Image */}
          <div className="relative aspect-video md:aspect-auto md:h-[500px] bg-gray-100 dark:bg-gray-900">
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Meme Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {meme.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created by {meme.creator} • {new Date(meme.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className={`p-2 rounded-full ${
                    isLiked 
                      ? 'bg-red-100 text-red-500 dark:bg-red-500/20' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Heart className={isLiked ? 'fill-current' : ''} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSave}
                  className={`p-2 rounded-full ${
                    isSaved 
                      ? 'bg-purple-100 text-purple-500 dark:bg-purple-500/20' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <BookmarkPlus className={isSaved ? 'fill-current' : ''} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  <Share2 />
                </motion.button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t dark:border-gray-700 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Comments ({comments.length})
              </h2>

              {/* Comment Form */}
              <form onSubmit={handleComment} className="mb-6">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-0 focus:ring-2 focus:ring-purple-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:opacity-90"
                  >
                    Post
                  </motion.button>
                </div>
              </form>

              {/* Comments List */}
              <AnimatePresence>
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 mb-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {comment.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {comment.user}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{comment.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MemeDetails;