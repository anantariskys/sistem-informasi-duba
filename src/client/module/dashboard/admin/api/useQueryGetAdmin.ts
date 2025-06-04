import { UseQueryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/client/const/queryKeys';
import { apiClient } from '@/client/lib/axios';
import useQueryProvider from '@/client/hooks/useQueryProvider';
import {  User } from '@prisma/client';

export type GetAdminQueryParams = {
  limit: number;
  page: number;
  keyword?: string;
};

const getStudentQuery = async (params: GetAdminQueryParams) => {
  const res = await apiClient.request<'/admin', 'get'>(
    'get',
    '/admin',
    {
      limit: params.limit,
      page: params.page,
      keyword: params.keyword,
    }
  );
  return res;
};

type AdminListResponse = {
  data: User[];
  success: boolean;
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

const useQueryGetAdmin = ({
  options,
  params,
}: {
  options?: Omit<
    UseQueryOptions<AdminListResponse, Error>,
    'queryKey' | 'queryFn'
  >;
  params?: GetAdminQueryParams;
} = {}) => {
  const { queryKey } = queryKeys.admin.list(params);
  const queryFn = () =>
    getStudentQuery({
      limit: params?.limit ?? 10,
      page: params?.page ?? 1,
      keyword: params?.keyword,
    });

  return useQueryProvider<AdminListResponse>({
    queryKey,
    queryFn,
    options,
  });
};

export { useQueryGetAdmin };
