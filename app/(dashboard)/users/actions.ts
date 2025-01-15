'use server';

import { banUserById } from '@/services/admin.service';
import api from '@/services/api';
// import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function banUser(formData: FormData) {
  console.log(formData);
  let id = formData.get('id') as string;
  let reason = formData.get('reason') as string;
  await api.put(`/admin/${id}/status`, {
    reason: reason || '',
    accountStatus: 'BANNED'
  });

  revalidatePath('/users');
}
