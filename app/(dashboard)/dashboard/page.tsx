import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Dashboard from './dashboard';
// import { RecentSales } from "./components/recent-sales"

export default async function DashboardPage() {
  // const response = await axios.get('statistics/getstatistics', {
  //   params: {
  //     startDate,
  //     endDate,
  //   },
  // });

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <Dashboard />
      </TabsContent>
    </Tabs>
  );
}
