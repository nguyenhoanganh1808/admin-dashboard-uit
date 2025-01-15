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
import type { Student } from '@/types/db';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { banUser } from './actions';

const initialState = {
  id: '',
  reason: ''
};

export function StudentRow({ student }: { student: Student }) {
  const { username, student: studentInfo } = student;

  const { studentCode, profile, major, className, yearOfAdmission } =
    studentInfo;
  const { gender, avatarUrl, contact } = profile;
  const { email, phoneNumber } = contact;

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={avatarUrl || ''}
          width="64"
        />
      </TableCell>

      <TableCell>
        <Badge
          variant={
            student.accountStatus === 'BANNED' ? 'destructive' : 'outline'
          }
          className="capitalize"
        >
          {student.accountStatus}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{username}</TableCell>
      <TableCell className="hidden md:table-cell">{gender}</TableCell>
      <TableCell className="hidden md:table-cell">{email}</TableCell>
      <TableCell className="hidden md:table-cell">{studentCode}</TableCell>
      <TableCell className="hidden md:table-cell">{major}</TableCell>
      <TableCell className="hidden md:table-cell">{className}</TableCell>
      <TableCell className="hidden md:table-cell">{yearOfAdmission}</TableCell>
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
                Ban
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="space-y-5">
                  <DialogTitle>Reason ban this user?</DialogTitle>
                  <form className="space-y-5" action={banUser}>
                    <input
                      type="hidden"
                      name="id"
                      value={student.id}
                      required
                    />
                    <Textarea name="reason" />
                    <Button type="submit">
                      {false && <Loader2 className="animate-spin" />}
                      Ban
                    </Button>
                  </form>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* <DropdownMenuItem></DropdownMenuItem> */}
            <DropdownMenuItem>
              {/* <form action={deleteProduct}> */}
              <button type="submit">Delete</button>
              {/* </form> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
