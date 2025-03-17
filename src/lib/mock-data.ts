import type { StockData, HistoricalDataPoint } from './types';

// Mock portfolio data
export const mockPortfolioData = {
  totalValue: 250000,
  ytdReturn: 12.4,
  categories: [
    { name: 'Cloud Infrastructure Leaders', value: 75000, percentage: 30, color: 'hsl(var(--chart-1))' },
    { name: 'Next-Gen Tech', value: 50000, percentage: 20, color: 'hsl(var(--chart-2))' },
    { name: 'FinTech & Digital Payments', value: 37500, percentage: 15, color: 'hsl(var(--chart-3))' },
    { name: 'Cybersecurity', value: 25000, percentage: 10, color: 'hsl(var(--chart-4))' },
    { name: 'Semiconductor & Hardware', value: 25000, percentage: 10, color: 'hsl(var(--chart-5))' },
    { name: 'Traditional Tech', value: 25000, percentage: 10, color: 'hsl(var(--chart-6))' },
    { name: 'Non-Tech Diversification', value: 12500, percentage: 5, color: 'hsl(var(--chart-7))' },
  ],
  stocks: [
    {
      name: 'Amazon',
      ticker: 'AMZN',
      category: 'Cloud Infrastructure Leaders',
      currentPrice: 178.75,
      change: 1.24,
      allocation: 10,
      value: 25000,
    },
    {
      name: 'Microsoft',
      ticker: 'MSFT',
      category: 'Cloud Infrastructure Leaders',
      currentPrice: 420.35,
      change: 0.87,
      allocation: 8,
      value: 20000,
    },
    {
      name: 'Alphabet',
      ticker: 'GOOGL',
      category: 'Cloud Infrastructure Leaders',
      currentPrice: 165.92,
      change: -0.32,
      allocation: 7,
      value: 17500,
    },
    {
      name: 'Oracle',
      ticker: 'ORCL',
      category: 'Cloud Infrastructure Leaders',
      currentPrice: 125.48,
      change: 0.56,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'NVIDIA',
      ticker: 'NVDA',
      category: 'Next-Gen Tech',
      currentPrice: 950.02,
      change: 2.15,
      allocation: 8,
      value: 20000,
    },
    {
      name: 'Palantir',
      ticker: 'PLTR',
      category: 'Next-Gen Tech',
      currentPrice: 24.35,
      change: -1.23,
      allocation: 6,
      value: 15000,
    },
    {
      name: 'Snowflake',
      ticker: 'SNOW',
      category: 'Next-Gen Tech',
      currentPrice: 145.78,
      change: 0.45,
      allocation: 6,
      value: 15000,
    },
    {
      name: 'PayPal',
      ticker: 'PYPL',
      category: 'FinTech & Digital Payments',
      currentPrice: 65.42,
      change: -0.78,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'Square',
      ticker: 'SQ',
      category: 'FinTech & Digital Payments',
      currentPrice: 72.15,
      change: 1.05,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'Visa',
      ticker: 'V',
      category: 'FinTech & Digital Payments',
      currentPrice: 275.3,
      change: 0.32,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'CrowdStrike',
      ticker: 'CRWD',
      category: 'Cybersecurity',
      currentPrice: 320.45,
      change: 1.87,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'Palo Alto Networks',
      ticker: 'PANW',
      category: 'Cybersecurity',
      currentPrice: 345.2,
      change: 0.92,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'Taiwan Semiconductor',
      ticker: 'TSM',
      category: 'Semiconductor & Hardware',
      currentPrice: 152.75,
      change: 1.45,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'AMD',
      ticker: 'AMD',
      category: 'Semiconductor & Hardware',
      currentPrice: 175.85,
      change: 2.34,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'Apple',
      ticker: 'AAPL',
      category: 'Traditional Tech',
      currentPrice: 195.25,
      change: 0.25,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'Cisco',
      ticker: 'CSCO',
      category: 'Traditional Tech',
      currentPrice: 48.75,
      change: -0.45,
      allocation: 5,
      value: 12500,
    },
    {
      name: 'Berkshire Hathaway',
      ticker: 'BRK.B',
      category: 'Non-Tech Diversification',
      currentPrice: 415.65,
      change: 0.15,
      allocation: 3,
      value: 7500,
    },
    {
      name: 'Johnson & Johnson',
      ticker: 'JNJ',
      category: 'Non-Tech Diversification',
      currentPrice: 152.35,
      change: -0.25,
      allocation: 2,
      value: 5000,
    },
  ],
};

// Generate mock historical data for a stock
export function generateHistoricalData(stock: StockData, isComparison = false): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = [];
  const today = new Date();
  const startPrice = isComparison ? 100 : stock.currentPrice * (1 - Math.random() * 0.3);

  // Generate data for the last 12 months
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (365 - i));

    // Create some volatility in the price
    const volatility = isComparison ? 0.002 : 0.005;
    const randomChange = (Math.random() - 0.5) * volatility * startPrice;

    // Add some trends
    const trendFactor = isComparison
      ? stock.ticker === 'NVDA'
        ? 0.0015
        : stock.ticker === 'AMZN'
          ? 0.0008
          : stock.ticker === 'MSFT'
            ? 0.001
            : stock.ticker === 'GOOGL'
              ? 0.0005
              : 0.0003
      : 0.0005;

    const trend = i * trendFactor * startPrice;

    // Calculate price for this day
    let price;
    if (i === 0) {
      price = startPrice;
    } else {
      price = data[i - 1].price + randomChange + trend / 365;

      // Add some market events
      if (i === 90) price *= 0.95; // Small market correction
      if (i === 180) price *= 1.07; // Rally
      if (i === 270) price *= 0.98; // Small dip
    }

    // Ensure price doesn't go negative
    price = Math.max(price, startPrice * 0.5);

    // For comparison charts, normalize to percentage change from start
    if (isComparison) {
      price = 100 * (price / startPrice);
    }

    data.push({
      date: date.toISOString(),
      price: price,
    });
  }

  return data;
}
