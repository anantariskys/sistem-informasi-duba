'use client';

import React from 'react';

import { DataTable, Column } from '@/client/components/DataTable';
import { GuruTugasDT } from './types/type';
import Button from '@/client/components/Button';
import useDeleteGT from './hooks/useDeleteGT';
import useGT from './hooks/useGT';
import ConfirmModal from '@/client/components/ConfirmModal';
import CreateModalGT from './components/CreateModalGT';

export default function StudentPage() {
  const {
    data,
    isLoading,
    handleOnChangeLimit,
    handleOnChangePage,
    pagination,
    isModalCreateOpen,
    isModalDeleteOpen,
    setIsModalCreateOpen,
    setIsModalDeleteOpen,
  } = useGT();

  const { handleSubmit, isPendingDeleteGT, setSelectedGTId } = useDeleteGT(() =>
    setIsModalDeleteOpen(false)
  );

  const columns: Column<GuruTugasDT>[] = [
    {
      key: 'name',
      header: 'Name',
      accessor: 'nama',
    },
    {
      key: 'jurusan',
      header: 'Jurusan',
      accessor: 'jurusan',
    },
    {
      key: 'phone',
      header: 'Phone',
      accessor: 'nomorHp',
    },
    {
      key: 'address',
      header: 'Address',
      accessor: 'alamat',
    },
    {
      key: 'penanggungJawab',
      header: 'Penanggung Jawab',
      render: (row) => row.penanggungJawab?.nama || '-',
    },
    {
      key: 'action',
      header: 'Action',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" variant="warning">
            Edit
          </Button>
          <Button
            onClick={() => {
              setIsModalDeleteOpen(true);
              setSelectedGTId(row.id);
            }}
            size="sm"
            variant="danger"
          >
            Hapus
          </Button>
          <Button size="sm">Detail</Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Daftar Guru Tugas</h1>
      <div className="flex justify-end mb-4">
        <Button width="w-fit" onClick={() => setIsModalCreateOpen(true)}>
          Tambah Guru Tugas 
        </Button>
      </div>
      <DataTable
        data={data || []}
        columns={columns}
        pagination={pagination}
        onPageChange={handleOnChangePage}
        onLimitChange={handleOnChangeLimit}
      />
      <ConfirmModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        title="Hapus Guru Tugas"
        description="Apakah anda yakin ingin menghapus guru tugas ini?"
        onConfirm={handleSubmit}
        confirmText="Hapus"
        type="error"
        isLoading={isPendingDeleteGT}
      />
      <CreateModalGT
      isShow={isModalCreateOpen}
      onClose={() => setIsModalCreateOpen(false)}
      />
    </div>
  );
}
