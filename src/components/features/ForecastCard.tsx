import React from 'react';
import { ForecastDay } from '@/types';
import { Droplets } from 'lucide-react';

interface Props {
  forecast: ForecastDay[];
}

export default function ForecastCard({ forecast }: Props) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-base font-semibold text-white mb-4">5-Day Forecast</h3>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {forecast.map((day, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-24 bg-white/10 rounded-xl p-3 flex flex-col items-center gap-1"
          >
            <span className="text-xs text-white/50 text-center">{day.date}</span>
            <span className="text-2xl my-1">{day.conditionIcon}</span>
            <span className="text-xs text-white/70 text-center leading-tight">{day.condition}</span>
            <div className="flex gap-1 items-center mt-1">
              <span className="text-sm font-bold text-white">{day.tempHigh}°</span>
              <span className="text-xs text-white/40">{day.tempLow}°</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-blue-300" />
              <span className="text-xs text-white/60">{day.humidity}%</span>
            </div>
            {day.rainfall > 0 && (
              <span className="text-xs text-blue-300">🌧️ {day.rainfall}mm</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
