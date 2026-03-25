import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { registerFarmer } from '@/services/authService';
import { TAMIL_NADU_DISTRICTS } from '@/constants/locations';
import { CROP_DATABASE } from '@/constants/crops';
import { Eye, EyeOff, Leaf, ArrowLeft, AlertCircle, Loader2, ChevronDown, X } from 'lucide-react';
import { toast } from 'sonner';

interface PickerItem { label: string; value: string; sub: string; }

function SelectPicker({
  label,
  placeholder,
  value,
  items,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  items: PickerItem[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = items.find(i => i.value === value);

  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-left hover:bg-white/15 focus:outline-none focus:border-green-400/60 transition-all"
        >
          <span className={value ? 'text-white' : 'text-white/30'}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute z-50 w-full mt-1 bg-[#1a3a2a] border border-white/20 rounded-xl shadow-2xl max-h-56 overflow-y-auto">
            {items.map(item => (
              <button
                key={item.value}
                type="button"
                onClick={() => { onChange(item.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/10 transition-colors ${value === item.value ? 'bg-white/10' : ''}`}
              >
                <div>
                  <p className={`text-sm ${value === item.value ? 'text-white font-semibold' : 'text-white/75'}`}>{item.label}</p>
                  <p className="text-xs text-white/40">{item.sub}</p>
                </div>
                {value === item.value && <span className="text-green-400 text-sm font-bold">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = (): string | null => {
    if (!name.trim()) return 'Please enter your name.';
    if (!email.trim()) return 'Please enter your email.';
    if (!email.includes('@')) return 'Please enter a valid email address.';
    if (!password || password.length < 6) return 'Password must be at least 6 characters.';
    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) return 'Please enter a valid age (18–100).';
    if (!location) return 'Please select your district.';
    if (!crop) return 'Please select your crop.';
    return null;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    try {
      const user = registerFarmer({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        age: parseInt(age, 10),
        location,
        crop,
      });
      setUser(user);
      toast.success(`Welcome, ${user.name.split(' ')[0]}! Your account is ready. 🌱`);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const districtItems: PickerItem[] = TAMIL_NADU_DISTRICTS.map(d => ({
    label: `📍 ${d.name}`,
    value: d.name,
    sub: d.region,
  }));

  const cropItems: PickerItem[] = CROP_DATABASE.map(c => ({
    label: `${c.emoji} ${c.name}`,
    value: c.name,
    sub: c.season,
  }));

  return (
    <div className="app-gradient min-h-screen">
      <div className="max-w-md w-full mx-auto px-5 py-8">
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
          <h1 className="text-3xl font-extrabold text-white mb-1">Create Account</h1>
          <p className="text-sm text-white/55">Register as a Tamil Nadu Farmer</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="glass-card p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/40 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">👤 Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-green-400/60 focus:bg-white/15 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">📧 Email Address</label>
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
            <label className="block text-sm font-medium text-white/70 mb-1.5">🔒 Password</label>
            <div className="flex gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-green-400/60 focus:bg-white/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-3 bg-white/10 border border-white/20 rounded-xl text-white/60 hover:text-white hover:bg-white/15 transition-all min-w-[48px] flex items-center justify-center"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">🎂 Age</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="Your age (18–100)"
              min={18}
              max={100}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-green-400/60 focus:bg-white/15 transition-all"
            />
          </div>

          {/* Location */}
          <SelectPicker
            label="📍 Tamil Nadu District"
            placeholder="Select your district"
            value={location}
            items={districtItems}
            onChange={setLocation}
          />

          {/* Crop */}
          <SelectPicker
            label="🌾 Your Crop"
            placeholder="Select your crop"
            value={crop}
            items={cropItems}
            onChange={setCrop}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-full font-bold text-base text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-green-900/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</>
            ) : (
              '🌱 Create My Account'
            )}
          </button>

          <p className="text-center text-sm text-white/45">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-300 hover:text-blue-200 font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
