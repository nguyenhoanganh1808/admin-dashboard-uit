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
import type { Student } from '@/types/db';

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
        <Badge variant="outline" className="capitalize">
          {'Avaiable'}
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
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
