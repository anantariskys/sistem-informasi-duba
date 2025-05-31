import { z } from 'zod';

export const AdminSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama harus diisi')
    .max(255, 'Nama tidak boleh lebih dari 255 karakter'),
  email: z
    .string()
    .min(1, 'Email harus diisi')
    .max(255, 'Email tidak boleh lebih dari 255 karakter')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password harus diisi')
    .min(8, 'Password minimal 8 karakter')
    .max(255, 'Password tidak boleh lebih dari 255 karakter'),
});

export const EditAdminSchema = AdminSchema.extend({
  confirmPassword: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val))
    .superRefine((val, ctx) => {
      if (val) {
        if (val.length < 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 8,
            type: 'string',
            inclusive: true,
            message: 'Password minimal 8 karakter',
          });
        }
        if (val.length > 255) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 255,
            type: 'string',
            inclusive: true,
            message: 'Password tidak boleh lebih dari 255 karakter',
          });
        }
      }
    }),
}); // Omit password field from EditAdminSchema

export type AdminPayload = z.infer<typeof AdminSchema>;
export type EditAdminPayload = z.infer<typeof EditAdminSchema>;
