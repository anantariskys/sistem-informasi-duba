import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient, ErrorResponse } from '@/client/lib/axios';
import { PenanggunJawabGuruTugas } from '@prisma/client';
import { queryKeys } from '@/client/const/queryKeys';
import useMutationProvider from '@/client/hooks/useMutationProvider';
import { DeletePJPayload } from '../types/type';

type PenanggungJawabResponse = {
  data: PenanggunJawabGuruTugas;
  success: boolean;
  message: string;
};
const deletePJ = async (
  data: DeletePJPayload
): Promise<PenanggungJawabResponse> => {
  const response = await apiClient.request(
    'delete',
    `/penanggung-jawab/${data.id}`,
    undefined,
    data
  );

  return response;
};

const useMutationDeletePJ = (
  options?: Omit<
    UseMutationOptions<
      PenanggungJawabResponse,
      AxiosError<ErrorResponse>,
      DeletePJPayload
    >,
    'mutationFn'
  >
) => {
  const queryKey = queryKeys.penanggungJawab.create();
  const { queryKey: invalidatedQueryKey } =
    queryKeys.penanggungJawab.list(undefined);

  return useMutationProvider<DeletePJPayload, PenanggungJawabResponse>({
    queryKey: [queryKey],
    removeQueryKey: invalidatedQueryKey,
    mutationFn: deletePJ,
    options,
  });
};

export default useMutationDeletePJ;
