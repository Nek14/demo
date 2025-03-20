'use client';

import React from 'react';
import { useMarketSummary } from '@/hooks/useMarketData';
import { StockData } from '@/lib/api/yahooFinance';

interface MarketSummaryProps {
  stocks: StockData[];
  className?: string;
}

export default function MarketSummary({ stocks, className = '' }: MarketSummaryProps) {
  const summary = useMarketSummary(stocks);
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return num?.toLocaleString('en-US') || '0';
  };

  // Format currency
  const formatCurrency = (num: number) => {
    return `₹${(num || 0).toFixed(2)}`;
  };

  if (!summary) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        <h2 className="text-lg font-semibold text-[#1A2B4A] mb-4">Market Summary</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A2B4A]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <h2 className="text-lg font-semibold text-[#1A2B4A] mb-4">Market Summary</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Total Volume</p>
          <p className="text-lg font-medium">{formatNumber(summary.totalVolume)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Turnover</p>
          <p className="text-lg font-medium">{formatCurrency(summary.totalTurnover)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Advancers</p>
          <p className="text-lg font-medium text-green-600">{summary.advancers}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Decliners</p>
          <p className="text-lg font-medium text-red-600">{summary.decliners}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-md font-medium text-[#1A2B4A] mb-2">Top Gainers</h3>
        <div className="space-y-2">
          {summary.topGainers.map((stock) => (
            <div key={stock.symbol} className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <span className="font-medium text-[#1A2B4A] mr-2">{stock.symbol.replace('.NP', '')}</span>
                <span className="text-gray-600 truncate max-w-[150px]">{stock.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-mono mr-2">{formatCurrency(stock.price)}</span>
                <span className="font-mono text-green-600">+{stock.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-md font-medium text-[#1A2B4A] mb-2">Top Losers</h3>
        <div className="space-y-2">
          {summary.topLosers.map((stock) => (
            <div key={stock.symbol} className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <span className="font-medium text-[#1A2B4A] mr-2">{stock.symbol.replace('.NP', '')}</span>
                <span className="text-gray-600 truncate max-w-[150px]">{stock.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-mono mr-2">{formatCurrency(stock.price)}</span>
                <span className="font-mono text-red-600">{stock.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
