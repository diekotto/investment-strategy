export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface StockData {
  name: string;
  ticker: string;
  category: string;
  currentPrice: number;
  change: number;
  allocation: number;
  value: number;
}

export interface HistoricalDataPoint {
  date: string;
  price: number;
}
