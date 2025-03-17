// src/components/ui/chart.tsx
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Area, 
  AreaChart 
} from 'recharts';

// Container components
export const Chart = ResponsiveContainer;

// Chart types
export const ChartPieContainer = PieChart;
export const ChartLineContainer = LineChart;
export const ChartAreaContainer = AreaChart;

// Chart elements
export const ChartPie = Pie;
export const ChartLine = Line;
export const ChartArea = Area;
export const ChartXAxis = XAxis;
export const ChartYAxis = YAxis;
export const ChartTooltip = Tooltip;
export const ChartLegend = Legend;
