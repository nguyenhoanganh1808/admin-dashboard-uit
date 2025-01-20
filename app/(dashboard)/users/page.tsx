import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { StudentsTable } from './student-table';
import api from '@/services/api';
import { LecturersTable } from './lecturer-table';

export default async function UsersPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <Tabs defaultValue="STUDENT">
      <div className="flex items-center">
        <TabsList className="flex">
          <TabsTrigger value="STUDENT">Student</TabsTrigger>
          <TabsTrigger value="LECTURER">Lecturer</TabsTrigger>
          <TabsTrigger value="ORGANIZER">Organizer</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
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
        </div>
      </div>

      <TabsContent value="STUDENT">
        <StudentsTable currentPage={currentPage} />
      </TabsContent>
      <TabsContent value="LECTURER">
        <LecturersTable currentPage={currentPage} />
      </TabsContent>
    </Tabs>
  );
}
