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
import { Student } from '@/types/db';

import api from '@/services/api';
export async function LecturersTable({
  totalPages,
  currentPage
}: {
  totalPages: number;
  currentPage: number;
}) {
  let studentsPerPage = 5;

  const response = await api.get('/users/all-users', {
    params: {
      role: 'STUDENT',
      page: currentPage - 1,
      size: studentsPerPage,
      sortBy: 'username',
      sortDir: 'asc',
      forceFirstAndLastRels: true
    }
  });
  const students: Student[] = response.data._embedded.userResponseList;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>
          Manage your students and view their sales performance.
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
                Student Code
              </TableHead>
              <TableHead className="hidden md:table-cell">Major</TableHead>
              <TableHead className="hidden md:table-cell">Class</TableHead>
              <TableHead className="hidden md:table-cell">
                Year of Admission
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <StudentRow key={student.id} student={student} />
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
