import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  score: number;
  status: 'Favorable' | 'Moderate' | 'Unfavorable';
  cropName: string;
}

const statusConfig = {
  Favorable: {
    color: '#4caf50',
    textColor: 'text-green-400',
    bgClass: 'bg-green-500',
    pillClass: 'status-favorable',
    emoji: '🌟',
  },
  Moderate: {
    color: '#ff9800',
    textColor: 'text-orange-400',
    bgClass: 'bg-orange-500',
    pillClass: 'status-moderate',
    emoji: '⚡',
  },
  Unfavorable: {
    color: '#f44336',
    textColor: 'text-red-400',
    bgClass: 'bg-red-500',
    pillClass: 'status-unfavorable',
    emoji: '⚠️',
  },
};

export default function ScoreGauge({ score, status, cropName }: Props) {
  const config = statusConfig[status];

  return (
    <div className="glass-card p-5 mb-4">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-3xl">{config.emoji}</span>
        <div className="flex-1">
          <p className="text-xs text-white/50 font-medium uppercase tracking-wider">Crop Favorability Score</p>
          <p className="text-base font-bold text-white">{cropName}</p>
        </div>
        <div className="text-right">
          <div className="flex items-baseline gap-1">
            <span className={cn('text-3xl font-extrabold', config.textColor)}>{score}</span>
            <span className="text-sm text-white/40">/100</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2.5 bg-white/15 rounded-full overflow-hidden mb-3">
        <div
          className={cn('h-full rounded-full transition-all duration-700', config.bgClass)}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className={cn('text-sm font-semibold px-3 py-1 rounded-full text-xs border', config.pillClass)}>
          {status} Conditions
        </span>
        <p className="text-xs text-white/45">
          {score >= 70
            ? 'Proceed with normal farming operations.'
            : score >= 45
            ? 'Take precautionary measures as advised.'
            : 'Immediate action required.'}
        </p>
      </div>
    </div>
  );
}
