// src/components/portfolio-allocation.tsx
import { 
  Chart, 
  ChartPie, 
  ChartPieContainer,
  ChartLegend, 
  ChartTooltip 
} from '@/components/ui/chart';
import { Card } from '@/components/ui/card';
import type { CategoryData } from '@/lib/types';

interface PortfolioAllocationProps {
  data: CategoryData[];
}

export default function PortfolioAllocation({ data }: PortfolioAllocationProps) {
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
          />
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
