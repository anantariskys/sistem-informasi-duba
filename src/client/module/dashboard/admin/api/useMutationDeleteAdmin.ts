import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient, ErrorResponse } from '@/client/lib/axios';
import { User } from '@prisma/client';
import { queryKeys } from '@/client/const/queryKeys';
import useMutationProvider from '@/client/hooks/useMutationProvider';
import { DeleteAdminPayload } from '../types/type';

type DeleteAdminResponse = {
  data: User;
  success: boolean;
  message: string;
};
const deleteAdmin = async (
  data: DeleteAdminPayload
): Promise<DeleteAdminResponse> => {
  const response = await apiClient.request(
    'delete',
    `/admin/${data.id}`,
    undefined,
    data
  );

  return response;
};

const useMutationDeleteAdmin = (
  options?: Omit<
    UseMutationOptions<
      DeleteAdminResponse,
      AxiosError<ErrorResponse>,
      DeleteAdminPayload
    >,
    'mutationFn'
  >
) => {
  const queryKey = queryKeys.admin.delete(undefined);
  const { queryKey: invalidatedQueryKey } = queryKeys.admin.list(undefined);

  return useMutationProvider<DeleteAdminPayload, DeleteAdminResponse>({
    queryKey: [queryKey],
    removeQueryKey: invalidatedQueryKey,
    mutationFn: deleteAdmin,
    options,
  });
};

export default useMutationDeleteAdmin;
