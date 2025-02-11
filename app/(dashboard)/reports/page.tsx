import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';

import api from '@/services/api-server';
import { StudentsTable } from '../users/student-table';
import { ReportTable } from './report-table';

export default async function ReportsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <Tabs defaultValue="pending">
      <div className="flex items-center">
        <TabsList className="flex">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        {/* <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div> */}
      </div>

      <TabsContent value="pending">
        <ReportTable currentPage={currentPage} type="PENDING" />
      </TabsContent>
      <TabsContent value="resolved">
        <ReportTable currentPage={currentPage} type="RESOLVED" />
      </TabsContent>
    </Tabs>
  );
}
