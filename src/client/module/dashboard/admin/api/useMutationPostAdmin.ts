import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';


import { apiClient, ErrorResponse } from '@/client/lib/axios';
import {  User } from '@prisma/client';
import { queryKeys } from '@/client/const/queryKeys';
import useMutationProvider from '@/client/hooks/useMutationProvider';
import { AdminPayload } from '../schema/adminSchema';

type CreateAdminResponse = {
  data:User;
  success: boolean;
  message: string;
};
const postAdmin = async (data: AdminPayload): Promise<CreateAdminResponse> => {
  const response = await apiClient.request<'/admin', 'post'>(
    'post',
    '/admin',
    undefined,
    data
  );

  return response;
};

const useMutationPostAdmin = (
  options?: Omit<
    UseMutationOptions<
      CreateAdminResponse,
      AxiosError<ErrorResponse>,
      AdminPayload
    >,
    'mutationFn'
  >
) => {
  const queryKey = queryKeys.admin.create();
  const { queryKey: invalidatedQueryKey } =
    queryKeys.admin.list(undefined);

  return useMutationProvider<AdminPayload, CreateAdminResponse>({
    queryKey: [queryKey],
    removeQueryKey: invalidatedQueryKey,
    mutationFn: postAdmin,
    options,
  });
};

export default useMutationPostAdmin;
