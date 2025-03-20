import { useState, useEffect } from 'react';
import { StockData, getAllNepalStocks } from '@/lib/api/yahooFinance';

// Custom hook for fetching all Nepal stocks
export function useStocks() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStocks() {
      try {
        setLoading(true);
        const data = await getAllNepalStocks();
        setStocks(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching stocks:', err);
        setError('Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    }

    fetchStocks();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(fetchStocks, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);

  return { stocks, loading, error };
}

// Custom hook for real-time updates
export function useRealTimeUpdates<T>(
  fetchFunction: () => Promise<T>,
  initialData: T,
  interval: number = 60000 // Default: update every minute
) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await fetchFunction();
        setData(result);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to update data');
      } finally {
        setLoading(false);
      }
    }

    // Initial fetch
    fetchData();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(fetchData, interval);
    
    return () => clearInterval(intervalId);
  }, [fetchFunction, interval]);

  return { data, loading, error, lastUpdated };
}

// Custom hook for sorting and filtering stocks
export function useSortedStocks(stocks: StockData[], sortBy: keyof StockData = 'marketCap', sortDirection: 'asc' | 'desc' = 'desc') {
  return [...stocks].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });
}

// Custom hook for filtering stocks by sector or search term
export function useFilteredStocks(stocks: StockData[], searchTerm: string = '', sector: string = '') {
  return stocks.filter(stock => {
    const matchesSearch = searchTerm === '' || 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Note: In a real implementation, we would have sector information
    // For now, we'll just filter by search term
    return matchesSearch;
  });
}
