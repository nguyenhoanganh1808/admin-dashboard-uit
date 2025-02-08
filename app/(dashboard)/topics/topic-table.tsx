// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table';
// import api from '@/services/api';
// import { Report, Student } from '@/types/db';
// import { PaginationTable } from '@/components/ui/pagination-table';
// import { TopicRow } from './topic-row';

// export async function TopicTable({
//   currentPage,
//   type
// }: {
//   currentPage: number;
//   type: 'PENDING' | 'RESOLVED';
// }) {
//   let studentsPerPage = 5;

//   const response = await api.get('/reports/getReports', {
//     params: {
//       status: type,
//       page: currentPage - 1,
//       size: studentsPerPage,
//       sortBy: 'createdAt',
//       sortDir: 'asc',
//       forceFirstAndLastRels: true
//     }
//   });

//   const reports: Report[] = response.data._embedded?.reportResponseList || [];
//   const totalPages = response.data.page.totalPages;
//   const totalElements = response.data.page.totalElements;

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Topics</CardTitle>
//         <CardDescription>
//           Manage your topics and view infomation.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Id</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Descripion</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {reports.map((report) => (
//               <TopicRow key={report.id} topic={report} />
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//       <CardFooter>
//         <form className="flex items-center w-full justify-between">
//           <div className="text-xs text-muted-foreground">
//             Showing <strong>{/* {startIndex}-{endIndex} */}</strong> of{' '}
//             <strong>{totalElements}</strong> students
//           </div>
//           <div className="flex">
//             <PaginationTable totalPages={totalPages} />
//           </div>
//         </form>
//       </CardFooter>
//     </Card>
//   );
// }
