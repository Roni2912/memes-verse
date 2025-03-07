import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Home() {
  const [memes, setMemes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchMemes = async () => {
      const { data } = await axios.get('https://api.imgflip.com/get_memes');
      setMemes(data.data.memes.slice(0, 10)); // Fetch top 10 memes
    };
    fetchMemes();
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="container mx-auto p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {memes.map((meme) => (
              <Card key={meme.id} meme={meme} />
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}