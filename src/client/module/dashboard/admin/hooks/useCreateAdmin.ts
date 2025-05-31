import { useForm } from 'react-hook-form';
import { AdminPayload, AdminSchema } from '../schema/adminSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import useMutationPostAdmin from '../api/useMutationPostAdmin';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

const useCreateAdmin = (onClose: () => void) => {
  const form = useForm<AdminPayload>({
    resolver: zodResolver(AdminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, isSuccess } = useMutationPostAdmin();

  const onSubmit = useCallback(
    (data: AdminPayload) => {
      mutate(data, {
        onSuccess: () => {
          form.reset();
          toast.success('Admin berhasil ditambahkan');
          onClose(); // ✅ Tutup modal di sini
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
    [form, mutate, onClose]
  );

  return {
    form,
    onSubmit,
    isSubmitting: isPending,
    isSuccess,
  };
};

export default useCreateAdmin;
