import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf, MapPin, Sprout, AlertTriangle, BarChart3, ChevronRight } from 'lucide-react';
import heroFarm from '@/assets/hero-farm.jpg';

const features = [
  {
    icon: '🌤️',
    title: 'Real-Time Weather',
    desc: 'Live weather data for your Tamil Nadu district',
  },
  {
    icon: '🌾',
    title: 'Rule-Based Advisory',
    desc: 'Crop guidance using proven agricultural rules',
  },
  {
    icon: '⚠️',
    title: 'Risk Alerts',
    desc: 'Early warnings for temperature, humidity and rainfall',
  },
  {
    icon: '📊',
    title: 'Crop Database',
    desc: '7 major crops with ideal condition parameters',
  },
];

const stats = [
  { value: '20', label: 'Districts' },
  { value: '7', label: 'Crops' },
  { value: '15+', label: 'Rules' },
  { value: '100%', label: 'Free' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="app-gradient min-h-screen">
      <div className="max-w-lg mx-auto lg:max-w-4xl px-5 py-8 lg:py-16">

        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-xs text-white/70 font-medium">Academic Project 2024</span>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Column */}
          <div>
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-black/40">
              <img
                src={heroFarm}
                alt="Tamil Nadu paddy fields"
                className="w-full h-56 lg:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/80 backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-semibold text-white">Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
              Smart Farming Starts with{' '}
              <span className="gradient-text">Knowing Your Weather</span>
            </h1>
            <p className="text-base text-white/65 leading-relaxed mb-6">
              Get real-time rule-based crop advisories based on weather conditions in your region.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3 p-4 glass-card mb-6">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className="text-xl font-extrabold text-green-300">{s.value}</span>
                  <span className="text-xs text-white/50">{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-base text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 shadow-lg shadow-green-900/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sprout className="w-5 h-5" />
                Get Started
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 py-4 px-6 rounded-full font-semibold text-base text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-200"
              >
                🔑 Farmer Login
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="bg-yellow-400/10 border border-yellow-400/25 rounded-xl p-4 mb-8">
              <p className="text-xs font-bold text-yellow-300 mb-2">📋 Demo Credentials</p>
              <p className="text-xs text-yellow-100/80 font-mono-display">Email: ravi@farmer.com | Password: 123456</p>
              <p className="text-xs text-yellow-100/80 font-mono-display">Email: meena@farmer.com | Password: 123456</p>
            </div>
          </div>

          {/* Right Column — Features */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">What You Get</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="glass-card p-4 hover:bg-white/15 transition-all duration-200 hover:scale-[1.02]"
                >
                  <span className="text-2xl mb-3 block">{f.icon}</span>
                  <p className="text-sm font-bold text-white mb-1">{f.title}</p>
                  <p className="text-xs text-white/55 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* How It Works */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-400" />
                How Advisory Rules Work
              </h3>
              <div className="space-y-2.5">
                {[
                  'IF temp > crop_max → Irrigation advisory',
                  'IF humidity > max → Fungal disease warning',
                  'IF rainfall < min → Drought risk alert',
                  'IF wind > crop_limit → Wind damage warning',
                ].map((rule) => (
                  <div key={rule} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                    <p className="text-xs text-white/60 font-mono-display">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm font-medium text-white/55">
            Weather-Based Crop Advisory System for Farmers
          </p>
          <p className="text-xs text-white/35 mt-1">
            Tamil Nadu Agriculture Department • Final Year Project
          </p>
        </div>
      </div>
    </div>
  );
}
