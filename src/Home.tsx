'use client';

import type React from 'react';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PortfolioAllocation from '@/components/portfolio-allocation';
import StockTable from '@/components/stock-table';
import StockCharts from '@/components/stock-charts';
import { mockPortfolioData, recalculatePortfolio } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

export default function Home() {
  const [portfolioData, setPortfolioData] = useState(mockPortfolioData);
  const [investmentAmount, setInvestmentAmount] = useState(portfolioData.totalValue.toString());
  const [tempAmount, setTempAmount] = useState(investmentAmount);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal points
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setTempAmount(value);
  };

  const updateInvestmentAmount = () => {
    const amount = Number.parseFloat(tempAmount);
    if (!isNaN(amount) && amount > 0) {
      setInvestmentAmount(tempAmount);
      const updatedPortfolio = recalculatePortfolio(amount);
      setPortfolioData(updatedPortfolio);
    } else {
      // Reset to current value if invalid
      setTempAmount(investmentAmount);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateInvestmentAmount();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6">Investment Portfolio Visualizer</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="charts">Performance Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Portfolio Allocation</h2>
              <PortfolioAllocation data={portfolioData.categories} />
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Portfolio Summary</h2>

              <div className="mb-6">
                <label htmlFor="investment-amount" className="block text-sm font-medium text-muted-foreground mb-2">
                  Investment Amount
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="investment-amount"
                      value={tempAmount}
                      onChange={handleAmountChange}
                      onBlur={updateInvestmentAmount}
                      onKeyDown={handleKeyDown}
                      className="pl-9"
                      placeholder="Enter amount to invest"
                    />
                  </div>
                  <Button onClick={updateInvestmentAmount}>Update</Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Value:</span>
                  <span className="font-medium">{formatCurrency(portfolioData.totalValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Stocks:</span>
                  <span className="font-medium">{portfolioData.stocks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">YTD Return:</span>
                  <span className="font-medium text-emerald-600">+{portfolioData.ytdReturn}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stocks">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Stock Holdings</h2>
            <StockTable stocks={portfolioData.stocks} />
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Performance Charts</h2>
            <StockCharts stocks={portfolioData.stocks} />
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
