import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient, ErrorResponse } from '@/client/lib/axios';
import { GuruTugas } from '@prisma/client';
import { queryKeys } from '@/client/const/queryKeys';
import useMutationProvider from '@/client/hooks/useMutationProvider';
import { GTPayload } from '../schema/GTSchema';

type GTResponse = {
  data: GuruTugas;
  success: boolean;
  message: string;
};
const postGT = async (data: GTPayload): Promise<GTResponse> => {
  const response = await apiClient.request<'/guru-tugas', 'post'>(
    'post',
    '/guru-tugas',
    undefined,
    data
  );

  return response;
};

const useMutationCreateGT = (
  options?: Omit<
    UseMutationOptions<GTResponse, AxiosError<ErrorResponse>, GTPayload>,
    'mutationFn'
  >
) => {
  const queryKey = queryKeys.guruTugas.create();
  const { queryKey: invalidatedQueryKey } = queryKeys.guruTugas.list(undefined);

  return useMutationProvider<GTPayload, GTResponse>({
    queryKey: [queryKey],
    removeQueryKey: invalidatedQueryKey,
    mutationFn: postGT,
    options,
  });
};

export default useMutationCreateGT;
