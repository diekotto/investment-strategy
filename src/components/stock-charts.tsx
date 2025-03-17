// src/components/stock-charts.tsx
import { useState } from 'react';
import { 
  Chart, 
  ChartArea, 
  ChartLine, 
  ChartXAxis, 
  ChartYAxis, 
  ChartTooltip, 
  ChartLegend,
  ChartLineContainer,
  ChartAreaContainer
} from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StockData } from '@/lib/types';
import { generateHistoricalData } from '@/lib/mock-data';

interface StockChartsProps {
  stocks: StockData[];
}

export default function StockCharts({ stocks }: StockChartsProps) {
  const [selectedStock, setSelectedStock] = useState(stocks[0].ticker);
  const stock = stocks.find((s) => s.ticker === selectedStock) || stocks[0];
  const historicalData = generateHistoricalData(stock);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-medium">Historical Price (Last 12 Months)</h3>
        <Select value={selectedStock} onValueChange={setSelectedStock}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select stock" />
          </SelectTrigger>
          <SelectContent>
            {stocks.map((stock) => (
              <SelectItem key={stock.ticker} value={stock.ticker}>
                {stock.ticker} - {stock.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px] w-full">
        <Chart className="h-full">
          <ChartLineContainer data={historicalData}>
            <ChartLine dataKey="price" name="Price" strokeWidth={2} dot={false} />
            <ChartXAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short' });
              }}
            />
            <ChartYAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border rounded-md shadow-sm p-2">
                      <p className="font-medium">{new Date(data.date).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">Price: ${data.price.toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ChartAreaContainer>
              <ChartArea
                dataKey="price"
                fill="hsl(var(--chart-1) / 0.2)"
                stroke="transparent"
              />
            </ChartAreaContainer>
            <ChartLegend />
          </ChartLineContainer>
        </Chart>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Portfolio Performance</h3>
        <div className="h-[400px] w-full">
          <Chart className="h-full">
            <ChartLineContainer data={generateHistoricalData(stocks[0], true)}>
              {stocks.slice(0, 5).map((stock, index) => (
                <ChartLine
                  key={stock.ticker}
                  data={generateHistoricalData(stock, true)}
                  dataKey="price"
                  name={stock.ticker}
                  strokeWidth={2}
                  dot={false}
                  stroke={`hsl(var(--chart-${index + 1}))`}
                />
              ))}
              <ChartXAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short' });
                }}
              />
              <ChartYAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <ChartTooltip />
              <ChartLegend />
            </ChartLineContainer>
          </Chart>
        </div>
      </div>
    </div>
  );
}
