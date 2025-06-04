import { UseQueryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/client/const/queryKeys';
import { apiClient } from '@/client/lib/axios';
import useQueryProvider from '@/client/hooks/useQueryProvider';
import { PenanggunJawabGuruTugas } from '@prisma/client';

export type GetPenanggungJawabQueryParams = {
  limit: number;
  page: number;
  keyword?: string;
};

const getPenanggungJawabQuery = async (
  params: GetPenanggungJawabQueryParams
) => {
  const res = await apiClient.request<'/penanggung-jawab', 'get'>(
    'get',
    '/penanggung-jawab',
    {
      limit: params.limit,
      page: params.page,
      keyword: params.keyword,
    }
  );
  return res;
};

type PenanggungJawabListResponse = {
  data: PenanggunJawabGuruTugas[];
  success: boolean;
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

const useQueryGetPenanggungJawab = ({
  options,
  params,
}: {
  options?: Omit<
    UseQueryOptions<PenanggungJawabListResponse, Error>,
    'queryKey' | 'queryFn'
  >;
  params?: GetPenanggungJawabQueryParams;
} = {}) => {
  const { queryKey } = queryKeys.penanggungJawab.list(params);
  const queryFn = () =>
    getPenanggungJawabQuery({
      limit: params?.limit ?? 10,
      page: params?.page ?? 1,
      keyword: params?.keyword,
    });

  return useQueryProvider<PenanggungJawabListResponse>({
    queryKey,
    queryFn,
    options,
  });
};

export { useQueryGetPenanggungJawab };
