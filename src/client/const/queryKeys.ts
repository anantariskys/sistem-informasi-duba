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

const penanggungJawab = createQueryKeys('penanggungJawab', {
  list: (params: GetStudentQueryParams | undefined) => [
    {
      limit: params?.limit ?? 10,
      page: params?.page ?? 1,
    },
  ],
  create: () => ['create-course'],
  delete: (id: string ) => [id],
  option : () => ['option'],
});

export const queryKeys = mergeQueryKeys(guruTugas, penanggungJawab);
