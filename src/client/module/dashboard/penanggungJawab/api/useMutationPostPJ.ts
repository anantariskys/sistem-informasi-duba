import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { PJPayload } from '../schema/PJSchema';
import { apiClient, ErrorResponse } from '@/client/lib/axios';
import { PenanggunJawabGuruTugas } from '@prisma/client';
import { queryKeys } from '@/client/const/queryKeys';
import useMutationProvider from '@/client/hooks/useMutationProvider';

type PenanggungJawabResponse = {
  data: PenanggunJawabGuruTugas;
  success: boolean;
  message: string;
};
const postPJ = async (data: PJPayload): Promise<PenanggungJawabResponse> => {
  const response = await apiClient.request<'/penanggung-jawab', 'post'>(
    'post',
    '/penanggung-jawab',
    undefined,
    data
  );

  return response;
};

const useMutationPJ = (
  options?: Omit<
    UseMutationOptions<
      PenanggungJawabResponse,
      AxiosError<ErrorResponse>,
      PJPayload
    >,
    'mutationFn'
  >
) => {
  const queryKey = queryKeys.penanggungJawab.create();
  const { queryKey: invalidatedQueryKey } =
    queryKeys.penanggungJawab.list(undefined);

  return useMutationProvider<PJPayload, PenanggungJawabResponse>({
    queryKey: [queryKey],
    removeQueryKey: invalidatedQueryKey,
    mutationFn: postPJ,
    options,
  });
};

export default useMutationPJ;
