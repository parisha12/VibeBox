import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMusic } from 'react-icons/fa';
import toast from 'react-hot-toast';

import api from '../services/api';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      return toast.error('Please fill all fields');
    }

    try {
      setLoading(true);

      const { data } = await api.post('/auth/register', form);

      toast.success(data.message || 'Registration successful');

      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-white px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-pink-500 p-4 rounded-full text-white text-3xl">
            <FaMusic />
          </div>

          <h1 className="text-3xl font-bold mt-4 text-pink-600">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">Join VibeBox today 🎀</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          <Button type="submit" loading={loading} className="w-full">
            Register
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-pink-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
