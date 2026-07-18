import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import ProtectedRoute from '../components/common/ProtectedRoute';
import Layout from '../components/layout/Layout';

import Songs from '../pages/Songs';
import Favorites from '../pages/Favorites';
import Playlists from '../pages/Playlists';
import PlaylistDetails from '../pages/PlaylistDetails';
import RecentlyPlayed from '../pages/RecentlyPlayed';
import Profile from '../pages/Profile';
import Artists from '../pages/Artists';
import ArtistDetails from '../pages/ArtistDetails';

import Albums from '../pages/Albums';
import AlbumDetails from '../pages/AlbumDetails';
import UploadSong from '../pages/UploadSong';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/songs"
        element={
          <Layout>
            <Songs />
          </Layout>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Layout>
              <Favorites />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlists"
        element={
          <ProtectedRoute>
            <Layout>
              <Playlists />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlists/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <PlaylistDetails />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/recently-played"
        element={
          <ProtectedRoute>
            <Layout>
              <RecentlyPlayed />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/artists" element={<Artists />} />

      <Route
        path="/artists/:id"
        element={
          <ProtectedRoute>
            <ArtistDetails />
          </ProtectedRoute>
        }
      />

      <Route path="/albums" element={<Albums />} />

      <Route
        path="/albums/:id"
        element={
          <ProtectedRoute>
            <AlbumDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-song"
        element={
          <ProtectedRoute>
            <Layout>
              <UploadSong />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
