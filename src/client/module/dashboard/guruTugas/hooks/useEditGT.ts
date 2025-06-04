import { useForm } from 'react-hook-form';
import { EditGTPayload } from '../types/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { GTPayload, GTSchema } from '../schema/GTSchema';
import { useCallback, useEffect } from 'react';
import useMutationEditGT from '../api/useMutationEditGT';
import { toast } from 'react-toastify';
import { useQueryPJOption } from '../api/useQueryPJOption';

const useEditGT = (onClose: () => void, initialData: EditGTPayload) => {
  const form = useForm<GTPayload>({
    resolver: zodResolver(GTSchema),
    defaultValues: {
      nama: initialData?.nama ?? '',
      alamat: initialData.alamat ?? '',
      foto: initialData.foto ?? '',
      nomorHp: initialData.nomorHp ?? '',
      jurusan: initialData.jurusan ?? '',
      penanggungJawabId: initialData.penanggungJawabId ?? 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        nama: initialData?.nama ?? '',
        alamat: initialData.alamat ?? '',
        foto: initialData.foto ?? '',
        nomorHp: initialData.nomorHp ?? '',
        jurusan: initialData.jurusan ?? '',
        penanggungJawabId: initialData.penanggungJawabId ?? 0,
      });
    }
  }, [initialData, form]);
  const { mutate, isPending, isSuccess } = useMutationEditGT();

  const onSubmit = useCallback(
    (data: GTPayload) => {
      mutate(
        {
          id: initialData.id,
          nama: data.nama,
          alamat: data.alamat,
          jurusan: data.jurusan,
          foto: data.foto,
          nomorHp: data.nomorHp,
          penanggungJawabId: data.penanggungJawabId,
        },
        {
          onSuccess: () => {
            form.reset();
            toast.success('Guru Tugas berhasil di update');
            onClose(); // ✅ Tutup modal di sini
          },
        }
      );
    },
    [form, mutate, onClose,initialData.id]
  );

  const { data: jpOption } = useQueryPJOption();

  return {
    form,
    onSubmit,
    isSubmitting: isPending,
    isSuccess,
    jpOption : jpOption?.data
  };
};

export default useEditGT;
