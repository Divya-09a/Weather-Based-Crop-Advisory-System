import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  text?: string;
}

export default function LoadingSpinner({ text = 'Loading...' }: Props) {
  return (
    <div className="glass-card p-8 flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
      <p className="text-sm text-white/60 text-center">{text}</p>
    </div>
  );
}
