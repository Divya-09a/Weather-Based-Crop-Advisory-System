import React, { useState } from 'react';
import { Advisory } from '@/types';
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  advisory: Advisory;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    textColor: 'text-green-400',
    catColor: 'text-green-300',
    cardClass: 'advisory-success',
    actionBg: 'bg-green-500/10',
    borderBottom: 'border-green-500/30',
  },
  warning: {
    icon: AlertTriangle,
    textColor: 'text-orange-400',
    catColor: 'text-orange-300',
    cardClass: 'advisory-warning',
    actionBg: 'bg-orange-500/10',
    borderBottom: 'border-orange-500/30',
  },
  danger: {
    icon: XCircle,
    textColor: 'text-red-400',
    catColor: 'text-red-300',
    cardClass: 'advisory-danger',
    actionBg: 'bg-red-500/10',
    borderBottom: 'border-red-500/30',
  },
  info: {
    icon: Info,
    textColor: 'text-blue-400',
    catColor: 'text-blue-300',
    cardClass: 'advisory-info',
    actionBg: 'bg-blue-500/10',
    borderBottom: 'border-blue-500/30',
  },
};

export default function AdvisoryCard({ advisory }: Props) {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[advisory.type];
  const Icon = config.icon;

  return (
    <div className={cn('rounded-xl border mb-3 overflow-hidden transition-all duration-200', config.cardClass)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-white/5 transition-colors"
      >
        <Icon className={cn('w-5 h-5 mt-0.5 shrink-0', config.textColor)} />
        <div className="flex-1 min-w-0">
          <p className={cn('text-xs font-bold uppercase tracking-wider mb-1', config.catColor)}>
            {advisory.category}
          </p>
          <p className="text-sm text-white/85 leading-relaxed">{advisory.message}</p>
        </div>
        <div className="text-white/40 shrink-0 mt-0.5">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {expanded && (
        <div className={cn('border-t px-4 py-3', config.borderBottom, config.actionBg)}>
          <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-1.5">
            Recommended Action
          </p>
          <p className="text-sm text-white/75 leading-relaxed">{advisory.action}</p>
        </div>
      )}
    </div>
  );
}
