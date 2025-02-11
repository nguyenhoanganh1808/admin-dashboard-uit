import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function StatCard({
  title,
  value,
  percentage,
  icon
}: {
  title: string;
  value: string;
  percentage: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{percentage}</p>
      </CardContent>
    </Card>
  );
}
