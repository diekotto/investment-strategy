// src/components/portfolio-allocation.tsx
import { 
  Chart, 
  ChartPie, 
  ChartPieContainer,
  ChartLegend, 
  ChartTooltip,
  ChartCell
} from '@/components/ui/chart';
import { Card } from '@/components/ui/card';
import type { CategoryData } from '@/lib/types';

interface PortfolioAllocationProps {
  data: CategoryData[];
}

export default function PortfolioAllocation({ data }: PortfolioAllocationProps) {
  // Define direct colors for the chart
  const COLORS = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#6366f1', // indigo-500
    '#ec4899', // pink-500
    '#8b5cf6', // violet-500
    '#ef4444', // red-500
    '#14b8a6', // teal-500
    '#f97316'  // orange-500
  ];

  return (
    <div className="w-full h-[350px]">
      <Chart className="h-full">
        <ChartPieContainer>
          <ChartPie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={2}
            cornerRadius={4}
          >
            {data.map((entry, index) => (
              <ChartCell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </ChartPie>
          <ChartTooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              const data = payload[0].payload;
              return (
                <Card className="p-2 shadow-md border">
                  <p className="font-medium">{data.name}</p>
                  <p className="text-sm text-muted-foreground">Allocation: {data.percentage}%</p>
                  <p className="text-sm text-muted-foreground">Value: ${data.value.toLocaleString()}</p>
                </Card>
              );
            }}
          />
          <ChartLegend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value) => {
              const item = data.find((d) => d.name === value);
              return `${value} (${item?.percentage}%)`;
            }}
          />
        </ChartPieContainer>
      </Chart>
    </div>
  );
}
