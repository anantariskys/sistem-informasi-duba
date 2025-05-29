import { useForm } from 'react-hook-form';
import { GTPayload, GTSchema } from '../schema/GTSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import useMutationCreateGT from '../api/useMutationCreateGT';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useQueryPJOption } from '../api/useQueryPJOption';

const useCreateGT = (onClose: () => void) => {
  const form = useForm<GTPayload>({
    resolver: zodResolver(GTSchema),
    defaultValues: {
      nama: '',
      alamat: '',
      nomorHp: '',
      jurusan: '',
    },
  });

  const { mutate, isPending, isSuccess } = useMutationCreateGT();
  const { data: jpOption } = useQueryPJOption();

  const onSubmit = useCallback(
    (data: GTPayload) => {
      mutate(data, {
        onSuccess: () => {
          form.reset();
          toast.success('Guru Tugas berhasil ditambahkan');
          onClose();
        },
        onError: () => {
          form.reset();
          toast.error('Guru Tugas gagal ditambahkan');
          onClose();
        },
      });
    },
    [form, mutate, onClose]
  );

  return {
    form,
    jpOption : jpOption?.data,
    onSubmit,
    isSubmitting: isPending,
    isSuccess,
  };
};

export default useCreateGT;
