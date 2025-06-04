import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient, ErrorResponse } from '@/client/lib/axios';
import { PenanggunJawabGuruTugas } from '@prisma/client';
import { queryKeys } from '@/client/const/queryKeys';
import useMutationProvider from '@/client/hooks/useMutationProvider';
import { DeleteGTPayload } from '../types/type';

type PenanggungJawabResponse = {
  data: PenanggunJawabGuruTugas;
  success: boolean;
  message: string;
};
const promoteGT = async (
  data: DeleteGTPayload
): Promise<PenanggungJawabResponse> => {
  const response = await apiClient.request(
    'patch',
    `/guru-tugas/promote/${data.id}`,
    undefined,
    data
  );
  return response;
};

const useMutationPromoteGT = (
  options?: Omit<
    UseMutationOptions<
      PenanggungJawabResponse,
      AxiosError<ErrorResponse>,
      DeleteGTPayload
    >,
    'mutationFn'
  >
) => {
  const queryKey = queryKeys.guruTugas.promote(undefined);
  const { queryKey: invalidatedQueryKey } =
    queryKeys.guruTugas.list(undefined);
  return useMutationProvider<DeleteGTPayload, PenanggungJawabResponse>({
    queryKey: [queryKey],
    removeQueryKey: invalidatedQueryKey,
    mutationFn: promoteGT,
    options,
  });
};

export default useMutationPromoteGT;
