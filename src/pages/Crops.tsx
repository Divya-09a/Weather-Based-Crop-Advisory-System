import React, { useState } from 'react';
import { CROP_DATABASE, CropConditions } from '@/constants/crops';
import { useAuth } from '@/contexts/AuthContext';
import { X, Thermometer, Droplets, Wind, CloudRain, MapPin, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CondRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}

function CondRow({ icon, label, value, sub }: CondRowProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0">
      <div className="text-green-300">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-white/60">{label}</p>
        {sub && <p className="text-xs text-white/35">{sub}</p>}
      </div>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

export default function Crops() {
  const { user } = useAuth();
  const [selectedCrop, setSelectedCrop] = useState<CropConditions | null>(null);

  return (
    <div className="p-5 max-w-2xl mx-auto pt-6">
      <h1 className="text-2xl font-extrabold text-white mb-1">🌿 Crop Database</h1>
      <p className="text-sm text-white/55 mb-5">Ideal growing conditions for Tamil Nadu crops</p>

      {/* Crop Grid */}
      <div className="grid grid-cols-3 gap-3 mb-5 sm:grid-cols-4">
        {CROP_DATABASE.map(crop => (
          <button
            key={crop.name}
            onClick={() => setSelectedCrop(selectedCrop?.name === crop.name ? null : crop)}
            className={cn(
              'glass-card p-3 flex flex-col items-center text-center hover:scale-[1.04] transition-all duration-200',
              user?.crop === crop.name && 'border-green-500/50 bg-green-500/10',
              selectedCrop?.name === crop.name && 'border-blue-400/50 bg-blue-500/10'
            )}
          >
            <span className="text-3xl mb-2">{crop.emoji}</span>
            <p className={cn('text-xs font-semibold', user?.crop === crop.name ? 'text-green-300' : 'text-white/75')}>
              {crop.name}
            </p>
            {user?.crop === crop.name && (
              <span className="mt-1 px-1.5 py-0.5 rounded-full bg-green-500/30 text-xs text-green-300 font-bold">
                Your Crop
              </span>
            )}
            <p className="text-[10px] text-white/35 mt-1 leading-tight">{crop.season.split('(')[0].trim()}</p>
          </button>
        ))}
      </div>

      {/* Crop Detail Panel */}
      {selectedCrop && (
        <div className="glass-card p-5 mb-5 border border-blue-400/30">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4 pb-4 border-b border-white/10">
            <span className="text-4xl">{selectedCrop.emoji}</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-extrabold text-white">{selectedCrop.name}</h2>
              <p className="text-xs text-white/45 mb-2">{selectedCrop.season}</p>
              <p className="text-sm text-white/65 leading-relaxed">{selectedCrop.description}</p>
            </div>
            <button
              onClick={() => setSelectedCrop(null)}
              className="p-2 rounded-lg bg-white/10 text-white/50 hover:text-white hover:bg-white/15 transition-all shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Ideal Conditions */}
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400" />
            Ideal Growing Conditions
          </h3>
          <div className="mb-4">
            <CondRow
              icon={<Thermometer className="w-4 h-4" />}
              label="Temperature"
              sub="Ideal"
              value={`${selectedCrop.tempMin}–${selectedCrop.tempMax}°C (${selectedCrop.tempIdeal}°C)`}
            />
            <CondRow
              icon={<Droplets className="w-4 h-4" />}
              label="Humidity"
              value={`${selectedCrop.humidityMin}–${selectedCrop.humidityMax}%`}
            />
            <CondRow
              icon={<CloudRain className="w-4 h-4" />}
              label="Rainfall"
              sub="Monthly"
              value={`${selectedCrop.rainfallMin}–${selectedCrop.rainfallMax} mm`}
            />
            <CondRow
              icon={<Wind className="w-4 h-4" />}
              label="Max Wind Speed"
              value={`${selectedCrop.windMax} m/s`}
            />
          </div>

          {/* Risk Conditions */}
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            Risk Conditions
          </h3>
          <div className="space-y-2 mb-4">
            {selectedCrop.risks.map((risk, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                <p className="text-sm text-orange-200/80">{risk}</p>
              </div>
            ))}
          </div>

          {/* Suitable Regions */}
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-400" />
            Suitable Tamil Nadu Regions
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedCrop.suitableRegions.map((r, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-white/65"
              >
                📍 {r}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* About Box */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-white mb-3">About the Crop Database</h3>
        <p className="text-sm text-white/55 leading-relaxed">
          This database contains ideal condition parameters for 7 major Tamil Nadu crops.
          The rule-based advisory engine compares your current weather data against these parameters
          to generate actionable farming recommendations.
        </p>
      </div>
    </div>
  );
}
