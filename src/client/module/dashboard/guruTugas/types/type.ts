import { GuruTugas } from '@prisma/client';

export interface GuruTugasDT extends GuruTugas {
  penanggungJawab?: {
    id: number;
    nama: string;
  };
}
export type DeleteGTPayload = {
  id: string;
};
