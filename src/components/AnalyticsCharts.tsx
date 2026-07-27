'use client';

import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { REVENUE_DATA_7D, REVENUE_DATA_30D, REVENUE_DATA_1Y, TimeRange } from '../data/mockData';
import { toast } from 'sonner';

export default function AnalyticsCharts() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  const getData = () => {
    switch (timeRange) {
      case '7d':
        return REVENUE_DATA_7D;
      case '30d':
        return REVENUE_DATA_30D;
      case '1y':
        return REVENUE_DATA_1Y;
    }
  };

  const handleRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    const label = range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : '1 Year';
    toast.info(`Updated view to ${label}`);
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Revenue Overview</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Track earnings and performance trends over time</p>
        </div>

        {/* Date Range Selector Buttons */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => handleRangeChange('7d')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition ${
              timeRange === '7d'
                ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => handleRangeChange('30d')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition ${
              timeRange === '30d'
                ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => handleRangeChange('1y')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition ${
              timeRange === '1y'
                ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            1 Year
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getData()}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
            <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                borderColor: '#27272a',
                borderRadius: '8px',
                color: '#f4f4f5',
              }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}