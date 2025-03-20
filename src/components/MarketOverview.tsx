'use client';

import React from 'react';
import { useRealTimeIndex } from '@/hooks/useRealTimeUpdates';
import { getNepseIndex } from '@/lib/api/marketData';
import { StockChartData, generateHistoricalData } from '@/lib/api/yahooFinance';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MarketOverviewProps {
  className?: string;
}

export default function MarketOverview({ className = '' }: MarketOverviewProps) {
  const initialIndex = getNepseIndex();
  const { indexData } = useRealTimeIndex(initialIndex.value, initialIndex.change, initialIndex.changePercent);
  const [timeRange, setTimeRange] = React.useState<'1D' | '1W' | '1M' | '3M' | '6M' | '1Y'>('1M');
  const [chartData, setChartData] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    // Get historical data based on selected time range
    const days = 
      timeRange === '1D' ? 1 : 
      timeRange === '1W' ? 7 : 
      timeRange === '1M' ? 30 : 
      timeRange === '3M' ? 90 : 
      timeRange === '6M' ? 180 : 365;
    
    const historicalData = generateHistoricalData(days);
    
    // Format data for chart
    const formattedData = historicalData.timestamp.map((time, index) => {
      return {
        date: new Date(time * 1000).toLocaleDateString(),
        value: historicalData.close[index]
      };
    });
    
    setChartData(formattedData);
  }, [timeRange]);

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#1A2B4A]">NEPSE Index</h2>
        <div className="flex space-x-2">
          {(['1D', '1W', '1M', '3M', '6M', '1Y'] as const).map((range) => (
            <button
              key={range}
              className={`px-2 py-1 text-xs rounded ${
                timeRange === range
                  ? 'bg-[#1A2B4A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-baseline mb-4">
        <span className="text-2xl font-bold mr-2">{indexData.value.toFixed(2)}</span>
        <span className={`text-sm font-medium ${
          indexData.change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {indexData.change >= 0 ? '+' : ''}{indexData.change.toFixed(2)} 
          ({indexData.changePercent.toFixed(2)}%)
        </span>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }} 
              tickFormatter={(value) => {
                if (timeRange === '1D') return value.split(',')[1];
                if (timeRange === '1W') return value.split(',')[0];
                return value;
              }}
            />
            <YAxis 
              domain={['dataMin - 10', 'dataMax + 10']} 
              tick={{ fontSize: 10 }} 
              width={40}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)}`, 'NEPSE']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={indexData.change >= 0 ? "#00C853" : "#FF3D00"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
