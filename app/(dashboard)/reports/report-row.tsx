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
import { Loader2, MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Report } from '@/types/db';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import { Checkbox } from '@/components/ui/checkbox';
import { resolveReport, warnReport } from './actions';

export function ReportRow({ report }: { report: Report }) {
  console.log(report);
  const { reportedBy, reason, adminNotes, status, post } = report;

  return (
    <TableRow>
      <TableCell>{post.textContent}</TableCell>
      <TableCell>
        <Badge
          variant={status === 'PENDING' ? 'outline' : 'default'}
          className="capitalize"
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {reportedBy.username}
      </TableCell>
      <TableCell className="hidden md:table-cell">{reason}</TableCell>
      <TableCell className="hidden md:table-cell">{adminNotes}</TableCell>

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
            <Dialog>
              <DialogTrigger className="text-sm hover:bg-slate-200 w-full text-left rounded-md py-2 pl-3">
                Resolve
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="space-y-5">
                  <DialogTitle>Handle this report</DialogTitle>
                  <form action={resolveReport}>
                    <DialogDescription className="space-y-3 flex-col">
                      <input
                        type="hidden"
                        name="id"
                        value={report.id}
                        required
                      />
                      <Textarea name="adminNotes" placeholder="Notes" />
                      <div className="flex items-center gap-2">
                        <Checkbox id="removePost" name="removePost" />
                        <label
                          htmlFor="removePost"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remove this post?
                        </label>
                      </div>
                      <Button type="submit">
                        {false && <Loader2 className="animate-spin" />}
                        Submit
                      </Button>
                    </DialogDescription>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* <DropdownMenuItem></DropdownMenuItem> */}
            <DropdownMenuItem>
              <form action={warnReport}>
                <input type="hidden" name="id" value={report.id} />
                <button className="px-2" type="submit">
                  Warn
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
