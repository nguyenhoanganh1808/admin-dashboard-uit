import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';

export default function UsersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Tabs defaultValue="ADMIN">
      <div className="flex items-center">
        <TabsList className="flex">
          <TabsTrigger value="ADMIN">Admin</TabsTrigger>
          <TabsTrigger value="STUDENT">Student</TabsTrigger>
          <TabsTrigger value="LECTURER">Lecturer</TabsTrigger>
          <TabsTrigger value="ORGANIZER">Organizer</TabsTrigger>
          <TabsTrigger value="MEMBER">Member</TabsTrigger>
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

      {children}
    </Tabs>
  );
}
