import React, { useState } from "react";
import axios from 'axios';
import Layout from '../components/Layout'
import { API_KEY } from "../utils/config";


const MemeUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [fontSize, setFontSize] = useState(55);
  const [fontColor, setFontColor] = useState("#0000FF");
  const [captionPosition, setCaptionPosition] = useState("center");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showAICaptions, setShowAICaptions] = useState(false);
  const [easterEggCount, setEasterEggCount] = useState(0);


  const colors = [
    "#000000", // Black
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF69B4", // Pink
    "#8A2BE2", // Purple
    "#FFA500", // Orange
  ];

  const aiCaptions = [
    "Me debugging at 3 AM 😅",
    "When the code works first try 🎉",
    "JavaScript being JavaScript 🤔",
    "404: Brain not found 🧠",
    "Keep calm and git push --force 😈",
    "CSS: Making developers cry since 1996 😭",
    "I don't always test my code... 🤷‍♂️",
    "Bug? No, that's a feature! 🐛",
    "Coffee.exe has stopped working ☕",
    "Ctrl + C, Ctrl + V = Professional Developer 🚀",
    "When someone touches your code 😱",
    "It works on my machine! 💻",
    "Documentation? What's that? 📚",
    "When the intern pushes to production 🔥",
    "Stack Overflow is down! PANIC! 😨",
    "Me pretending to know React 🎭",
    "When you find a semicolon error 😤",
    "npm install happiness 💝",
    "git commit -m 'I hope this works' 🙏",
    "When the client wants changes 😅",
    // Add more captions as needed
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleAICaption = (caption) => {
    setCaption(caption);
    setShowAICaptions(false);
  };

  const handleCancel = () => {
    setFile(null);
    setPreviewUrl(null);
    setSelectedFile(null);
    setCaption("");
    setError(null);
    setUploadSuccess(false);
  };

  const handleEasterEgg = () => {
    setEasterEggCount((prev) => prev + 1);
    document.body.classList.add("animate-spin");
    setTimeout(() => {
      document.body.classList.remove("animate-spin");
    }, 1000);
  };

  const uploadToImgBB = async () => {
    if (!selectedFile) {
      setError("Please select an image first!");
      return;
    }

    setLoading(true);
    setError(null);
    setUploadSuccess(false);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      reader.onload = async () => {
        try {
          const base64Image = reader.result.split(',')[1];
          
          const formData = new FormData();
          formData.append("image", base64Image);
          formData.append("key", API_KEY);

          const response = await axios.post("https://api.imgbb.com/1/upload", formData);

          if (response.data.data) {
            setUploadSuccess(true);
            console.log("Upload successful!", response.data.data);
            
            const memeData = {
              imageUrl: response.data.data.url,
              deleteUrl: response.data.data.delete_url,
              caption,
              fontSize,
              fontColor,
              captionPosition,
            };

            console.log("Meme data:", memeData);
          }
        } catch (err) {
          setError(err.response?.data?.error?.message || "Failed to upload image");
          console.error("Upload error:", err);
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = (error) => {
        setError("Error reading file");
        setLoading(false);
      };

    } catch (err) {
      setError("Error processing file");
      setLoading(false);
    }
  }
  
  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 md:p-8 rounded-[2.5rem]">
      <div className="max-w-7xl mx-auto">
        {/* Fun Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-bounce">
            🎭 MEME-VERSE 🎭
          </h1>
          <p className="text-white text-xl md:text-2xl animate-pulse">
            Transform your images into epic memes! ✨
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Editor */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-102 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-6 text-purple-600 flex items-center gap-2">
              🎨 Meme Laboratory
            </h2>

            {/* Upload Zone */}
            <div className="mb-8">
              <label className="block border-4 border-dashed border-purple-300 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-500 transition-all bg-purple-50/50 hover:bg-purple-50">
                <input
                  type="file"
                  accept="image/*,.gif"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="space-y-4">
                  <span className="text-6xl">🖼️</span>
                  <p className="text-purple-600 font-bold">Drop your masterpiece here!</p>
                  <p className="text-sm text-purple-400">or click to choose</p>
                </div>
              </label>
            </div>

            {/* Caption Input */}
            <div className="mb-8">
              <label className="block text-purple-600 font-bold mb-2 flex items-center gap-2">
                💭 Your Epic Caption
              </label>
              <textarea
                value={caption}
                onChange={handleCaptionChange}
                className="w-full p-4 border-2 border-purple-300 rounded-xl resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Type something legendary..."
              />
            </div>

            {/* Style Controls */}
            <div className="space-y-6">
              {/* Position Controls */}
              <div>
                <label className="block text-purple-600 font-bold mb-2 flex items-center gap-2">
                  📍 Caption Position
                </label>
                <div className="flex gap-2">
                  {['Top', 'Center', 'Bottom'].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setCaptionPosition(pos.toLowerCase())}
                      className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                        captionPosition === pos.toLowerCase()
                          ? 'bg-purple-500 text-white transform scale-105 shadow-lg'
                          : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Control */}
              <div>
                <label className="block text-purple-600 font-bold mb-2 flex items-center gap-2">
                  📏 Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-purple-600 font-bold mb-2 flex items-center gap-2">
                  🎨 Color Picker
                </label>
                <div className="flex gap-3 flex-wrap">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setFontColor(color)}
                      className={`w-10 h-10 rounded-xl transition-all transform hover:scale-110 ${
                        fontColor === color ? 'ring-4 ring-purple-500 scale-110' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Actions */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-102 transition-all duration-300">
            {/* Preview Section */}
            <h2 className="text-2xl font-bold mb-6 text-purple-600 flex items-center gap-2">
              👀 Preview Your Masterpiece
            </h2>

            {/* Meme Preview */}
            <div className="relative aspect-square bg-purple-50 rounded-2xl overflow-hidden mb-8 shadow-lg">
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Meme Preview"
                    className="w-full h-full object-contain"
                  />
                  <div
                    className={`absolute w-full text-center px-4 ${
                      captionPosition === 'top' ? 'top-4' :
                      captionPosition === 'center' ? 'top-1/2 -translate-y-1/2' :
                      'bottom-4'
                    }`}
                    style={{
                      fontSize: `${fontSize}px`,
                      color: fontColor,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}
                  >
                    {caption}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-purple-400 text-xl">
                  Your meme will appear here! ✨
                </div>
              )}
            </div>

            {/* AI Caption Generator */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-purple-600 flex items-center gap-2">
                🤖 AI Caption Suggestions
              </h3>
              <button
                onClick={() => setShowAICaptions(!showAICaptions)}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                {showAICaptions ? 'Hide AI Captions 🎯' : 'Show AI Captions 🎯'}
              </button>

              {showAICaptions && (
                <div className="mt-4 max-h-40 overflow-y-auto bg-purple-50 rounded-xl p-4 shadow-inner">
                  {aiCaptions.map((aiCaption, index) => (
                    <button
                      key={index}
                      onClick={() => handleAICaption(aiCaption)}
                      className="w-full text-left p-2 hover:bg-purple-100 rounded-lg mb-2 transition-colors"
                    >
                      {aiCaption}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={uploadToImgBB}
                disabled={loading}
                className={`flex-1 py-3 rounded-xl text-white transition-all transform hover:scale-105 shadow-lg ${
                  loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Uploading...
                  </div>
                ) : (
                  '🚀 Save Meme'
                )}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
              >
                ❌ Cancel
              </button>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl animate-shake">
                ⚠️ {error}
              </div>
            )}
            {uploadSuccess && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-xl animate-bounce">
                🎉 Meme uploaded successfully!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Easter Egg Counter */}
      {easterEggCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-xl transition-opacity duration-300">
          🎮 Easter Eggs Found: {easterEggCount}
        </div>
      )}
    </div>
    </Layout>
  );
};

export default MemeUpload;