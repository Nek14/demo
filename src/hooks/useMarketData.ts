import { useEffect, useState } from 'react';
import { 
  getNepseIndex, 
  isMarketOpen, 
  getNextMarketOpenTime,
  getMarketSectors,
  calculateMarketSummary,
  MarketSummary
} from '@/lib/api/marketData';
import { StockData } from '@/lib/api/yahooFinance';

// Custom hook for NEPSE index data
export function useNepseIndex() {
  const [indexData, setIndexData] = useState(getNepseIndex());
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  useEffect(() => {
    const updateIndex = () => {
      setIndexData(getNepseIndex());
      setLastUpdated(new Date());
    };
    
    // Update immediately
    updateIndex();
    
    // Set up polling for real-time updates (every 30 seconds)
    const intervalId = setInterval(updateIndex, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return { indexData, lastUpdated };
}

// Custom hook for market status
export function useMarketStatus() {
  const [isOpen, setIsOpen] = useState(isMarketOpen());
  const [nextOpenTime, setNextOpenTime] = useState(getNextMarketOpenTime());
  
  useEffect(() => {
    const checkMarketStatus = () => {
      setIsOpen(isMarketOpen());
      setNextOpenTime(getNextMarketOpenTime());
    };
    
    // Check immediately
    checkMarketStatus();
    
    // Check every minute
    const intervalId = setInterval(checkMarketStatus, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return { isOpen, nextOpenTime };
}

// Custom hook for sector performance
export function useSectorPerformance() {
  const [sectors, setSectors] = useState(getMarketSectors());
  
  useEffect(() => {
    const updateSectors = () => {
      setSectors(getMarketSectors());
    };
    
    // Update immediately
    updateSectors();
    
    // Update every 5 minutes
    const intervalId = setInterval(updateSectors, 300000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return sectors;
}

// Custom hook for market summary
export function useMarketSummary(stocks: StockData[]) {
  const [summary, setSummary] = useState<MarketSummary | null>(null);
  
  useEffect(() => {
    if (stocks.length > 0) {
      setSummary(calculateMarketSummary(stocks));
    }
  }, [stocks]);
  
  return summary;
}
