'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Post as PostType } from '@/types/db';
// import { SelectProduct } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post } from './post';
import { PaginationTable } from '@/components/ui/pagination-table';

export function PostsTable({
  posts,
  page,
  totalPosts
}: {
  posts: PostType[];
  page: number;
  totalPosts: number;
}) {
  let router = useRouter();
  let postsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?page=${page}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts</CardTitle>
        <CardDescription>
          Manage your posts and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-end w-full justify-between">
          <PaginationTable totalPages={1} />
        </form>
      </CardFooter>
    </Card>
  );
}
