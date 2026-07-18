import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

import { FaUserCircle, FaEnvelope, FaMusic } from 'react-icons/fa';

const Profile = () => {
  const { user, setUser } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put('/auth/profile', form);

      setUser(res.data.user);

      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success('Profile updated 🎀');

      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-5">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="text-center">
          <FaUserCircle className="text-7xl text-pink-500 mx-auto mb-4" />

          {!editMode ? (
            <>
              <h1 className="text-3xl font-bold">{user.username}</h1>

              <p className="text-gray-500 mt-2">
                {user.bio || 'Living my vibe 🎀'}
              </p>
            </>
          ) : (
            <div className="space-y-3">
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4 text-gray-600">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-pink-500" />
            {user.email}
          </div>

          <div className="flex items-center gap-3">
            <FaMusic className="text-pink-500" />
            VibeBox Listener
          </div>
        </div>

        <div className="mt-8 text-center">
          {editMode ? (
            <button
              onClick={handleUpdate}
              className="
              bg-pink-500
              text-white
              px-6
              py-2
              rounded-full
              hover:bg-pink-600
              "
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="
              bg-pink-500
              text-white
              px-6
              py-2
              rounded-full
              hover:bg-pink-600
              "
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
