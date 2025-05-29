import {
  QueryFilters,
  useMutation,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../lib/axios';

type UseMutationProviderProps<T, U> = {
  queryKey: QueryKey;
  mutationFn: (params: T) => Promise<U>;
  removeQueryKey?: QueryKey | QueryKey[];
  options?: UseMutationOptions<U, AxiosError<ErrorResponse>, T>;
};

const useMutationProvider = <T, U = undefined>({
  queryKey,
  mutationFn,
  removeQueryKey,
  options,
}: UseMutationProviderProps<T, U>): UseMutationResult<
  U,
  AxiosError<ErrorResponse>,
  T
> => {
  const queryClient = useQueryClient();

  return useMutation<U, AxiosError<ErrorResponse>, T>({
    mutationKey: queryKey,
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries(queryKey as QueryFilters);
      const previousValue = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: unknown) => {
        if (old) {
          return {
            ...old,
            data: null,
          };
        }
        return old;
      });

      // forward to options.onMutate if exists
      if (options?.onMutate) {
        await options.onMutate(variables);
      }

      return previousValue;
    },
    onSuccess: async (data, variables, context) => {
      // panggil opsi dari pemanggil hook
      if (options?.onSuccess) {
        await options.onSuccess(data, variables, context);
      }

      // invalidate queries kalau ada
      if (removeQueryKey) {
        const keys = Array.isArray(removeQueryKey)
          ? removeQueryKey
          : [removeQueryKey];

        await Promise.all(
          keys.map((key) => queryClient.invalidateQueries(key as QueryFilters))
        );
      }
    },
    onError: async (err, variables, context) => {
      // forward ke opsi error handler
      if (options?.onError) {
        await options.onError(err, variables, context);
      }

      // jangan lempar ulang error di sini, biarkan React Query yang handle
    },
    onSettled: options?.onSettled,
  });
};

export default useMutationProvider;
