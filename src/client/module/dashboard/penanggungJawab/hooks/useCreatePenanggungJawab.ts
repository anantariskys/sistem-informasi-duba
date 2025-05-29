import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PJPayload, PJSchema } from '../schema/PJSchema';
import useMutationPJ from '../api/useMutationPostPJ';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

const useCreatePenanggungJawab = (onClose: () => void) => {
  const form = useForm<PJPayload>({
    resolver: zodResolver(PJSchema),
    defaultValues: {
      nama: '',
      lembaga: '',
      alamat: '',
    },
  });

  const { mutate, isPending, isSuccess } = useMutationPJ();

  const onSubmit = useCallback(
    (data: PJPayload) => {
      mutate(data, {
        onSuccess: () => {
          form.reset();
          toast.success('Penanggung Jawab berhasil ditambahkan');
          onClose(); // ✅ Tutup modal di sini
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
export default useCreatePenanggungJawab;
