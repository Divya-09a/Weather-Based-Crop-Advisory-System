import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  alerts: string[];
}

export default function RiskAlertBanner({ alerts }: Props) {
  if (!alerts.length) {
    return (
      <div className="flex items-center gap-3 bg-green-500/15 border border-green-500/40 rounded-xl px-4 py-3 mb-4">
        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
        <p className="text-sm text-green-300 font-medium">
          No Active Risk Alerts — Conditions are favorable!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-red-500/15 border border-red-500/40 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        <p className="text-sm font-bold text-red-300">Active Risk Alerts</p>
      </div>
      <div className="space-y-2">
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            <p className="text-sm text-red-200">{alert}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
