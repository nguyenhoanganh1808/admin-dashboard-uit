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

export async function createPost(prevState: any, formData: FormData) {
  console.log(formData);
  const textContent = formData.get('content');
  const images = formData.getAll('images') as File[];
  const files = formData.getAll('files') as File[];
  const topics = formData.getAll('topics[]');
  const postRequestString = JSON.stringify({
    textContent,
    title: '',
    privacyId: 1,
    topicIds: topics.map((topic) => Number(topic))
  });
  const newFormData = new FormData();
  newFormData.append('postRequestString', postRequestString);

  images.forEach((image) => {
    if (image.size > 0) {
      newFormData.append('mediaFiles', image);
    }
  });

  // Append files to FormData
  files.forEach((file) => {
    if (file.size > 0) {
      newFormData.append('mediaFiles', file);
    }
  });

  console.log('postReq: ', newFormData);

  const res = await api.post('/admin/createNotificationPost', newFormData);
  if (res.status !== 200) {
    return { type: 'error', text: 'Failed to create post' };
  }
  return { type: 'success', text: 'Create post success!' };
}
