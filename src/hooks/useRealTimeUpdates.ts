'use client';

import React, { useState, useEffect } from 'react';
import { StockData } from '@/lib/api/yahooFinance';

// Custom hook for real-time stock data updates
export function useRealTimeStocks(initialStocks: StockData[]) {
  const [stocks, setStocks] = useState<StockData[]>(initialStocks);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Update initial stocks when they change
    if (initialStocks.length > 0) {
      setStocks(initialStocks);
    }
  }, [initialStocks]);

  useEffect(() => {
    // Function to simulate real-time price changes
    const simulateRealTimeChanges = () => {
      if (stocks.length === 0) return;

      const updatedStocks = stocks.map(stock => {
        // Random change between -1% and +1% of current price
        const randomFactor = (Math.random() * 2 - 1) * 0.01;
        const priceChange = stock.price * randomFactor;
        const newPrice = stock.price + priceChange;
        
        // Update change values based on new price
        const newChange = stock.change + priceChange;
        const newChangePercent = stock.changePercent + (randomFactor * 100);
        
        return {
          ...stock,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          // Randomly update volume occasionally
          volume: Math.random() > 0.7 ? stock.volume + Math.floor(Math.random() * 100) : stock.volume
        };
      });

      setStocks(updatedStocks);
      setLastUpdated(new Date());
    };

    // Set up interval for real-time updates (every 5 seconds)
    const intervalId = setInterval(simulateRealTimeChanges, 5000);
    
    return () => clearInterval(intervalId);
  }, [stocks]);

  return { stocks, lastUpdated };
}

// Custom hook for real-time NEPSE index updates
export function useRealTimeIndex(initialValue: number, initialChange: number, initialChangePercent: number) {
  const [indexData, setIndexData] = useState({
    value: initialValue,
    change: initialChange,
    changePercent: initialChangePercent,
    timestamp: Date.now()
  });
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Function to simulate real-time index changes
    const simulateIndexChanges = () => {
      // Random change between -0.1% and +0.1% of current value
      const randomFactor = (Math.random() * 2 - 1) * 0.001;
      const valueChange = indexData.value * randomFactor;
      const newValue = indexData.value + valueChange;
      
      // Update change values
      const newChange = indexData.change + valueChange;
      const newChangePercent = indexData.changePercent + (randomFactor * 100);
      
      setIndexData({
        value: newValue,
        change: newChange,
        changePercent: newChangePercent,
        timestamp: Date.now()
      });
      setLastUpdated(new Date());
    };

    // Set up interval for real-time updates (every 3 seconds)
    const intervalId = setInterval(simulateIndexChanges, 3000);
    
    return () => clearInterval(intervalId);
  }, [indexData]);

  return { indexData, lastUpdated };
}

// Custom hook for real-time sector performance updates
export function useRealTimeSectors(initialSectors: any[]) {
  const [sectors, setSectors] = useState(initialSectors);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Update initial sectors when they change
    if (initialSectors.length > 0) {
      setSectors(initialSectors);
    }
  }, [initialSectors]);

  useEffect(() => {
    // Function to simulate real-time sector changes
    const simulateSectorChanges = () => {
      if (sectors.length === 0) return;

      const updatedSectors = sectors.map(sector => {
        // Random change between -0.2% and +0.2%
        const randomChange = (Math.random() * 0.4) - 0.2;
        const newChange = sector.change + randomChange;
        
        // Keep changes within reasonable bounds (-5% to +5%)
        const boundedChange = Math.max(Math.min(newChange, 5), -5);
        
        return {
          ...sector,
          change: boundedChange
        };
      });

      setSectors(updatedSectors);
      setLastUpdated(new Date());
    };

    // Set up interval for real-time updates (every 10 seconds)
    const intervalId = setInterval(simulateSectorChanges, 10000);
    
    return () => clearInterval(intervalId);
  }, [sectors]);

  return { sectors, lastUpdated };
}

// Function to format time since last update
export function formatTimeSinceUpdate(lastUpdated: Date): string {
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
  
  if (diffSeconds < 5) {
    return 'just now';
  } else if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  } else if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return lastUpdated.toLocaleTimeString();
  }
}
