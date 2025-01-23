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
import type { Lecturer, Student } from '@/types/db';
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
import FormChangeUserStatus from './form-change-user-status';

const initialState = {
  id: '',
  reason: ''
};

export function LecturerRow({ lecturer }: { lecturer: Lecturer }) {
  const { username, lecturer: lecturerInfo } = lecturer;

  const {
    lecturerCode,
    profile,
    department,
    officeLocation,
    yearsOfExperience
  } = lecturerInfo;
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
            lecturer.accountStatus === 'BANNED' ? 'destructive' : 'outline'
          }
          className="capitalize"
        >
          {lecturer.accountStatus}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{username}</TableCell>
      <TableCell className="hidden md:table-cell">{gender}</TableCell>
      <TableCell className="hidden md:table-cell">{email}</TableCell>
      <TableCell className="hidden md:table-cell">{lecturerCode}</TableCell>
      <TableCell className="hidden md:table-cell">{department}</TableCell>
      <TableCell className="hidden md:table-cell">{officeLocation}</TableCell>
      <TableCell className="hidden md:table-cell">
        {yearsOfExperience}
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
            <FormChangeUserStatus user={lecturer} />

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
