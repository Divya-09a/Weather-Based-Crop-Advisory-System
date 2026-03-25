import React from 'react';
import { WeatherData } from '@/types';
import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Thermometer } from 'lucide-react';

interface Props {
  weather: WeatherData;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white/10 rounded-xl p-3 min-w-0">
      <div className="text-green-300">{icon}</div>
      <span className="text-sm font-semibold text-white">{value}</span>
      <span className="text-xs text-white/50 text-center">{label}</span>
    </div>
  );
}

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="glass-card p-5">
      {/* Main Temperature Row */}
      <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/10">
        <div className="flex flex-col items-center flex-1">
          <span className="text-5xl mb-1">{weather.conditionIcon}</span>
          <span className="text-4xl font-extrabold text-white">{weather.temperature}°C</span>
          <span className="text-base font-semibold text-white/90 mt-1">{weather.condition}</span>
          <span className="text-sm text-white/60 capitalize">{weather.description}</span>
        </div>
        <div className="w-px h-24 bg-white/20" />
        <div className="flex flex-col items-center gap-3 pl-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-orange-300" />
            <div>
              <p className="text-xs text-white/50">Feels Like</p>
              <p className="text-base font-bold text-white">{weather.feelsLike}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-300" />
            <div>
              <p className="text-xs text-white/50">UV Index</p>
              <p className="text-base font-bold text-white">{weather.uvIndex}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <StatItem
          icon={<Droplets className="w-4 h-4" />}
          label="Humidity"
          value={`${weather.humidity}%`}
        />
        <StatItem
          icon={<Wind className="w-4 h-4" />}
          label="Wind"
          value={`${weather.windSpeed} m/s`}
        />
        <StatItem
          icon={<Gauge className="w-4 h-4" />}
          label="Pressure"
          value={`${weather.pressure} hPa`}
        />
        <StatItem
          icon={<Eye className="w-4 h-4" />}
          label="Visibility"
          value={`${weather.visibility} km`}
        />
        <StatItem
          icon={<Droplets className="w-4 h-4" />}
          label="Rainfall"
          value={`${weather.rainfall} mm`}
        />
        <StatItem
          icon={<Wind className="w-4 h-4" />}
          label="Wind Dir"
          value={`${weather.windDirection}°`}
        />
      </div>

      {/* Sun Times */}
      <div className="flex bg-white/10 rounded-xl overflow-hidden">
        <div className="flex-1 flex items-center gap-3 p-3 justify-center">
          <Sunrise className="w-5 h-5 text-yellow-300" />
          <div>
            <p className="text-xs text-white/50">Sunrise</p>
            <p className="text-sm font-semibold text-white">{weather.sunrise}</p>
          </div>
        </div>
        <div className="w-px bg-white/20" />
        <div className="flex-1 flex items-center gap-3 p-3 justify-center">
          <Sunset className="w-5 h-5 text-orange-300" />
          <div>
            <p className="text-xs text-white/50">Sunset</p>
            <p className="text-sm font-semibold text-white">{weather.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
