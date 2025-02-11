'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

interface ChartData {
  name: string;
  count: number;
  fill?: string;
}

export interface EngagementDistributionProps {
  chartData: ChartData[];
}
// const chartData = [
//   { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
//   { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
//   { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
//   { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
//   { browser: 'other', visitors: 90, fill: 'var(--color-other)' }
// ];

const chartConfig = {
  count: {
    label: 'Count'
  },
  comments: {
    label: 'Comments',
    color: 'hsl(var(--chart-1))'
  },
  likes: {
    label: 'Likes',
    color: 'hsl(var(--chart-2))'
  },
  posts: {
    label: 'Posts',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig;

export function EngagementDistribution({
  chartData
}: EngagementDistributionProps) {
  return (
    <Card className="flex flex-col border-none outline-none shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" label nameKey="name" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing engagement data for the selected period
        </div>
      </CardFooter>
    </Card>
  );
}
