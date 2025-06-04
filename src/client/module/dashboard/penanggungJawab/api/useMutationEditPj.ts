import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient, ErrorResponse } from '@/client/lib/axios';
import { PenanggunJawabGuruTugas } from '@prisma/client';
import { queryKeys } from '@/client/const/queryKeys';
import useMutationProvider from '@/client/hooks/useMutationProvider';
import { EditPJPayload } from '../types/type';

type PenanggungJawabResponse = {
  data: PenanggunJawabGuruTugas;
  success: boolean;
  message: string;
};
const patchPJ = async (
  data: EditPJPayload
): Promise<PenanggungJawabResponse> => {
  const response = await apiClient.request(
    'patch',
    '/penanggung-jawab/' + data.id,
    undefined,
    data
  );

  return response;
};

const useMutationEditPJ = (
  options?: Omit<
    UseMutationOptions<
      PenanggungJawabResponse,
      AxiosError<ErrorResponse>,
      EditPJPayload
    >,
    'mutationFn'
  >
) => {
  const queryKey = queryKeys.penanggungJawab.create();
  const { queryKey: invalidatedQueryKey } =
    queryKeys.penanggungJawab.list(undefined);

  return useMutationProvider<EditPJPayload, PenanggungJawabResponse>({
    queryKey: [queryKey],
    removeQueryKey: invalidatedQueryKey,
    mutationFn: patchPJ,
    options,
  });
};

export default useMutationEditPJ;
