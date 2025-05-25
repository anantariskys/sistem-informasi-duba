import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[a-z]/, "Password harus memiliki minimal 1 huruf kecil")
    .regex(/[0-9]/, "Password harus memiliki minimal 1 angka"),
});

export type LoginPayload = z.infer<typeof loginSchema>;