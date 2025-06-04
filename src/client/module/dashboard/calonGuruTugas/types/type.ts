import { GuruTugas } from '@prisma/client';
import { GTPayload } from '../schema/GTSchema';

export interface GuruTugasDT extends GuruTugas {
  penanggungJawab?: {
    id: number;
    nama: string;
  };
}
export type DeleteGTPayload = {
  id: string;
};


export interface EditGTPayload extends GTPayload {
  id: string;
}