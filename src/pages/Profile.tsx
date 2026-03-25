import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CROP_DATABASE } from '@/constants/crops';
import { TAMIL_NADU_DISTRICTS } from '@/constants/locations';
import { LogOut, User, MapPin, Sprout, Server, AlertTriangle } from 'lucide-react';

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0">
      <div className="text-white/40 w-5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/40">{label}</p>
        <p className="text-sm text-white font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const cropInfo = CROP_DATABASE.find(c => c.name === user?.crop);
  const districtInfo = TAMIL_NADU_DISTRICTS.find(d => d.name === user?.location);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const registeredDate = new Date(user.registeredAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="p-5 max-w-2xl mx-auto pt-6 pb-8">
      {/* Profile Header */}
      <div className="text-center pb-6 mb-6 border-b border-white/10">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 border-[3px] border-green-500/50 flex items-center justify-center text-4xl shadow-xl">
          👨‍🌾
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-1">{user.name}</h1>
        <p className="text-sm text-white/50 mb-3">{user.email}</p>
        <span className="px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/40 text-xs text-green-300 font-semibold">
          🌱 Registered Farmer
        </span>
      </div>

      {/* Personal Information */}
      <div className="mb-5">
        <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-white/50" />
          Personal Information
        </h2>
        <div className="glass-card px-4">
          <InfoRow icon={<User className="w-4 h-4" />} label="Full Name" value={user.name} />
          <InfoRow icon={<span className="text-sm">📧</span>} label="Email" value={user.email} />
          <InfoRow icon={<span className="text-sm">🎂</span>} label="Age" value={`${user.age} years`} />
          <InfoRow icon={<span className="text-sm">📅</span>} label="Registered" value={registeredDate} />
        </div>
      </div>

      {/* Location */}
      <div className="mb-5">
        <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-white/50" />
          Farm Location
        </h2>
        <div className="glass-card px-4">
          <InfoRow icon={<MapPin className="w-4 h-4" />} label="District" value={user.location} />
          {districtInfo && (
            <>
              <InfoRow icon={<span className="text-sm">🗺️</span>} label="Agro-Climatic Zone" value={districtInfo.region} />
              <InfoRow icon={<span className="text-sm">📍</span>} label="Coordinates" value={`${districtInfo.lat}°N, ${districtInfo.lon}°E`} />
            </>
          )}
        </div>
      </div>

      {/* Crop Details */}
      <div className="mb-5">
        <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Sprout className="w-4 h-4 text-white/50" />
          Crop Details
        </h2>
        <div className="glass-card px-4">
          {cropInfo ? (
            <>
              <InfoRow icon={<span className="text-sm">{cropInfo.emoji}</span>} label="Crop" value={cropInfo.name} />
              <InfoRow icon={<span className="text-sm">📆</span>} label="Season" value={cropInfo.season} />
              <InfoRow
                icon={<span className="text-sm">🌡️</span>}
                label="Ideal Temperature"
                value={`${cropInfo.tempMin}–${cropInfo.tempMax}°C`}
              />
              <InfoRow
                icon={<span className="text-sm">💧</span>}
                label="Humidity Range"
                value={`${cropInfo.humidityMin}–${cropInfo.humidityMax}%`}
              />
              <InfoRow
                icon={<span className="text-sm">🌧️</span>}
                label="Monthly Rainfall"
                value={`${cropInfo.rainfallMin}–${cropInfo.rainfallMax} mm`}
              />
            </>
          ) : (
            <InfoRow icon={<span className="text-sm">🌿</span>} label="Crop" value={user.crop} />
          )}
        </div>
      </div>

      {/* System Info */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-white/50" />
          System Information
        </h2>
        <div className="glass-card p-5 space-y-2">
          <p className="text-sm font-bold text-white mb-2">Weather-Based Crop Advisory System</p>
          {[
            ['💻', 'Platform', 'Web App (React + Vite)'],
            ['🔬', 'Advisory Method', 'Rule-Based Logic'],
            ['🌤️', 'Weather', 'OpenWeatherMap API'],
            ['💾', 'Storage', 'Local (localStorage)'],
            ['📍', 'Coverage', 'Tamil Nadu, India'],
            ['🌾', 'Crops', '7 Major Varieties'],
            ['📊', 'Districts', '20 Tamil Nadu Districts'],
          ].map(([emoji, label, value]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-sm">{emoji}</span>
              <span className="text-xs text-white/40">{label}:</span>
              <span className="text-xs text-white/65 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full py-4 rounded-full bg-red-500/15 border border-red-500/40 text-base font-semibold text-red-300 hover:bg-red-500/25 transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      ) : (
        <div className="glass-card p-5 border border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <p className="text-sm font-bold text-white">Confirm Logout</p>
          </div>
          <p className="text-sm text-white/55 mb-4">Are you sure you want to logout?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-3 rounded-xl bg-white/10 border border-white/20 text-sm font-medium text-white/70 hover:bg-white/15 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-sm font-semibold text-red-300 hover:bg-red-500/30 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
