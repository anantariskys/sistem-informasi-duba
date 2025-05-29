import { GuruTugas, PenanggunJawabGuruTugas } from '@prisma/client';
import { PJPayload } from '../schema/PJSchema';

export interface PenanggungJawabDT extends PenanggunJawabGuruTugas {
  guruTugas?: GuruTugas[];
}

export type DeletePJPayload = {
  id: string;
};
export interface EditPJPayload extends PJPayload {
  id: string;
}
