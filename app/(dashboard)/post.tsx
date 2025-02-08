import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
// import { SelectProduct } from '@/lib/db';
// import { deleteProduct } from './actions';
import { Post as PostType } from '@/types/db';
import { approvePost, rejectPost } from './actions';

export function Post({ post }: { post: PostType }) {
  return (
    <TableRow>
      <TableCell className="font-medium max-w-80">{post.textContent}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {post.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {post.user.username}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(post.createdAt).toLocaleDateString('en-US')}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <form action={approvePost}>
                <input type="hidden" name="id" value={post.id} />
                <button type="submit">Approve</button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={rejectPost}>
                <input type="hidden" name="id" value={post.id} />
                <button type="submit">Reject</button>
              </form>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <form action={deleteProduct}>
              <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
