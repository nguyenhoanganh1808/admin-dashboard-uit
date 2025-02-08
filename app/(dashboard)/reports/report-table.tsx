import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import api from '@/services/api';
import { Report, Student } from '@/types/db';
import { ReportRow } from './report-row';
import { PaginationTable } from '@/components/ui/pagination-table';

export async function ReportTable({
  currentPage,
  type
}: {
  currentPage: number;
  type: 'PENDING' | 'RESOLVED';
}) {
  let studentsPerPage = 5;

  const response = await api.get('/reports/getReports', {
    params: {
      status: type,
      page: currentPage - 1,
      size: studentsPerPage,
      sortBy: 'createdAt',
      sortDir: 'asc',
      forceFirstAndLastRels: true
    }
  });
  console.log(response.data);
  const reports: Report[] = response.data._embedded?.reportResponseList || [];
  const totalPages = response.data.page.totalPages;
  const totalElements = response.data.page.totalElements;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>
          Manage your reports and view their infomation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Report by </TableHead>
              <TableHead className="hidden md:table-cell">Reason</TableHead>
              <TableHead className="hidden md:table-cell">
                Admin Notes
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <ReportRow key={report.id} report={report} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>{/* {startIndex}-{endIndex} */}</strong> of{' '}
            <strong>{totalElements}</strong> students
          </div>
          <div className="flex">
            <PaginationTable totalPages={totalPages} />
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
