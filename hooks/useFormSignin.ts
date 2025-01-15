import { login } from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const formSigninSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters.' })
  // .regex(/[A-Z]/, {
  //   message: 'Password must contain at least one uppercase letter.'
  // })
  // .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
});
export default function useFormSignin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSigninSchema>>({
    resolver: zodResolver(formSigninSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSigninSchema>) {
    setLoading(true);
    try {
      await login(values);
      router.push('/');
    } catch (err: any) {
      if (err.response?.status === 401) {
        form.setError('password', { message: 'Invalid username or password.' });
      } else {
        form.setError('password', {
          message: 'An unexpected error occurred. Please try again later.'
        });
      }
    }
    setLoading(false);
  }

  return {
    form,
    onSubmit,
    loading
  };
}
