import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

export default async function TopicsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList className="flex">
          <TabsTrigger value="pending">All</TabsTrigger>
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

      <TabsContent value="all">hehe</TabsContent>
    </Tabs>
  );
}
