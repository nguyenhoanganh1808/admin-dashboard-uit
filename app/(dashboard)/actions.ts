'use server';

import api from '@/services/api';
// import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// export async function deleteProduct(formData: FormData) {
//   let id = Number(formData.get('id'));
//   await deleteProductById(id);
//   revalidatePath('/');
// }

export async function approvePost(formData: FormData) {
  console.log(formData);
  let id = Number(formData.get('id'));
  await api.put(`/admin/approvePost/${id}`);
  revalidatePath('/');
}

export async function rejectPost(formData: FormData) {
  console.log(formData);
  let id = Number(formData.get('id'));
  await api.put(`/admin/rejectPost/${id}`, {});
  revalidatePath('/');
}
