'use client';

import React from 'react';
import { useRealTimeSectors } from '@/hooks/useRealTimeUpdates';
import { getMarketSectors } from '@/lib/api/marketData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SectorPerformanceProps {
  className?: string;
}

export default function SectorPerformance({ className = '' }: SectorPerformanceProps) {
  const initialSectors = getMarketSectors();
  const { sectors } = useRealTimeSectors(initialSectors);
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <h2 className="text-lg font-semibold text-[#1A2B4A] mb-4">Sector Performance</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sectors}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              domain={[-3, 3]} 
              tick={{ fontSize: 10 }} 
              tickFormatter={(value) => `${value.toFixed(1)}%`}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fontSize: 10 }} 
              width={100}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Change']}
              labelFormatter={(label) => `Sector: ${label}`}
            />
            <Bar 
              dataKey="change" 
              fill={(data) => (data > 0 ? "#00C853" : "#FF3D00")}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Decliners</span>
          <span>Gainers</span>
        </div>
      </div>
    </div>
  );
}
