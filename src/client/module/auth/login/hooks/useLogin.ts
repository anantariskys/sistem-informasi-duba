'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LoginPayload, loginSchema } from '../schema/loginSchema';
import { toast } from 'react-toastify';

const DEFAULT_VALUE = {
  email: '',
  password: '',
};

const useLogin = () => {
  const router = useRouter();
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUE,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(
    async (data: LoginPayload) => {
      try {
        setIsLoading(true);

        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
          callbackUrl: '/',
        });

        if (result?.error) {
          console.log(result);
          toast.error('Email / Password Salah');
          return;
        }

        if (result?.ok) {
          router.push('/');
        }

        form.reset();
      } catch (error) {
        console.log(error);
        toast.error('Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    },
    [form, router]
  );

  return {
    onSubmit: handleLogin,
    isLoading,
    form,
  };
};

export default useLogin;
