
import FormModal from '@/client/components/FormModal';
import Input from '@/client/components/Input';
import useCreateGT from '../hooks/useCreateGT';

import SearchableDropdown from '@/client/components/SearchableDropdown';
import FileInput from '@/client/components/FileInput';

interface CreateModalGTProps {
  isShow: boolean;
  onClose: () => void;
}

export default function CreateModalGT({ isShow, onClose }: CreateModalGTProps) {
  const { form, isSubmitting, onSubmit, jpOption } = useCreateGT(onClose);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const fotoVal = form.watch('foto');

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
          label="Name"
          placeholder="Enter full name"
          error={errors.nama?.message}
          {...register('nama')}
          required
        />
        <SearchableDropdown
          label="Penanggung Jawab"
          options={(jpOption ?? []).map((jp) => ({
            label: jp.nama,
            value: jp.id,
          }))}
          value={form.watch('penanggungJawabId')}
          onChange={(val) =>
            setValue('penanggungJawabId', val ? Number(val) : undefined)
          }
          error={errors.penanggungJawabId?.message}
        />
        <Input
          label="Jurusan"
          placeholder="Masukkan Jurusan"
          error={errors.jurusan?.message}
          {...register('jurusan')}
          required
        />
        <Input
          label="Alamat"
          placeholder="Masukkan Alamat"
          error={errors.alamat?.message}
          {...register('alamat')}
          required
        />
        <Input
          label="Nomor HP"
          placeholder="Masukkan Nomor HP"
          error={errors.nomorHp?.message}
          {...register('nomorHp')}
        />
        <FileInput
          onFileChange={(val) => setValue('foto', val || undefined)}
          initialFileUrl={typeof fotoVal === 'string' ? fotoVal : undefined}
        />
      </div>
    </FormModal>
  );
}
