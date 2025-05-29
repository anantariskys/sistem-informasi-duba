import { UseQueryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/client/const/queryKeys';
import { apiClient } from '@/client/lib/axios';
import useQueryProvider from '@/client/hooks/useQueryProvider';
import { GuruTugas } from '@prisma/client';

export type GetStudentQueryParams = {
  limit: number;
  page: number;
};

const getStudentQuery = async (params: GetStudentQueryParams) => {
  const res = await apiClient.request<'/guru-tugas', 'get'>(
    'get',
    '/guru-tugas',
    {
      limit: params.limit,
      page: params.page,
    }
  );
  return res;
};

type StudentListResponse = {
  data: GuruTugas[];
  success: boolean;
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

const useQueryGetStudent = ({
  options,
  params,
}: {
  options?: Omit<
    UseQueryOptions<StudentListResponse, Error>,
    'queryKey' | 'queryFn'
  >;
  params?: GetStudentQueryParams;
} = {}) => {
  const { queryKey } = queryKeys.guruTugas.list(params);
  const queryFn = () =>
    getStudentQuery({
      limit: params?.limit ?? 10,
      page: params?.page ?? 1,
    });

  return useQueryProvider<StudentListResponse>({
    queryKey,
    queryFn,
    options,
  });
};

export { useQueryGetStudent };
