import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWeather } from '@/hooks/useWeather';
import AdvisoryCard from '@/components/features/AdvisoryCard';
import ScoreGauge from '@/components/features/ScoreGauge';
import RiskAlertBanner from '@/components/features/RiskAlertBanner';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { RefreshCw, AlertTriangle, Info } from 'lucide-react';

export default function Advisory() {
  const { user } = useAuth();
  const { weather, advisory, isLoading, error, lastUpdated, refresh } =
    useWeather(user?.location || '', user?.crop || '');

  return (
    <div className="p-5 max-w-2xl mx-auto pt-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white mb-1">🌾 Crop Advisory Report</h1>
          <p className="text-sm text-white/55">
            Rule-Based Analysis for {user?.crop} in {user?.location}
          </p>
          {lastUpdated && (
            <p className="text-xs text-white/35 mt-1">
              Generated: {lastUpdated.toLocaleString('en-IN')}
            </p>
          )}
        </div>
        <button
          onClick={refresh}
          disabled={isLoading}
          className="w-11 h-11 shrink-0 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Weather Summary Banner */}
      {weather && (
        <div className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 rounded-xl p-3 mb-5">
          <span className="text-xl">{weather.conditionIcon}</span>
          <p className="text-sm text-white/70">
            {weather.temperature}°C • {weather.humidity}% humidity • {weather.condition}
          </p>
        </div>
      )}

      {/* Content */}
      {isLoading && !advisory ? (
        <LoadingSpinner text="Generating advisory report..." />
      ) : error ? (
        <div className="glass-card p-6 flex flex-col items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <p className="text-sm text-red-300 text-center">{error}</p>
          <button
            onClick={refresh}
            className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white font-medium hover:bg-white/15 transition-all"
          >
            Retry
          </button>
        </div>
      ) : advisory ? (
        <>
          {/* Score Gauge */}
          <ScoreGauge score={advisory.score} status={advisory.overallStatus} cropName={advisory.cropName} />

          {/* Risk Alerts */}
          <RiskAlertBanner alerts={advisory.riskAlerts} />

          {/* Advisory Cards */}
          <div className="mb-2">
            <h2 className="text-base font-bold text-white mb-1">
              Detailed Advisories ({advisory.advisories.length})
            </h2>
            <p className="text-xs text-white/40 mb-4">Tap each advisory to see recommended action</p>
            {advisory.advisories.map((adv, i) => (
              <AdvisoryCard key={i} advisory={adv} />
            ))}
          </div>

          {/* Rule Engine Info */}
          <div className="glass-card p-5 mt-2">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">About This Advisory</h3>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              This advisory is generated using a rule-based logic engine — not AI or machine learning.
              Advisories are based on comparing current weather conditions against predefined crop
              condition thresholds established by agricultural best practices.
            </p>
            <div className="space-y-1.5">
              {[
                'IF temp > crop_max_temp → Irrigation advisory',
                'IF humidity > max_humidity → Fungal disease warning',
                'IF rainfall < min_rainfall → Drought risk alert',
                'IF wind > crop_wind_limit → Wind damage warning',
              ].map((rule) => (
                <p key={rule} className="text-xs text-white/40 font-mono-display">
                  • {rule}
                </p>
              ))}
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={refresh}
            className="w-full mt-5 py-3 rounded-full bg-white/10 border border-white/20 text-sm text-white/65 font-medium hover:bg-white/15 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Advisory
          </button>
        </>
      ) : null}
    </div>
  );
}
