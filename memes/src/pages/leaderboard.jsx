// pages/Leaderboard.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, Star, Flame, TrendingUp, Users, ThumbsUp } from 'lucide-react';
import Layout from '../components/Layout';
import MemeCard from '../components/MemeCard';
import axios from 'axios';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('memes');
  const [topMemes, setTopMemes] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalMemes, setTotalMemes] = useState(0);

  // Fetch data and calculate rankings based on localStorage likes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('https://api.imgflip.com/get_memes');
        
        // Get all likes from localStorage
        const likeEntries = Object.entries(localStorage)
          .filter(([key]) => key.includes('-liked'))
          .map(([key, value]) => ({
            id: key.replace('meme-', '').replace('-liked', ''),
            liked: value === 'true'
          }));

        // Count likes for each meme
        const likeCounts = likeEntries.reduce((acc, { id, liked }) => {
          if (liked) {
            acc[id] = (acc[id] || 0) + 1;
          }
          return acc;
        }, {});

        // Add like counts to memes
        const memesWithLikes = data.data.memes.map(meme => ({
          ...meme,
          likes: likeCounts[meme.id] || 0,
          timestamp: localStorage.getItem(`meme-${meme.id}-timestamp`) || new Date().toISOString()
        }));

        // Sort by likes and get top 10
        const sortedMemes = memesWithLikes
          .sort((a, b) => b.likes - a.likes || new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 10);

        setTopMemes(sortedMemes);
        setTotalLikes(Object.values(likeCounts).reduce((a, b) => a + b, 0));
        setTotalMemes(memesWithLikes.length);

        // Generate user rankings based on created memes and received likes
        const userStats = {};
        memesWithLikes.forEach(meme => {
          const creator = meme.creator || 'anonymous';
          if (!userStats[creator]) {
            userStats[creator] = {
              name: creator,
              username: `@${creator.toLowerCase()}`,
              totalLikes: 0,
              memeCount: 0,
            };
          }
          userStats[creator].totalLikes += meme.likes;
          userStats[creator].memeCount += 1;
        });

        // Convert to array and sort by total likes
        const sortedUsers = Object.values(userStats)
          .sort((a, b) => b.totalLikes - a.totalLikes || b.memeCount - a.memeCount)
          .slice(0, 10)
          .map((user, index) => ({
            ...user,
            rank: index + 1,
            engagement: ((user.totalLikes / user.memeCount) || 0).toFixed(1)
          }));

        setTopUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get rank badge based on position
  const getRankBadge = (rank) => {
    switch(rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  // Format numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num/1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num/1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        {/* Header Stats */}
        <div className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Meme Hall of Fame 🏆
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Top memes and creators based on community likes!
            </p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: <ThumbsUp className="w-6 h-6" />,
                label: "Total Likes",
                value: formatNumber(totalLikes)
              },
              { 
                icon: <Flame className="w-6 h-6" />,
                label: "Total Memes",
                value: formatNumber(totalMemes)
              },
              { 
                icon: <Users className="w-6 h-6" />,
                label: "Active Users",
                value: formatNumber(topUsers.length)
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-500">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container mx-auto px-4">
          {/* Tab Buttons */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl p-1 shadow-lg">
              {[
                { id: 'memes', label: 'Top Memes' },
                { id: 'users', label: 'Top Creators' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              </div>
            ) : activeTab === 'memes' ? (
              // Top Memes Grid
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {topMemes.map((meme, index) => (
                  <div key={meme.id} className="relative">
                    <div className="absolute -top-3 -left-3 z-10">
                      {getRankBadge(index + 1)}
                    </div>
                    <MemeCard meme={meme} />
                  </div>
                ))}
              </motion.div>
            ) : (
              // Top Users List
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl mx-auto space-y-4"
              >
                {topUsers.map((user) => (
                  <motion.div
                    key={user.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl p-6 shadow-lg flex items-center gap-4"
                  >
                    <div className="flex-shrink-0">
                      {getRankBadge(user.rank)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-purple-500">{user.username}</p>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-gray-500">Memes</p>
                        <p className="font-bold text-purple-600">{user.memeCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Likes</p>
                        <p className="font-bold text-purple-600">{formatNumber(user.totalLikes)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Engagement</p>
                        <p className="font-bold text-purple-600">{user.engagement}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}