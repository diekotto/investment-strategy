// src/components/portfolio-allocation.tsx
import { Chart, ChartPie, ChartPieContainer, ChartLegend, ChartTooltip, ChartCell } from '@/components/ui/chart';
import { Card } from '@/components/ui/card';
import type { CategoryData } from '@/lib/types';

interface PortfolioAllocationProps {
  data: CategoryData[];
}

// Create a custom legend renderer component
const CustomLegend = (props: any) => {
  const { payload } = props;

  return (
    <ul className="recharts-default-legend" style={{ padding: 0, margin: 0, textAlign: 'left' }}>
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          className="recharts-legend-item"
          style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}
        >
          <svg
            className="recharts-surface"
            width="14"
            height="14"
            viewBox="0 0 32 32"
            style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }}
          >
            <path
              fill={entry.color}
              cx="16"
              cy="16"
              className="recharts-symbols"
              d="M16,0A16,16,0,1,1,0,16,16,16,0,0,1,16,0Z"
            />
          </svg>
          <span className="recharts-legend-item-text" style={{ color: 'currentColor' }}>
            {entry.value} ({entry.payload.percentage}%)
          </span>
        </li>
      ))}
    </ul>
  );
};

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
            isAnimationActive={true}
          >
            {data.map((_, index) => (
              <ChartCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <ChartLegend content={<CustomLegend />} layout="vertical" verticalAlign="middle" align="right" />
        </ChartPieContainer>
      </Chart>
    </div>
  );
}
