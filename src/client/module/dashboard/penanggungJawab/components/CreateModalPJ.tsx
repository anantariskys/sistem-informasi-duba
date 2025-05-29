import FormModal from '@/client/components/FormModal';
import Input from '@/client/components/Input';

import useCreatePenanggungJawab from '../hooks/useCreatePenanggungJawab';

interface CreateModalPJProps {
  isShow: boolean;
  onClose: () => void;
  //   onSubmit: (data: PJPayload) => Promise<void>;
}

export default function CreateModalPJ({
  isShow,
  onClose,
}: //   onSubmit,
CreateModalPJProps) {
  const { form, isSubmitting, onSubmit } = useCreatePenanggungJawab(onClose);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <FormModal
      show={isShow}
      title="Tambahkan Penanggung Jawab Guru Tugas"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-4">
      <Input
          label="Nama"
          placeholder="Masukkan nama lengkap"
          error={errors.nama?.message}
          {...register('nama')}
          required
        />
        <Input
          label="Lembaga"
          placeholder="Masukkan nama lembaga"
          error={errors.lembaga?.message}
          {...register('lembaga')}
          required
        />
        <Input
          label="Alamat"
          placeholder="Masukkan alamat lengkap"
          error={errors.alamat?.message}
          {...register('alamat')}
          required
        />
      </div>
    </FormModal>
  );
}
