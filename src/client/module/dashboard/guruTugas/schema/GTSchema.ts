import { z } from 'zod';

export const GTSchema = z.object({
  id: z.number().optional(),
  nama: z.string().min(1, 'Nama harus diisi'),
  alamat: z.string().min(1, 'Alamat harus diisi'),
  jurusan: z.string().min(1, 'Jurusan harus diisi'),
  nomorHp: z.string().min(1, 'Nomor HP harus diisi').optional(),
  foto: z.union([z.string(), z.instanceof(File)]).optional(),
  penanggungJawabId: z.number().optional(),
});

export type GTPayload = z.infer<typeof GTSchema>;
