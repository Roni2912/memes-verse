import { useState } from 'react';
import axios from 'axios';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);

    const { data } = await axios.post('/api/upload', formData);
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <textarea
        placeholder="Add a funny caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-2 mt-4 border rounded-lg"
      />
      <button onClick={handleUpload} className="mt-4 p-2 bg-blue-500 text-white rounded-lg">
        Upload
      </button>
    </div>
  );
}