import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);

      toast.success('Welcome back to VibeBox 🎀');

      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-pink-50
    "
    >
      <div
        className="
        bg-white
        p-8
        rounded-3xl
        shadow-lg
        w-full
        max-w-md
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-center
          text-pink-500
          mb-6
        "
        >
          🎀 Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-xl
              focus:outline-pink-400
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              rounded-xl
              focus:outline-pink-400
            "
          />

          <button
            className="
              w-full
              bg-pink-500
              text-white
              py-3
              rounded-xl
              hover:bg-pink-600
              transition
            "
          >
            Login 🎧
          </button>
        </form>

        <p className="text-center mt-5 text-gray-500">
          Don't have an account?
          <Link to="/register" className="text-pink-500 ml-2 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
