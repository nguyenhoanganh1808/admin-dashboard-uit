'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis
} from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

interface ChartData {
  topic: string;
  post: number;
}

export interface OverviewProps {
  chartData: ChartData[];
}

const chartConfig = {
  post: {
    label: 'Post',
    color: 'hsl(var(--chart-1))'
  },

  label: {
    color: 'hsl(var(--background))'
  }
} satisfies ChartConfig;

export function Overview({ chartData }: OverviewProps) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="topic"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="post" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="post"
          layout="vertical"
          fill="var(--color-desktop)"
          radius={4}
        >
          <LabelList
            dataKey="topic"
            position="insideLeft"
            offset={8}
            className="fill-[--color-label]"
            fontSize={11}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
