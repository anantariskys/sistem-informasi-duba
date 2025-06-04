import { UseQueryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/client/const/queryKeys';
import { apiClient } from '@/client/lib/axios';
import useQueryProvider from '@/client/hooks/useQueryProvider';


const getStatisticQuery = async () => {
  const res = await apiClient.request<'/statistic', 'get'>('get', '/statistic');
  return res;
};

type StatisticResponse = {
  data: {
    totalPJ: number;
    totalAdmin: number;
    totalGT: number;
    totalCGT: number;
  };
  success: boolean;
  message: string;
};

const useQueryGetStatistic = ({
  options
}: {
  options?: Omit<
    UseQueryOptions<StatisticResponse, Error>,
    'queryKey' | 'queryFn'
  >;
} = {}) => {
  const { queryKey } = queryKeys.dashboard.statistic();
  const queryFn = () =>
    getStatisticQuery();

  return useQueryProvider<StatisticResponse>({
    queryKey,
    queryFn,
    options,
  });
};

export { useQueryGetStatistic };
