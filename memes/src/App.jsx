import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explorer from "./pages/explorer";
import Upload from "./pages/Upload";
// import Profile from "./pages/Profile";
// import Leaderboard from "./pages/leaderboard";
import NotFound from "./pages/NotFound";
import TrendingMemes from "./components/TrendingMemes";
import MemeUpload from "./components/MemeUpload";
import MemeDetails from "./pages/MemeDetails"
import { ThemeProvider } from './contexts/ThemeContext';
import { lazy } from "react";

const Profile = lazy(() => import('./pages/Profile'));
const Leaderboard = lazy(() => import('./pages/leaderboard'));

function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/trending" element={<TrendingMemes />} />
        <Route path="/create" element={<MemeUpload />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/meme/:id" element={<MemeDetails />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;