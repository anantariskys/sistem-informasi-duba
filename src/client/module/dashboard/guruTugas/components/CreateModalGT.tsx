import { useState } from 'react';
import FormModal from '@/client/components/FormModal';
import Input from '@/client/components/Input';
import useCreateGT from '../hooks/useCreateGT';
import Dropdown from '@/client/components/Dropdown';
import SearchableDropdown from '@/client/components/SearchableDropdown';

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
          required
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
      </div>
    </FormModal>
  );
}
