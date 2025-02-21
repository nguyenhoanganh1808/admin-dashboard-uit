'use server';

import { banUserById } from '@/services/admin.service';
import api from '@/services/api-server';
// import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function resolveReport(formData: FormData) {
  let id = Number(formData.get('id'));
  let adminNotes = formData.get('adminNotes') as string;
  let removePost = formData.get('removePost') as 'on' | 'off';
  await api.post(`/reports/resolveReport/${id}`, {
    adminNotes: adminNotes || '',
    removePost: removePost === 'on'
  });

  revalidatePath('/reports');
}

export async function warnReport(formData: FormData) {
  let id = Number(formData.get('id'));
  await api.post(`/reports/warn/${id}`);
  revalidatePath('/reports');
}
