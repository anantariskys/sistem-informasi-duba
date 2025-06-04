import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import {  EditAdminPayload, EditAdminSchema } from '../schema/adminSchema';
import useMutationEditAdmin from '../api/useMutationPatchAdmin';


const useEditAdmin = (
  onClose: () => void,
  initialData: {
    name: string;
    email: string;
    id: string;
  }
) => {
  const form = useForm<EditAdminPayload>({
    resolver: zodResolver(EditAdminSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      email: initialData.email ?? '',

    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData?.name ?? '',
        email: initialData.email ?? '',
      });
    }
  }, [initialData,form]);
  const { mutate, isPending, isSuccess } = useMutationEditAdmin();

  const onSubmit = useCallback(
    (data: EditAdminPayload) => {
      mutate(
        {
          id: initialData.id,
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        {
          onSuccess: () => {
            form.reset();
            toast.success('Penanggung Jawab berhasil di update');
            onClose(); // ✅ Tutup modal di sini
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message ?? 'Terjadi kesalahan');
          },
        }
      );
    },
    [form, mutate, onClose,initialData.id]
  );

  return {
    form,
    onSubmit,
    isSubmitting: isPending,
    isSuccess,
  };
};
export default useEditAdmin;
