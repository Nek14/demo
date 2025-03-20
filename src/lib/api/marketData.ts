import { StockData, getNepseIndexData, generateHistoricalData } from '@/lib/api/yahooFinance';

// Types for market data
export interface MarketSummary {
  totalVolume: number;
  totalTurnover: number;
  advancers: number;
  decliners: number;
  unchanged: number;
  topGainers: StockData[];
  topLosers: StockData[];
}

// Function to calculate market summary from stock data
export function calculateMarketSummary(stocks: StockData[]): MarketSummary {
  // Calculate total volume and turnover
  const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
  const totalTurnover = stocks.reduce((sum, stock) => sum + (stock.price * stock.volume), 0);
  
  // Count advancers, decliners, and unchanged
  const advancers = stocks.filter(stock => stock.change > 0).length;
  const decliners = stocks.filter(stock => stock.change < 0).length;
  const unchanged = stocks.filter(stock => stock.change === 0).length;
  
  // Get top gainers (by percentage)
  const topGainers = [...stocks]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5);
  
  // Get top losers (by percentage)
  const topLosers = [...stocks]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5);
  
  return {
    totalVolume,
    totalTurnover,
    advancers,
    decliners,
    unchanged,
    topGainers,
    topLosers
  };
}

// Function to get NEPSE index data
export function getNepseIndex() {
  return getNepseIndexData();
}

// Function to get historical data for NEPSE index
export function getNepseHistoricalData(days: number = 30) {
  return generateHistoricalData(days);
}

// Function to check if market is open
export function isMarketOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Convert to Nepal time (UTC+5:45)
  const nepalHours = (hours + 5) % 24;
  const nepalMinutes = (minutes + 45) % 60;
  if (nepalMinutes >= 60) {
    nepalHours += 1;
  }
  
  // Market is open Sunday to Thursday (0 = Sunday, 4 = Thursday in JS)
  // Trading hours: 11:00 AM to 3:00 PM Nepal time
  const isWeekday = day >= 0 && day <= 4;
  const isOpenHours = 
    (nepalHours > 11 || (nepalHours === 11 && nepalMinutes >= 0)) && 
    (nepalHours < 15 || (nepalHours === 15 && nepalMinutes === 0));
  
  return isWeekday && isOpenHours;
}

// Function to get next market open time
export function getNextMarketOpenTime(): Date {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Convert to Nepal time (UTC+5:45)
  const nepalHours = (hours + 5) % 24;
  const nepalMinutes = (minutes + 45) % 60;
  
  const nextOpenDate = new Date(now);
  
  // If it's after market hours on a weekday
  if (day >= 0 && day <= 3 && (nepalHours > 15 || (nepalHours === 15 && nepalMinutes > 0))) {
    // Next day at 11:00 AM
    nextOpenDate.setDate(nextOpenDate.getDate() + 1);
    nextOpenDate.setHours(11 - 5, 0 - 45, 0, 0); // Convert from Nepal time to UTC
    if (nextOpenDate.getMinutes() < 0) {
      nextOpenDate.setHours(nextOpenDate.getHours() - 1);
      nextOpenDate.setMinutes(60 + nextOpenDate.getMinutes());
    }
  } 
  // If it's after market hours on Thursday
  else if (day === 4 && (nepalHours > 15 || (nepalHours === 15 && nepalMinutes > 0))) {
    // Next Sunday at 11:00 AM
    nextOpenDate.setDate(nextOpenDate.getDate() + 3);
    nextOpenDate.setHours(11 - 5, 0 - 45, 0, 0); // Convert from Nepal time to UTC
    if (nextOpenDate.getMinutes() < 0) {
      nextOpenDate.setHours(nextOpenDate.getHours() - 1);
      nextOpenDate.setMinutes(60 + nextOpenDate.getMinutes());
    }
  }
  // If it's weekend (Friday or Saturday)
  else if (day === 5 || day === 6) {
    // Next Sunday at 11:00 AM
    nextOpenDate.setDate(nextOpenDate.getDate() + (7 - day));
    nextOpenDate.setHours(11 - 5, 0 - 45, 0, 0); // Convert from Nepal time to UTC
    if (nextOpenDate.getMinutes() < 0) {
      nextOpenDate.setHours(nextOpenDate.getHours() - 1);
      nextOpenDate.setMinutes(60 + nextOpenDate.getMinutes());
    }
  }
  // If it's before market hours on a weekday
  else if ((day >= 0 && day <= 4) && (nepalHours < 11 || (nepalHours === 11 && nepalMinutes < 0))) {
    // Same day at 11:00 AM
    nextOpenDate.setHours(11 - 5, 0 - 45, 0, 0); // Convert from Nepal time to UTC
    if (nextOpenDate.getMinutes() < 0) {
      nextOpenDate.setHours(nextOpenDate.getHours() - 1);
      nextOpenDate.setMinutes(60 + nextOpenDate.getMinutes());
    }
  }
  
  return nextOpenDate;
}

// Function to get market sectors (simulated)
export function getMarketSectors() {
  return [
    { id: 'banking', name: 'Banking', change: Math.random() * 4 - 2 },
    { id: 'hydropower', name: 'Hydropower', change: Math.random() * 4 - 2 },
    { id: 'insurance', name: 'Insurance', change: Math.random() * 4 - 2 },
    { id: 'microfinance', name: 'Microfinance', change: Math.random() * 4 - 2 },
    { id: 'investment', name: 'Investment', change: Math.random() * 4 - 2 },
    { id: 'manufacturing', name: 'Manufacturing', change: Math.random() * 4 - 2 },
    { id: 'hotels', name: 'Hotels', change: Math.random() * 4 - 2 },
    { id: 'trading', name: 'Trading', change: Math.random() * 4 - 2 },
    { id: 'others', name: 'Others', change: Math.random() * 4 - 2 }
  ];
}
