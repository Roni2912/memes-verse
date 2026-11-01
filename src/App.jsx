import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './config/site';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

const Explore = lazy(() => import('./pages/Explore'));
const Create = lazy(() => import('./pages/Create'));
const MemeDetails = lazy(() => import('./pages/MemeDetails'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="create" element={<Create />} />
              <Route path="meme/:id" element={<MemeDetails />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="profile/:tab?" element={<Profile />} />
              {/* Legacy URLs */}
              <Route path="explorer" element={<Navigate to={ROUTES.explore} replace />} />
              <Route path="trending" element={<Navigate to={ROUTES.explore} replace />} />
              <Route path="upload" element={<Navigate to={ROUTES.create} replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
