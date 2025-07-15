import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const result = await register(username, email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-900 text-white flex items-center justify-center p-4">
      <div className="bg-blue-800/40 p-8 rounded-xl backdrop-blur-sm border border-cyan-400/20 shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-blue-900/50 border border-cyan-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-blue-900/50 border border-cyan-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-blue-900/50 border border-cyan-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-blue-200">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}