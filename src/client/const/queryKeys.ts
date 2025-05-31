import {
  createQueryKeys,
  mergeQueryKeys,
} from '@lukemorales/query-key-factory';
import { GetStudentQueryParams } from '../module/dashboard/guruTugas/api/useQueryGetStudent';

const guruTugas = createQueryKeys('guruTugas', {
  list: (params: GetStudentQueryParams | undefined) => [
    {
      limit: params?.limit ?? 10,
      page: params?.page ?? 1,
    },
  ],
  create: () => ['create-course'],
  delete: (id: string | undefined) => [id],
});
const admin = createQueryKeys('admin', {
  list: (params: GetStudentQueryParams | undefined) => [
    {
      limit: params?.limit ?? 10,
      page: params?.page ?? 1,
    },
  ],
  create: () => ['create-course'],
  delete: (id: string | undefined) => [id],
  edit: (id: string | undefined) => [id],
});

const penanggungJawab = createQueryKeys('penanggungJawab', {
  list: (params: GetStudentQueryParams | undefined) => [
    {
      limit: params?.limit ?? 10,
      page: params?.page ?? 1,
    },
  ],
  create: () => ['create-course'],
  delete: (id: string) => [id],
  option: () => ['option'],
});
const dashboard = createQueryKeys('dashboard', {
  statistic: () => ['statistic'],
  export: () => ['export'],
});



export const queryKeys = mergeQueryKeys(guruTugas, penanggungJawab, admin,dashboard);
