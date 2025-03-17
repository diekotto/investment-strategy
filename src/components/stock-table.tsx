import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { StockData } from '@/lib/types';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface StockTableProps {
  stocks: StockData[];
}

export default function StockTable({ stocks }: StockTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Ticker</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Allocation</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.ticker}>
              <TableCell className="font-medium">{stock.name}</TableCell>
              <TableCell>{stock.ticker}</TableCell>
              <TableCell>
                <Badge variant="outline">{stock.category}</Badge>
              </TableCell>
              <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <span
                  className={`flex items-center justify-end ${stock.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}
                >
                  {stock.change >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stock.change).toFixed(2)}%
                </span>
              </TableCell>
              <TableCell className="text-right">{stock.allocation}%</TableCell>
              <TableCell className="text-right">${stock.value.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
