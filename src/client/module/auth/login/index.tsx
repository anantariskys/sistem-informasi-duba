'use client';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import useLogin from './hooks/useLogin';

export default function Login() {
  const { form, isLoading, onSubmit } = useLogin();

  return (
    <div className="max-w-md mx-auto w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm space-y-2">
          <Input
            {...form.register('email')}
            error={form.formState.errors.email?.message}
            required
            label="Email"
            placeholder="Masukkan Email"
            disabled={isLoading}
          />
          <Input
            {...form.register('password')}
            type="password"
            error={form.formState.errors.password?.message}
            required
            label="Password"
            placeholder="Masukkan Password"
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading} isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
}
