import FormModal from '@/client/components/FormModal';
import Input from '@/client/components/Input';
import useEditAdmin from '../hooks/useEditAdmin';
import { useMemo } from 'react';

interface CreateModalPJProps {
  isShow: boolean;
  onClose: () => void;
  initialData?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function EditModalAdmin({
  initialData,
  isShow,
  onClose,
}: CreateModalPJProps) {
  const memoInitialData = useMemo(
    () => ({
      id: initialData?.id ?? '',
      name: initialData?.name ?? '',
      email: initialData?.email ?? '',
    }),
    [initialData]
  );

  const { form, isSubmitting, onSubmit } = useEditAdmin(
    onClose,
    memoInitialData
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <FormModal
      show={isShow}
      title="Edit Penanggung Jawab Guru Tugas"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-4">
        <Input
          label="Nama"
          placeholder="Masukkan nama lengkap"
          error={errors.name?.message}
          {...register('name')}
          required
        />
        <Input
          label="Lembaga"
          placeholder="Masukkan nama lembaga"
          error={errors.email?.message}
          {...register('email')}
          required
        />
        <Input
          label="Password"
          placeholder="Masukkan password"
          error={errors.password?.message}
          {...register('password')}
          required
        />
        <Input
          label="Password Baru"
          placeholder="Masukkan password baru"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>
    </FormModal>
  );
}
