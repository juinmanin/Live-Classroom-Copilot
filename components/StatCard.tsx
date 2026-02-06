import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  max?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit = '',
  color = 'text-blue-500',
  max = 100
}) => {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg">
      <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{title}</h3>
      <div className="flex items-end space-x-2">
        <span className={`text-3xl font-bold ${color}`}>{Math.round(value)}</span>
        <span className="text-slate-500 text-sm mb-1">{unit}</span>
      </div>
      <div className="w-full bg-slate-700 h-1.5 mt-3 rounded-full overflow-hidden">
        <div
          className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-500`}
          style={{ width: `${Math.min(100, (Math.round(value) / max) * 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatCard;
