import { UseQueryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/client/const/queryKeys';
import { apiClient } from '@/client/lib/axios';
import useQueryProvider from '@/client/hooks/useQueryProvider';
import { PenanggunJawabGuruTugas } from '@prisma/client';

const getPJOptionQuery = async () => {
  const res = await apiClient.request<'/penanggung-jawab/option', 'get'>(
    'get',
    '/penanggung-jawab/option'
  );
  return res;
};

type PJOptionResponse = {
  data: PenanggunJawabGuruTugas[];
  success: boolean;
  message: string;
};

const useQueryPJOption = ({
  options,
}: {
  options?: Omit<
    UseQueryOptions<PJOptionResponse, Error>,
    'queryKey' | 'queryFn'
  >;
} = {}) => {
  const { queryKey } = queryKeys.penanggungJawab.option();
  const queryFn = () => getPJOptionQuery();

  return useQueryProvider<PJOptionResponse>({
    queryKey,
    queryFn,
    options,
  });
};

export { useQueryPJOption };
