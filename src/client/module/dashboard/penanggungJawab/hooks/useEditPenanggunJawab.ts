import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PJPayload, PJSchema } from '../schema/PJSchema';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import useMutationEditPJ from '../api/useMutationEditPj';
import { EditPJPayload } from '../types/type';

const useEditPenanggungJawab = (
  onClose: () => void,
  initialData: EditPJPayload
) => {
  const form = useForm<PJPayload>({
    resolver: zodResolver(PJSchema),
    defaultValues: {
      nama: initialData?.nama ?? '',
      alamat: initialData.alamat ?? '',
      lembaga: initialData?.lembaga ?? '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        nama: initialData.nama ?? '',
        alamat: initialData.alamat ?? '',
        lembaga: initialData.lembaga ?? '',
      });
    }
  }, [initialData, form]);
  const { mutate, isPending, isSuccess } = useMutationEditPJ();

  const onSubmit = useCallback(
    (data: PJPayload) => {
      mutate(
        {
          id: initialData.id,
          nama: data.nama,
          alamat: data.alamat,
          lembaga: data.lembaga,
        },
        {
          onSuccess: () => {
            form.reset();
            toast.success('Penanggung Jawab berhasil di update');
            onClose(); // ✅ Tutup modal di sini
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
export default useEditPenanggungJawab;
