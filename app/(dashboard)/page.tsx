import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostsTable } from './posts-table';
import api from '@/services/api-server';
import Link from 'next/link';

export default async function PostsPage(props: {
  searchParams: Promise<{ q: string; page: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  const postsPerPage = 5;

  const response = await api.get('/admin/getPendingPosts', {
    params: {
      page: page - 1,
      size: postsPerPage
    }
  });

  const posts = response.data;
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button> */}
          <Link href="posts/create">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Post
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="all">
        <PostsTable posts={posts} page={page} totalPosts={10} />
      </TabsContent>
    </Tabs>
  );
}
