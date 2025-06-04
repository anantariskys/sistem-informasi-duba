import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient, ErrorResponse } from '@/client/lib/axios';
import { GuruTugas } from '@prisma/client';
import { queryKeys } from '@/client/const/queryKeys';
import useMutationProvider from '@/client/hooks/useMutationProvider';
import { EditGTPayload } from '../types/type';

type GTResponse = {
  data: GuruTugas;
  success: boolean;
  message: string;
};
const patchGT = async (data: EditGTPayload): Promise<GTResponse> => {
  const formData = new FormData();

  formData.append('nama', data.nama);
  formData.append('alamat', data.alamat);
  formData.append('jurusan', data.jurusan);

  if (data.nomorHp) formData.append('nomorHp', data.nomorHp);
  if (data.penanggungJawabId !== undefined)
    formData.append('penanggungJawabId', String(data.penanggungJawabId));
  if (data.foto instanceof File) formData.append('foto', data.foto);

  const response = await apiClient.request(
    'patch',
    `/guru-tugas/${data.id}`,
    undefined,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response;
};

const useMutationEditGT = (
  options?: Omit<
    UseMutationOptions<GTResponse, AxiosError<ErrorResponse>, EditGTPayload>,
    'mutationFn'
  >
) => {
  const queryKey = queryKeys.guruTugas.create();
  const { queryKey: invalidatedQueryKey } = queryKeys.guruTugas.list(undefined);

  return useMutationProvider<EditGTPayload, GTResponse>({
    queryKey: [queryKey],
    removeQueryKey: invalidatedQueryKey,
    mutationFn: patchGT,
    options,
  });
};

export default useMutationEditGT;
