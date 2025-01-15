import api from '@/services/api';
import { LecturersTable } from './lecturer-table';

export default async function UsersPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
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
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = response.data.page.totalPages;
  return <LecturersTable totalPages={totalPages} currentPage={currentPage} />;
}
