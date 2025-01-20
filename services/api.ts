'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

api.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      (await cookies()).delete('refreshToken');
      (await cookies()).delete('accessToken');
      redirect('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
