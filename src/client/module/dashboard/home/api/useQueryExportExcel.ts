import { UseQueryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/client/const/queryKeys';
import { apiClient } from '@/client/lib/axios';
import useQueryProvider from '@/client/hooks/useQueryProvider';
import { GuruTugas, PenanggunJawabGuruTugas } from '@prisma/client';
import { GuruTugasDT } from '../../guruTugas/types/type';

const getStatisticQuery = async () => {
  const res = await apiClient.request<'/excel/export', 'get'>('get', '/excel/export');
  return res;
};

type ExportResponse = {
  data: {
    guruTugas: GuruTugasDT[],
    penanggungJawab : PenanggunJawabGuruTugas[],
    calonGuruTugas : GuruTugasDT[],
  };
  success: boolean;
  message: string;
};

const useQueryExportExcel = ({
  options
}: {
  options?: Omit<
    UseQueryOptions<ExportResponse, Error>,
    'queryKey' | 'queryFn'
  >;
} = {}) => {
  const { queryKey } = queryKeys.dashboard.export();
  const queryFn = () =>
    getStatisticQuery();

  return useQueryProvider<ExportResponse>({
    queryKey,
    queryFn,
    options,
  });
};

export { useQueryExportExcel };
