import FormModal from '@/client/components/FormModal';
import Input from '@/client/components/Input';
import useEditPenanggungJawab from '../hooks/useEditPenanggunJawab';
import { EditPJPayload } from '../types/type';

interface CreateModalPJProps {
  isShow: boolean;
  onClose: () => void;
  initialData?: EditPJPayload;
}

export default function EditModalPJ({
  initialData,
  isShow,
  onClose,
}: CreateModalPJProps) {
  const { form, isSubmitting, onSubmit } = useEditPenanggungJawab(onClose, initialData!);
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
