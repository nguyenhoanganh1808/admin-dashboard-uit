'use server';

import { banUserById } from '@/services/admin.service';
import api from '@/services/api';
// import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function banUser(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const reason = formData.get('reason') as string;
  const response = await api.put(`/admin/${id}/status`, {
    reason: reason || '',
    accountStatus: 'BANNED'
  });

  if (response.status !== 200) {
    return { message: 'Failed to ban user' };
  }

  revalidatePath('/users');
  return { message: 'User banned successfully' };
}

export async function unbanUser(prevState: any, formData: FormData) {
  const id = formData.get('id') as string;
  const reason = formData.get('reason') as string;
  const response = await api.put(`/admin/${id}/status`, {
    reason: reason || '',
    accountStatus: 'ACTIVE'
  });

  if (response.status !== 200) {
    return { message: 'Failed to unban user' };
  }

  revalidatePath('/users');
  return { message: 'User unbanned successfully' };
}
