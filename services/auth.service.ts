'use server';

import api from './api';
import { formSigninSchema } from '@/hooks/useFormSignin';
import { z } from 'zod';
import { LoginResponse } from '@/types/form';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

export async function login(
  credentials: z.infer<typeof formSigninSchema>
): Promise<void> {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    if (data.role !== 'ADMIN') {
      throw new Error('Only admin can have access this site');
    }

    const cookieStore = await cookies();
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: true,
      path: '/'
    });
    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/'
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}

export async function logout() {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
}
