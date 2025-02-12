'use server';

import api from '@/services/api-server';
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

export async function createPost(formData: FormData) {
  console.log(formData);
  const textContent = formData.get('content');
  const images = formData.get('images');
  const files = formData.get('files');
  const topics = formData.get('topics[]');
  const postRequestString = JSON.stringify({
    textContent,
    title: '',
    privacyId: 1,
    topicIds: topics
  });
  const newFormData = new FormData();
  newFormData.append('postRequestString', postRequestString);
  console.log('postReq: ', postRequestString);

  // await api.post('/admin/createNotificationPost', newFormData);
}
