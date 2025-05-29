import { z } from 'zod';

export const PJSchema = z.object({
  nama: z.string().min(1, 'Nama harus diisi').max(255,'Nama tidak boleh lebih dari 255 karakter'),
  alamat: z.string().min(1, 'Alamat harus diisi').max(255,'Alamat tidak boleh lebih dari 255 karakter'),
  lembaga: z.string().min(1, 'Lembaga harus diisi').max(255, 'Lembaga tidak boleh lebih dari 255 karakter'),
});

export type PJPayload = z.infer<typeof PJSchema>;
