import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient, ErrorResponse } from '@/client/lib/axios';
import { User } from '@prisma/client';
import { queryKeys } from '@/client/const/queryKeys';
import useMutationProvider from '@/client/hooks/useMutationProvider';
import { EditAdminPayloadWithId } from '../types/type';


type PatchAdminResponse = {
  data: User;
  success: boolean;
  message: string;
};
const patchAdmin = async (
  data: EditAdminPayloadWithId
): Promise<PatchAdminResponse> => {
  const response = await apiClient.request(
    'patch',
    '/admin/' + data.id,
    undefined,
    data
  );

  return response;
};

const useMutationEditAdmin = (
  options?: Omit<
    UseMutationOptions<
      PatchAdminResponse,
      AxiosError<ErrorResponse>,
      EditAdminPayloadWithId
    >,
    'mutationFn'
  >
) => {
  const queryKey = queryKeys.admin.edit(undefined);
  const { queryKey: invalidatedQueryKey } = queryKeys.admin.list(undefined);

  return useMutationProvider<EditAdminPayloadWithId, PatchAdminResponse>({
    queryKey: [queryKey],
    removeQueryKey: invalidatedQueryKey,
    mutationFn: patchAdmin,
    options,
  });
};

export default useMutationEditAdmin;
