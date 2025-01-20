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
import { Lecturer, Student } from '@/types/db';

import api from '@/services/api';
import { PaginationTable } from '@/components/ui/pagination-table';
import { LecturerRow } from './lecturer-row';
export async function LecturersTable({ currentPage }: { currentPage: number }) {
  const response = await api.get('/users/all-users', {
    params: {
      role: 'LECTURER',
      page: 0,
      size: 5,
      sortBy: 'username',
      sortDir: 'asc',
      forceFirstAndLastRels: true
    }
  });
  const totalPages = response.data.page.totalPages;
  let lecturersPerPage = 5;

  const lecturers: Lecturer[] = response.data._embedded.userResponseList;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lecturers</CardTitle>
        <CardDescription>
          Manage your lecturers and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">
                Lecturer Code
              </TableHead>
              <TableHead className="hidden md:table-cell">Department</TableHead>
              <TableHead className="hidden md:table-cell">
                Office Location
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Years of Experience
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lecturers.map((lecturer) => (
              <LecturerRow key={lecturer.id} lecturer={lecturer} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            {/* <strong>
              {Math.max(
                0,
                Math.min(offset - studentsPerPage, totalStudents) + 1
              )}
              -{offset}
            </strong>{' '}
            of <strong>{totalStudents}</strong> students */}
          </div>
          <div className="flex">
            <PaginationTable totalPages={totalPages} />
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
