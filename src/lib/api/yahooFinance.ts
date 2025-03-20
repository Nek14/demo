// Simulated data module for testing
// No external API dependencies

// Define types for stock data
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  marketCap: number;
  currency: string;
}

export interface StockChartData {
  timestamp: number[];
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
  adjclose?: number[];
}

// Function to fetch stock chart data (simulated)
export async function getStockChartData(symbol: string, interval: string = '1d', range: string = '1mo'): Promise<StockChartData | null> {
  try {
    // Return simulated data instead of making API call
    return generateHistoricalData(30);
  } catch (error) {
    console.error('Error generating stock chart data:', error);
    return null;
  }
}

// Function to fetch stock profile data (simulated)
export async function getStockProfile(symbol: string): Promise<any | null> {
  try {
    // Return simulated profile data
    return {
      address1: "Kathmandu",
      city: "Kathmandu",
      country: "Nepal",
      phone: "+977-1-4444444",
      website: "https://example.com",
      industry: "Banking",
      sector: "Financial Services",
      longBusinessSummary: "This is a simulated business summary for a Nepalese company.",
      fullTimeEmployees: 1000 + Math.floor(Math.random() * 5000)
    };
  } catch (error) {
    console.error('Error generating stock profile data:', error);
    return null;
  }
}

// Function to format stock data (simulated)
export function formatStockData(symbol: string, name: string, chartData: any): StockData | null {
  // Generate simulated stock data directly
  const basePrice = Math.floor(Math.random() * 900) + 100;
  const changePercent = (Math.random() * 10) - 5;
  const change = basePrice * (changePercent / 100);
  
  return {
    symbol,
    name,
    price: basePrice,
    change,
    changePercent,
    open: basePrice - (Math.random() * 10),
    high: basePrice + (Math.random() * 15),
    low: basePrice - (Math.random() * 15),
    volume: Math.floor(Math.random() * 9000) + 1000,
    marketCap: (Math.floor(Math.random() * 99) + 1) * 1000000000,
    currency: 'NPR'
  };
}

// List of Nepal stock symbols (based on research)
export const nepalStockSymbols = [
  { symbol: 'NABIL.NP', name: 'Nabil Bank Limited' },
  { symbol: 'ADBL.NP', name: 'Agricultural Development Bank Limited' },
  { symbol: 'NMB.NP', name: 'NMB Bank Limited' },
  { symbol: 'SBL.NP', name: 'Siddhartha Bank Limited' },
  { symbol: 'KBL.NP', name: 'Kumari Bank Limited' },
  { symbol: 'MBL.NP', name: 'Machhapuchchhre Bank Limited' },
  { symbol: 'EBL.NP', name: 'Everest Bank Limited' },
  { symbol: 'SBI.NP', name: 'Nepal SBI Bank Limited' },
  { symbol: 'HBL.NP', name: 'Himalayan Bank Limited' },
  { symbol: 'SCB.NP', name: 'Standard Chartered Bank Nepal Limited' },
  { symbol: 'CZBIL.NP', name: 'Citizens Bank International Limited' },
  { symbol: 'PCBL.NP', name: 'Prime Commercial Bank Limited' },
  { symbol: 'SANIMA.NP', name: 'Sanima Bank Limited' },
  { symbol: 'NBL.NP', name: 'Nepal Bank Limited' },
  { symbol: 'GBIME.NP', name: 'Global IME Bank Limited' },
  { symbol: 'NICA.NP', name: 'NIC Asia Bank Limited' },
  { symbol: 'BBC.NP', name: 'Bishal Bazar Company Limited' },
  { symbol: 'NRIC.NP', name: 'Nepal Reinsurance Company Limited' },
  { symbol: 'NTC.NP', name: 'Nepal Doorsanchar Company Limited' }
];

// Function to fetch data for all Nepal stocks (simulated)
export async function getAllNepalStocks(): Promise<StockData[]> {
  const stocksData: StockData[] = [];
  
  // Generate simulated data for all Nepal stocks
  for (const stock of nepalStockSymbols) {
    stocksData.push(generateSimulatedStockData(stock.symbol, stock.name));
  }
  
  return stocksData;
}

// Function to generate simulated stock data when real data is not available
function generateSimulatedStockData(symbol: string, name: string): StockData {
  // Base price between 100 and 1000
  const basePrice = Math.floor(Math.random() * 900) + 100;
  
  // Random change between -5% and +5%
  const changePercent = (Math.random() * 10) - 5;
  const change = basePrice * (changePercent / 100);
  
  // Calculate other values based on the base price
  const price = basePrice;
  const open = basePrice - (Math.random() * 10);
  const high = price + (Math.random() * 15);
  const low = price - (Math.random() * 15);
  
  // Random volume between 1000 and 10000
  const volume = Math.floor(Math.random() * 9000) + 1000;
  
  // Random market cap between 1B and 100B
  const marketCap = (Math.floor(Math.random() * 99) + 1) * 1000000000;
  
  return {
    symbol,
    name,
    price,
    change,
    changePercent,
    open,
    high,
    low,
    volume,
    marketCap,
    currency: 'NPR'
  };
}

// Function to get NEPSE index data (simulated)
export function getNepseIndexData(): { 
  value: number; 
  change: number; 
  changePercent: number;
  timestamp: number;
} {
  // Base value around 2700 (based on research)
  const baseValue = 2743.74;
  
  // Random change between -1% and +1%
  const changePercent = (Math.random() * 2) - 1;
  const change = baseValue * (changePercent / 100);
  
  return {
    value: baseValue + change,
    change,
    changePercent,
    timestamp: Date.now()
  };
}

// Function to generate simulated historical data for charts
export function generateHistoricalData(days: number = 30): StockChartData {
  const timestamp: number[] = [];
  const open: number[] = [];
  const high: number[] = [];
  const low: number[] = [];
  const close: number[] = [];
  const volume: number[] = [];
  
  // Base price between 100 and 1000
  let basePrice = Math.floor(Math.random() * 900) + 100;
  
  // Generate data for each day
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    timestamp.push(Math.floor(date.getTime() / 1000));
    
    // Random change between -3% and +3%
    const change = basePrice * ((Math.random() * 6) - 3) / 100;
    
    const dayOpen = basePrice;
    const dayClose = basePrice + change;
    const dayHigh = Math.max(dayOpen, dayClose) + (Math.random() * 10);
    const dayLow = Math.min(dayOpen, dayClose) - (Math.random() * 10);
    const dayVolume = Math.floor(Math.random() * 9000) + 1000;
    
    open.push(dayOpen);
    close.push(dayClose);
    high.push(dayHigh);
    low.push(dayLow);
    volume.push(dayVolume);
    
    // Update base price for next day
    basePrice = dayClose;
  }
  
  return {
    timestamp,
    open,
    high,
    low,
    close,
    volume
  };
}
