import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { loginFarmer } from '@/services/authService';
import { Eye, EyeOff, Leaf, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    try {
      const user = loginFarmer(email.trim(), password);
      setUser(user);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}! 🌾`);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (which: 1 | 2) => {
    if (which === 1) { setEmail('ravi@farmer.com'); setPassword('123456'); }
    else { setEmail('meena@farmer.com'); setPassword('123456'); }
    setError('');
  };

  return (
    <div className="app-gradient min-h-screen flex flex-col">
      <div className="max-w-md w-full mx-auto px-5 py-8 flex-1 flex flex-col">
        {/* Back */}
        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 w-fit transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500/20 border border-green-500/40 flex items-center justify-center">
            <Leaf className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-1">Farmer Login</h1>
          <p className="text-sm text-white/55">Sign in to access your crop advisory dashboard</p>
        </div>

        {/* Demo Buttons */}
        <div className="bg-yellow-400/10 border border-yellow-400/25 rounded-xl p-4 mb-5">
          <p className="text-xs font-semibold text-yellow-300 mb-3">Quick Fill Demo Account:</p>
          <div className="flex gap-2">
            <button
              onClick={() => fillDemo(1)}
              className="flex-1 py-2 px-3 rounded-lg bg-yellow-400/15 border border-yellow-400/30 text-xs text-yellow-100 font-medium hover:bg-yellow-400/25 transition-colors"
            >
              Ravi (Rice Farmer)
            </button>
            <button
              onClick={() => fillDemo(2)}
              className="flex-1 py-2 px-3 rounded-lg bg-yellow-400/15 border border-yellow-400/30 text-xs text-yellow-100 font-medium hover:bg-yellow-400/25 transition-colors"
            >
              Meena (Sugarcane)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="glass-card p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/40 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              📧 Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@farmer.com"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-green-400/60 focus:bg-white/15 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              🔒 Password
            </label>
            <div className="flex gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-green-400/60 focus:bg-white/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-3 bg-white/10 border border-white/20 rounded-xl text-white/60 hover:text-white hover:bg-white/15 transition-all min-w-[48px]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-full font-bold text-base text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-green-900/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Signing In...</>
            ) : (
              '🌱 Sign In to Dashboard'
            )}
          </button>

          <p className="text-center text-sm text-white/45">
            New farmer?{' '}
            <Link to="/register" className="text-blue-300 hover:text-blue-200 font-semibold transition-colors">
              Create Account
            </Link>
          </p>
        </form>

        {/* Info */}
        <div className="text-center mt-6">
          <p className="text-xs text-white/40">Weather-Based Crop Advisory System</p>
          <p className="text-xs text-white/30 mt-1">Rule-Based Logic • Real-Time Weather • Tamil Nadu Districts</p>
        </div>
      </div>
    </div>
  );
}
