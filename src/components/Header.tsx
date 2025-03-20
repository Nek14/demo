'use client';

import React from 'react';
import { useMarketStatus } from '@/hooks/useMarketData';
import { useRealTimeIndex } from '@/hooks/useRealTimeUpdates';
import { getNepseIndex } from '@/lib/api/marketData';

export default function Header() {
  const initialIndex = getNepseIndex();
  const { indexData } = useRealTimeIndex(initialIndex.value, initialIndex.change, initialIndex.changePercent);
  const { isOpen, nextOpenTime } = useMarketStatus();
  
  // Format the next open time
  const formatNextOpenTime = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true
    };
    return nextOpenTime.toLocaleString('en-US', options);
  };

  return (
    <header className="bg-[#1A2B4A] text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">NEPSE Live</h1>
            <span className="ml-2 text-xs bg-[#FFD700] text-[#1A2B4A] px-2 py-1 rounded-md font-semibold">
              Simulation
            </span>
          </div>
          
          {/* Market Status and Index */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            {/* Current Time */}
            <div className="text-sm">
              <p className="text-gray-300">
                {new Date().toLocaleString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </p>
            </div>
            
            {/* Market Status */}
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {isOpen ? 'Market Open' : `Market Closed • Opens ${formatNextOpenTime()}`}
              </span>
            </div>
            
            {/* NEPSE Index */}
            <div className="flex items-center bg-opacity-20 bg-white px-3 py-1 rounded">
              <span className="font-bold mr-2">NEPSE</span>
              <span className="font-mono text-lg">{indexData.value.toFixed(2)}</span>
              <span className={`ml-2 text-sm font-mono ${indexData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {indexData.change >= 0 ? '+' : ''}{indexData.change.toFixed(2)} 
                ({indexData.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stocks..."
                className="bg-white bg-opacity-10 border border-gray-600 rounded-md py-1 px-3 w-full md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
