import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PortfolioAllocation from '@/components/portfolio-allocation';
import StockTable from '@/components/stock-table';
import StockCharts from '@/components/stock-charts';
import { mockPortfolioData } from '@/lib/mock-data';

export default function Home() {
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
              <PortfolioAllocation data={mockPortfolioData.categories} />
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Portfolio Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Value:</span>
                  <span className="font-medium">${mockPortfolioData.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Stocks:</span>
                  <span className="font-medium">{mockPortfolioData.stocks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">YTD Return:</span>
                  <span className="font-medium text-emerald-600">+{mockPortfolioData.ytdReturn}%</span>
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
            <StockTable stocks={mockPortfolioData.stocks} />
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Performance Charts</h2>
            <StockCharts stocks={mockPortfolioData.stocks} />
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
