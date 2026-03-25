import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWeather } from '@/hooks/useWeather';
import WeatherCard from '@/components/features/WeatherCard';
import ForecastCard from '@/components/features/ForecastCard';
import ScoreGauge from '@/components/features/ScoreGauge';
import RiskAlertBanner from '@/components/features/RiskAlertBanner';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getCropEmoji(cropName: string): string {
  const map: Record<string, string> = {
    Rice: '🌾', Wheat: '🌿', Sugarcane: '🎋',
    Cotton: '🌸', Maize: '🌽', Groundnut: '🥜', Banana: '🍌',
  };
  return map[cropName] || '🌿';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { weather, forecast, advisory, isLoading, error, lastUpdated, refresh } =
    useWeather(user?.location || '', user?.crop || '');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate('/');
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-5 max-w-2xl mx-auto pt-6">
      {/* Greeting Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">
            {getGreeting()}, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-sm text-white/50 mt-0.5">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={isLoading}
          className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all disabled:opacity-50"
          title="Refresh weather data"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Farmer Info Card */}
      <div className="glass-card p-4 mb-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-green-500/50 flex items-center justify-center text-2xl shrink-0">
          👨‍🌾
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-white truncate">{user.name}</p>
          <p className="text-sm text-white/55 mb-1">Age: {user.age} years • {user.location}</p>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-xs text-green-300 font-medium">
            {getCropEmoji(user.crop)} Growing: {user.crop}
          </span>
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <p className="text-xs text-white/35 text-right mb-3">
          Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
        </p>
      )}

      {/* Risk Alerts */}
      {advisory && <RiskAlertBanner alerts={advisory.riskAlerts} />}

      {/* Favorability Score */}
      {advisory && (
        <ScoreGauge score={advisory.score} status={advisory.overallStatus} cropName={advisory.cropName} />
      )}

      {/* Weather Section */}
      <h2 className="text-base font-bold text-white mb-3">Current Weather</h2>
      {isLoading && !weather ? (
        <div className="mb-4">
          <LoadingSpinner text={`Fetching weather data for ${user.location}...`} />
        </div>
      ) : error ? (
        <div className="glass-card p-5 mb-4 flex flex-col items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <p className="text-sm text-red-300 text-center">{error}</p>
          <button
            onClick={refresh}
            className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white font-medium hover:bg-white/15 transition-all"
          >
            Retry
          </button>
        </div>
      ) : weather ? (
        <div className="mb-5">
          <WeatherCard weather={weather} />
        </div>
      ) : null}

      {/* Advisory Preview */}
      {advisory && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-white mb-3">Top Advisory</h2>
          <div className="glass-card p-4">
            <p className="text-sm font-bold text-white mb-2">
              {advisory.overallStatus === 'Favorable' ? '✅' :
                advisory.overallStatus === 'Moderate' ? '⚠️' : '🚨'}{' '}
              {advisory.overallStatus} Conditions
            </p>
            <p className="text-sm text-white/65 leading-relaxed mb-4">
              {advisory.advisories[0]?.message || 'No advisory generated.'}
            </p>
            <Link
              to="/advisory"
              className="block text-center py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-blue-300 font-semibold hover:bg-white/15 transition-all"
            >
              View Full Advisory Report →
            </Link>
          </div>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-white mb-3">Weather Forecast</h2>
          <ForecastCard forecast={forecast} />
        </div>
      )}

      {/* Quick Access */}
      <h2 className="text-base font-bold text-white mb-3">Quick Access</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Link
          to="/advisory"
          className="glass-card p-4 text-center hover:bg-white/15 transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl block mb-2">📋</span>
          <p className="text-sm font-bold text-white mb-1">Advisory Report</p>
          <p className="text-xs text-white/45">Full advisory analysis</p>
        </Link>
        <Link
          to="/crops"
          className="glass-card p-4 text-center hover:bg-white/15 transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl block mb-2">🌿</span>
          <p className="text-sm font-bold text-white mb-1">Crop Database</p>
          <p className="text-xs text-white/45">Ideal crop conditions</p>
        </Link>
      </div>
    </div>
  );
}
