import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Edit2, Heart, Grid, BookMarked, Settings, Share2, Mail, Check } from 'lucide-react';
import Layout from '../components/Layout';
import MemeCard from '../components/MemeCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userMemes, setUserMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [profileData, setProfileData] = useState(() => {
    const savedData = localStorage.getItem('profileData');
    return savedData ? JSON.parse(savedData) : {
      name: 'Ronish',
      username: '@Ronish13',
      bio: 'Professional Meme Creator 🎭 | Making the internet laugh since 2025',
      avatar: null,
      coverImage: null,
      stats: {
        posts: 0,
        followers: '1.2K',
        following: 156,
        likes: 20
      }
    };
  });

  // Tabs configuration
  const tabs = [
    {
      id: 'posts',
      label: 'My Memes',
      icon: <Grid className="w-4 h-4" />,
      emptyMessage: "You haven't created any memes yet!",
      emptyAction: { link: "/create", label: "Create Your First Meme" }
    },
    {
      id: 'liked',
      label: 'Liked Memes',
      icon: <Heart className="w-4 h-4" />,
      emptyMessage: "You haven't liked any memes yet!",
      emptyAction: { link: "/explorer", label: "Explore Memes" }
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: <BookMarked className="w-4 h-4" />,
      emptyMessage: "Saved memes feature coming soon!",
      emptyAction: { link: "/explorer", label: "Explore More" }
    }
  ];

  const compressImage = async (file, maxSizeMB = 1) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > 1200) {
              height *= 1200 / width;
              width = 1200;
            }
          } else {
            if (height > 1200) {
              width *= 1200 / height;
              height = 1200;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(compressedDataUrl);
        };
      };
    });
  }
  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        const compressedImage = await compressImage(file);
        const newProfileData = {
          ...profileData,
          [type]: compressedImage
        };
        setProfileData(newProfileData);
        localStorage.setItem('profileData', JSON.stringify(newProfileData));
      } catch (error) {
        console.error('Error processing image:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleProfileUpdate = (field, value) => {
    const newProfileData = {
      ...profileData,
      [field]: value
    };
    setProfileData(newProfileData);
    localStorage.setItem('profileData', JSON.stringify(newProfileData));
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('https://api.imgflip.com/get_memes');
        const allMemes = data.data.memes.slice(0, 20).map(meme => ({
          ...meme,
          timestamp: new Date().toISOString(),
        }));

        const likedMemeIds = Object.keys(localStorage)
          .filter(key => key.includes('-liked') && localStorage.getItem(key) === 'true')
          .map(key => key.replace('meme-', '').replace('-liked', ''));

        const userLikedMemes = allMemes.filter(meme => 
          likedMemeIds.includes(meme.id.toString())
        );

        setUserMemes(allMemes.slice(0, 10));
        setLikedMemes(userLikedMemes);

        setProfileData(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            posts: allMemes.slice(0, 10).length,
            likes: userLikedMemes.length,
          }
        }));
      } catch (error) {
        console.error('Error fetching memes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      );
    }

    const currentTab = tabs.find(t => t.id === activeTab);
    const memes = activeTab === 'posts' ? userMemes : 
                 activeTab === 'liked' ? likedMemes : [];

    if (!memes.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="max-w-md mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
            <div className="text-6xl mb-4">😅</div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentTab.emptyMessage}
            </p>
            <Link to={currentTab.emptyAction.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg"
              >
                {currentTab.emptyAction.label}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </motion.div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen mt-8 bg-gradient-to-br from-purple-400/10 via-pink-500/10 to-red-500/10 rounded-[2.5rem]">
        {/* Cover Image Section */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-purple-500 to-pink-500 rounded-t-[2.5rem]"
          >
            {profileData.coverImage && (
              <img
                src={profileData.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
          
          <motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-all duration-300 rounded-lg"
          >
            <Camera className="w-5 h-5 text-white" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, 'coverImage')}
            />
          </motion.label>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative -mt-20 mb-8"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl text-white">
                        {profileData.name[0]}
                      </div>
                    )}
                  </div>
                  <label className="absolute -top-1 -right-1 p-2 rounded-full bg-purple-500 cursor-pointer hover:bg-purple-600 transition-colors shadow-md">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, 'avatar')}
                    />
                  </label>
                </div>
                                {/* Profile Info */}
                                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => handleProfileUpdate('name', e.target.value)}
                          className="text-2xl font-bold bg-transparent border-b-2 border-purple-500 focus:outline-none"
                        />
                      ) : (
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {profileData.name}
                        </h1>
                      )}
                      <p className="text-gray-500 dark:text-gray-400">{profileData.username}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                      >
                        {isEditing ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Edit2 className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Bio */}
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                      className="mt-2 w-full bg-transparent border-2 border-purple-500 rounded-lg p-2 focus:outline-none"
                      rows="3"
                    />
                  ) : (
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {profileData.bio}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    {Object.entries(profileData.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {key}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto py-2 no-scrollbar">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl p-1.5 shadow-lg flex flex-col sm:flex-row gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span className="ml-1 text-sm px-2 py-0.5 rounded-full bg-white/10">
                    {tab.id === 'posts' ? userMemes.length : 
                     tab.id === 'liked' ? likedMemes.length : 0}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <div className="pb-12">
              {renderTabContent()}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}