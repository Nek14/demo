'use client';

import React from 'react';
import Header from '@/components/Header';
import MarketOverview from '@/components/MarketOverview';
import StockTable from '@/components/StockTable';
import SectorPerformance from '@/components/SectorPerformance';
import MarketSummary from '@/components/MarketSummary';
import Footer from '@/components/Footer';
import { useStocks } from '@/hooks/useStocks';
import { useRealTimeStocks, formatTimeSinceUpdate } from '@/hooks/useRealTimeUpdates';
import { getNepseIndex, getMarketSectors } from '@/lib/api/marketData';

export default function HomePage() {
  const { stocks: initialStocks, loading } = useStocks();
  const { stocks, lastUpdated } = useRealTimeStocks(initialStocks);
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-[#1A2B4A]">Nepal Stock Exchange</h1>
          <div className="text-sm text-gray-500">
            Last updated: {formatTimeSinceUpdate(lastUpdated)}
          </div>
        </div>
        
        <div className="mb-6">
          <MarketOverview className="w-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <SectorPerformance className="h-full" />
          </div>
          <div className="md:col-span-1">
            <MarketSummary stocks={stocks} className="h-full" />
          </div>
        </div>
        
        <div>
          <StockTable stocks={stocks} loading={loading} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
